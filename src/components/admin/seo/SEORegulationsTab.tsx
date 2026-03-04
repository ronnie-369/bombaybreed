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

interface Regulation {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  jurisdiction: string | null;
  risk_type: string | null;
  urgency: string | null;
  is_active: boolean;
  created_at: string;
}

const SEORegulationsTab = () => {
  const { toast } = useToast();
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Regulation | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    jurisdiction: "",
    risk_type: "",
    urgency: "medium",
    is_active: true,
  });

  useEffect(() => {
    loadRegulations();
  }, []);

  const loadRegulations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_regulations")
      .select("*")
      .order("name");
    
    if (data) setRegulations(data);
    if (error) toast({ title: "Error loading regulations", variant: "destructive" });
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
      jurisdiction: formData.jurisdiction || null,
      risk_type: formData.risk_type || null,
      urgency: formData.urgency as "high" | "medium" | "low",
      is_active: formData.is_active,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("seo_regulations")
        .update(payload)
        .eq("id", editingItem.id);
      
      if (error) {
        toast({ title: "Error updating regulation", variant: "destructive" });
      } else {
        toast({ title: "Regulation updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from("seo_regulations")
        .insert(payload);
      
      if (error) {
        toast({ title: "Error creating regulation", variant: "destructive" });
      } else {
        toast({ title: "Regulation created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadRegulations();
  };

  const handleEdit = (item: Regulation) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      jurisdiction: item.jurisdiction || "",
      risk_type: item.risk_type || "",
      urgency: item.urgency || "medium",
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this regulation?")) return;
    
    const { error } = await supabase
      .from("seo_regulations")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error deleting regulation", variant: "destructive" });
    } else {
      toast({ title: "Regulation deleted successfully" });
      loadRegulations();
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      jurisdiction: "",
      risk_type: "",
      urgency: "medium",
      is_active: true,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Regulations</CardTitle>
          <CardDescription>Manage regulatory frameworks ({regulations.length} total)</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Regulation</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Regulation" : "Add Regulation"}</DialogTitle>
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
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                    placeholder="e.g., EU, India, Global"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk_type">Risk Type</Label>
                  <Input
                    id="risk_type"
                    value={formData.risk_type}
                    onChange={(e) => setFormData({ ...formData, risk_type: e.target.value })}
                    placeholder="e.g., Trade barrier, Carbon pricing"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={formData.urgency} onValueChange={(v) => setFormData({ ...formData, urgency: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
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
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regulations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                  <TableCell>{item.jurisdiction || "-"}</TableCell>
                  <TableCell className="capitalize">{item.urgency || "-"}</TableCell>
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

export default SEORegulationsTab;
