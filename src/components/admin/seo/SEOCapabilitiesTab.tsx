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

interface Capability {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  decision_maker: string | null;
  buyer_intent: string | null;
  contract_value: string | null;
  conversion_cta: string | null;
  is_active: boolean;
  created_at: string;
}

const SEOCapabilitiesTab = () => {
  const { toast } = useToast();
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Capability | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    decision_maker: "",
    buyer_intent: "medium",
    contract_value: "medium",
    conversion_cta: "",
    is_active: true,
  });

  useEffect(() => {
    loadCapabilities();
  }, []);

  const loadCapabilities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_capabilities")
      .select("*")
      .order("name");
    
    if (data) setCapabilities(data);
    if (error) toast({ title: "Error loading capabilities", variant: "destructive" });
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
      decision_maker: formData.decision_maker || null,
      buyer_intent: formData.buyer_intent as "high" | "medium" | "low",
      contract_value: formData.contract_value as "high" | "medium" | "low",
      conversion_cta: formData.conversion_cta || null,
      is_active: formData.is_active,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("seo_capabilities")
        .update(payload)
        .eq("id", editingItem.id);
      
      if (error) {
        toast({ title: "Error updating capability", variant: "destructive" });
      } else {
        toast({ title: "Capability updated successfully" });
      }
    } else {
      const { error } = await supabase
        .from("seo_capabilities")
        .insert(payload);
      
      if (error) {
        toast({ title: "Error creating capability", variant: "destructive" });
      } else {
        toast({ title: "Capability created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadCapabilities();
  };

  const handleEdit = (item: Capability) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      decision_maker: item.decision_maker || "",
      buyer_intent: item.buyer_intent || "medium",
      contract_value: item.contract_value || "medium",
      conversion_cta: item.conversion_cta || "",
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this capability?")) return;
    
    const { error } = await supabase
      .from("seo_capabilities")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error deleting capability", variant: "destructive" });
    } else {
      toast({ title: "Capability deleted successfully" });
      loadCapabilities();
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      decision_maker: "",
      buyer_intent: "medium",
      contract_value: "medium",
      conversion_cta: "",
      is_active: true,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Capabilities</CardTitle>
          <CardDescription>Manage service capabilities ({capabilities.length} total)</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Capability</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Capability" : "Add Capability"}</DialogTitle>
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
                  <Label htmlFor="decision_maker">Decision Maker</Label>
                  <Input
                    id="decision_maker"
                    value={formData.decision_maker}
                    onChange={(e) => setFormData({ ...formData, decision_maker: e.target.value })}
                    placeholder="e.g., CFO, CTO, CEO"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conversion_cta">Conversion CTA</Label>
                  <Input
                    id="conversion_cta"
                    value={formData.conversion_cta}
                    onChange={(e) => setFormData({ ...formData, conversion_cta: e.target.value })}
                    placeholder="e.g., Schedule Consultation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer_intent">Buyer Intent</Label>
                  <Select value={formData.buyer_intent} onValueChange={(v) => setFormData({ ...formData, buyer_intent: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract_value">Contract Value</Label>
                  <Select value={formData.contract_value} onValueChange={(v) => setFormData({ ...formData, contract_value: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <TableHead>Decision Maker</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {capabilities.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                  <TableCell>{item.decision_maker || "—"}</TableCell>
                  <TableCell className="capitalize">{item.buyer_intent || "—"}</TableCell>
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

export default SEOCapabilitiesTab;
