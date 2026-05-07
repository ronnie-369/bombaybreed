import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface ReportDownload {
  id: string;
  report_name: string;
  downloaded_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscriber[]>([]);
  const [downloads, setDownloads] = useState<ReportDownload[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
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
    loadData();
  };

  const loadData = async () => {
    setLoading(true);

    const [inquiriesRes, newslettersRes, downloadsRes] = await Promise.all([
      supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false }),
      supabase.from("report_downloads").select("*").order("downloaded_at", { ascending: false }),
    ]);

    if (inquiriesRes.data) setContactInquiries(inquiriesRes.data);
    if (newslettersRes.data) setNewsletters(newslettersRes.data);
    if (downloadsRes.data) setDownloads(downloadsRes.data);

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const [digestSending, setDigestSending] = useState(false);
  const handleSendTestDigest = async () => {
    setDigestSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("trigger-weekly-digest", {
        body: { test: true },
      });
      if (error) throw error;
      toast({
        title: "Test digest sent",
        description: "Check the admin inbox for the weekly digest email.",
      });
      console.log("trigger-weekly-digest result:", data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: "Failed to send test digest",
        description: message,
        variant: "destructive",
      });
    } finally {
      setDigestSending(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your website data</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inquiries">Contact Inquiries</TabsTrigger>
            <TabsTrigger value="newsletters">Newsletter Subscribers</TabsTrigger>
            <TabsTrigger value="downloads">Report Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
                <CardDescription>
                  View all contact form submissions ({contactInquiries.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactInquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell>{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.company || "N/A"}</TableCell>
                          <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                          <TableCell>{new Date(inquiry.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletters">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
                <CardDescription>
                  View all newsletter subscriptions ({newsletters.filter(n => n.is_active).length} active)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Subscribed Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newsletters.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell>{subscriber.email}</TableCell>
                          <TableCell>{new Date(subscriber.subscribed_at).toLocaleDateString()}</TableCell>
                          <TableCell>{subscriber.is_active ? "Active" : "Unsubscribed"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle>Report Downloads</CardTitle>
                <CardDescription>
                  Track all report download activity ({downloads.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Download Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloads.map((download) => (
                        <TableRow key={download.id}>
                          <TableCell>{download.report_name}</TableCell>
                          <TableCell>{new Date(download.downloaded_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
