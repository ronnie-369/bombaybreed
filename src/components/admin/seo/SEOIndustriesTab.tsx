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

interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  emission_profile: string | null;
  energy_intensity: string | null;
  typical_roles: string[] | null;
  regulation_exposure: string[] | null;
  is_active: boolean;
  created_at: string;
}

const SEOIndustriesTab = () => {
  const { toast } = useToast();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Industry | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    emission_profile: "",
    energy_intensity: "medium",
    typical_roles: "",
    regulation_exposure: "",
    is_active: true,
  });

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_industries")
      .select("*")
      .order("name");
    
    if (data) setIndustries(data);
    if (error) toast({ title: "Error loading industries", variant: "destructive" });
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
      description: formData.description || null,
      emission_profile: formData.emission_profile || null,
      energy_intensity: formData.energy_intensity as "high" | "medium" | "low",
      typical_roles: formData.typical_roles ? formData.typical_roles.split(",").map(s => s.trim()) : [],
      regulation_exposure: formData.regulation_exposure ? formData.regulation_exposure.split(",").map(s => s.trim()) : [],
      is_active: formData.is_active,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("seo_industries")
        .update(payload)
        .eq("id", editingItem.id);
      
      if (error) {
        toast({ title: "Error updating industry", variant: "destructive" });
      } else {
        toast({ title: "Industry updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from("seo_industries")
        .insert(payload);
      
      if (error) {
        toast({ title: "Error creating industry", variant: "destructive" });
      } else {
        toast({ title: "Industry created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadIndustries();
  };

  const handleEdit = (item: Industry) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      emission_profile: item.emission_profile || "",
      energy_intensity: item.energy_intensity || "medium",
      typical_roles: item.typical_roles?.join(", ") || "",
      regulation_exposure: item.regulation_exposure?.join(", ") || "",
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;
    
    const { error } = await supabase
      .from("seo_industries")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error deleting industry", variant: "destructive" });
    } else {
      toast({ title: "Industry deleted successfully" });
      loadIndustries();
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      emission_profile: "",
      energy_intensity: "medium",
      typical_roles: "",
      regulation_exposure: "",
      is_active: true,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Industries</CardTitle>
          <CardDescription>Manage target industries ({industries.length} total)</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Industry</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Industry" : "Add Industry"}</DialogTitle>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emission_profile">Emission Profile</Label>
                  <Input
                    id="emission_profile"
                    value={formData.emission_profile}
                    onChange={(e) => setFormData({ ...formData, emission_profile: e.target.value })}
                    placeholder="e.g., High process emissions"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="energy_intensity">Energy Intensity</Label>
                  <Select value={formData.energy_intensity} onValueChange={(v) => setFormData({ ...formData, energy_intensity: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="typical_roles">Typical Roles (comma-separated)</Label>
                <Input
                  id="typical_roles"
                  value={formData.typical_roles}
                  onChange={(e) => setFormData({ ...formData, typical_roles: e.target.value })}
                  placeholder="e.g., CFO, Plant Manager, Sustainability Head"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regulation_exposure">Regulation Exposure (comma-separated)</Label>
                <Input
                  id="regulation_exposure"
                  value={formData.regulation_exposure}
                  onChange={(e) => setFormData({ ...formData, regulation_exposure: e.target.value })}
                  placeholder="e.g., EU ETS, CBAM, PAT Scheme"
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
                <TableHead>Energy Intensity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {industries.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                  <TableCell className="capitalize">{item.energy_intensity || "-"}</TableCell>
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

export default SEOIndustriesTab;
