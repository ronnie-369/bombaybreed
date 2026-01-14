import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import SEOCapabilitiesTab from "@/components/admin/seo/SEOCapabilitiesTab";
import SEOIndustriesTab from "@/components/admin/seo/SEOIndustriesTab";
import SEOGeographiesTab from "@/components/admin/seo/SEOGeographiesTab";
import SEORegulationsTab from "@/components/admin/seo/SEORegulationsTab";
import SEOPagesTab from "@/components/admin/seo/SEOPagesTab";

const AdminSEO = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (roleError || !roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have admin permissions",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Link>
            <h1 className="text-4xl font-bold">SEO Management</h1>
            <p className="text-muted-foreground mt-2">Manage programmatic SEO pages and entities</p>
          </div>
        </div>

        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="geographies">Geographies</TabsTrigger>
            <TabsTrigger value="regulations">Regulations</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <SEOPagesTab />
          </TabsContent>

          <TabsContent value="capabilities">
            <SEOCapabilitiesTab />
          </TabsContent>

          <TabsContent value="industries">
            <SEOIndustriesTab />
          </TabsContent>

          <TabsContent value="geographies">
            <SEOGeographiesTab />
          </TabsContent>

          <TabsContent value="regulations">
            <SEORegulationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSEO;
