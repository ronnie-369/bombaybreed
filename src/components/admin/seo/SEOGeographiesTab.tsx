import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Geography {
  id: string;
  name: string;
  slug: string;
  geo_type: string;
  description: string | null;
  regulatory_context: string | null;
  energy_profile: string | null;
  capital_presence: string | null;
  dominant_industries: string[] | null;
  is_active: boolean;
  created_at: string;
}

const SEOGeographiesTab = () => {
  const { toast } = useToast();
  const [geographies, setGeographies] = useState<Geography[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Geography | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    geo_type: "country",
    description: "",
    regulatory_context: "",
    energy_profile: "",
    capital_presence: "",
    dominant_industries: "",
    is_active: true,
  });

  useEffect(() => {
    loadGeographies();
  }, []);

  const loadGeographies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_geographies")
      .select("*")
      .order("name");
    
    if (data) setGeographies(data);
    if (error) toast({ title: "Error loading geographies", variant: "destructive" });
    setLoading(false);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      geo_type: formData.geo_type as "state" | "city" | "country" | "region",
      description: formData.description || null,
      regulatory_context: formData.regulatory_context || null,
      energy_profile: formData.energy_profile || null,
      capital_presence: formData.capital_presence || null,
      dominant_industries: formData.dominant_industries ? formData.dominant_industries.split(",").map(s => s.trim()) : [],
      is_active: formData.is_active,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("seo_geographies")
        .update(payload)
        .eq("id", editingItem.id);
      
      if (error) {
        toast({ title: "Error updating geography", variant: "destructive" });
      } else {
        toast({ title: "Geography updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from("seo_geographies")
        .insert(payload);
      
      if (error) {
        toast({ title: "Error creating geography", variant: "destructive" });
      } else {
        toast({ title: "Geography created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadGeographies();
  };

  const handleEdit = (item: Geography) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      geo_type: item.geo_type,
      description: item.description || "",
      regulatory_context: item.regulatory_context || "",
      energy_profile: item.energy_profile || "",
      capital_presence: item.capital_presence || "",
      dominant_industries: item.dominant_industries?.join(", ") || "",
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this geography?")) return;
    
    const { error } = await supabase
      .from("seo_geographies")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error deleting geography", variant: "destructive" });
    } else {
      toast({ title: "Geography deleted successfully" });
      loadGeographies();
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      slug: "",
      geo_type: "country",
      description: "",
      regulatory_context: "",
      energy_profile: "",
      capital_presence: "",
      dominant_industries: "",
      is_active: true,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Geographies</CardTitle>
          <CardDescription>Manage target geographies ({geographies.length} total)</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Geography</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Geography" : "Add Geography"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Auto-generated from name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="geo_type">Geography Type</Label>
                <Select value={formData.geo_type} onValueChange={(v) => setFormData({ ...formData, geo_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="region">Region</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regulatory_context">Regulatory Context</Label>
                <Textarea
                  id="regulatory_context"
                  value={formData.regulatory_context}
                  onChange={(e) => setFormData({ ...formData, regulatory_context: e.target.value })}
                  rows={2}
                  placeholder="Key regulations and policy landscape"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="energy_profile">Energy Profile</Label>
                  <Input
                    id="energy_profile"
                    value={formData.energy_profile}
                    onChange={(e) => setFormData({ ...formData, energy_profile: e.target.value })}
                    placeholder="e.g., Coal-dependent, renewable growth"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capital_presence">Capital Presence</Label>
                  <Input
                    id="capital_presence"
                    value={formData.capital_presence}
                    onChange={(e) => setFormData({ ...formData, capital_presence: e.target.value })}
                    placeholder="e.g., Strong climate finance hub"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dominant_industries">Dominant Industries (comma-separated)</Label>
                <Input
                  id="dominant_industries"
                  value={formData.dominant_industries}
                  onChange={(e) => setFormData({ ...formData, dominant_industries: e.target.value })}
                  placeholder="e.g., Steel, Cement, Chemicals"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geographies.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                  <TableCell className="capitalize">{item.geo_type}</TableCell>
                  <TableCell>{item.is_active ? "Active" : "Inactive"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SEOGeographiesTab;
