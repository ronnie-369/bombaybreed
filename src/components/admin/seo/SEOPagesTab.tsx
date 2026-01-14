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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, ExternalLink, Sparkles } from "lucide-react";

interface SEOPage {
  id: string;
  slug: string;
  meta_title: string;
  meta_description: string | null;
  h1_headline: string;
  page_type: string;
  is_published: boolean;
  priority: number | null;
  direct_answer_block: string | null;
  faq_items: any;
  content_sections: any;
  internal_links: any;
  capability_id: string | null;
  industry_id: string | null;
  geography_id: string | null;
  regulation_id: string | null;
  created_at: string;
  updated_at: string;
}

interface Entity {
  id: string;
  name: string;
  slug: string;
}

const SEOPagesTab = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [capabilities, setCapabilities] = useState<Entity[]>([]);
  const [industries, setIndustries] = useState<Entity[]>([]);
  const [geographies, setGeographies] = useState<Entity[]>([]);
  const [regulations, setRegulations] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SEOPage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState("");
  const [suggestingLinks, setSuggestingLinks] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: "",
    meta_title: "",
    meta_description: "",
    h1_headline: "",
    page_type: "capability",
    is_published: false,
    priority: 50,
    direct_answer_block: "",
    faq_items: "[]",
    content_sections: "{}",
    internal_links: "[]",
    capability_id: "",
    industry_id: "",
    geography_id: "",
    regulation_id: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [pagesRes, capRes, indRes, geoRes, regRes] = await Promise.all([
      supabase.from("seo_pages").select("*").order("priority", { ascending: false }),
      supabase.from("seo_capabilities").select("id, name, slug").eq("is_active", true).order("name"),
      supabase.from("seo_industries").select("id, name, slug").eq("is_active", true).order("name"),
      supabase.from("seo_geographies").select("id, name, slug").eq("is_active", true).order("name"),
      supabase.from("seo_regulations").select("id, name, slug").eq("is_active", true).order("name"),
    ]);
    
    if (pagesRes.data) setPages(pagesRes.data);
    if (capRes.data) setCapabilities(capRes.data);
    if (indRes.data) setIndustries(indRes.data);
    if (geoRes.data) setGeographies(geoRes.data);
    if (regRes.data) setRegulations(regRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let parsedFaq, parsedContent, parsedLinks;
    try {
      parsedFaq = JSON.parse(formData.faq_items);
      parsedContent = JSON.parse(formData.content_sections);
      parsedLinks = JSON.parse(formData.internal_links);
    } catch {
      toast({ title: "Invalid JSON in FAQ, content sections, or internal links", variant: "destructive" });
      return;
    }

    const payload = {
      slug: formData.slug,
      meta_title: formData.meta_title,
      meta_description: formData.meta_description || null,
      h1_headline: formData.h1_headline,
      page_type: formData.page_type as "capability" | "industry" | "geography" | "regulation" | "problem" | "combined",
      is_published: formData.is_published,
      priority: formData.priority,
      direct_answer_block: formData.direct_answer_block || null,
      faq_items: parsedFaq,
      content_sections: parsedContent,
      internal_links: parsedLinks,
      capability_id: formData.capability_id || null,
      industry_id: formData.industry_id || null,
      geography_id: formData.geography_id || null,
      regulation_id: formData.regulation_id || null,
    };

    if (editingItem) {
      const { error } = await supabase.from("seo_pages").update(payload).eq("id", editingItem.id);
      if (error) {
        toast({ title: "Error updating page", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Page updated successfully" });
      }
    } else {
      const { error } = await supabase.from("seo_pages").insert(payload);
      if (error) {
        toast({ title: "Error creating page", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Page created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: SEOPage) => {
    setEditingItem(item);
    setFormData({
      slug: item.slug,
      meta_title: item.meta_title,
      meta_description: item.meta_description || "",
      h1_headline: item.h1_headline,
      page_type: item.page_type,
      is_published: item.is_published,
      priority: item.priority || 50,
      direct_answer_block: item.direct_answer_block || "",
      faq_items: JSON.stringify(item.faq_items || [], null, 2),
      content_sections: JSON.stringify(item.content_sections || {}, null, 2),
      internal_links: JSON.stringify(item.internal_links || [], null, 2),
      capability_id: item.capability_id || "",
      industry_id: item.industry_id || "",
      geography_id: item.geography_id || "",
      regulation_id: item.regulation_id || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    const { error } = await supabase.from("seo_pages").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting page", variant: "destructive" });
    } else {
      toast({ title: "Page deleted successfully" });
      loadData();
    }
  };

  const handlePreview = (slug: string) => {
    setPreviewSlug(slug);
    setPreviewOpen(true);
  };

  const handleSuggestLinks = async () => {
    if (!editingItem) return;
    setSuggestingLinks(true);
    
    try {
      const response = await supabase.functions.invoke("suggest-internal-links", {
        body: { pageId: editingItem.id }
      });
      
      if (response.error) throw response.error;
      
      const suggestedLinks = response.data?.links || [];
      setFormData(prev => ({
        ...prev,
        internal_links: JSON.stringify(suggestedLinks, null, 2)
      }));
      toast({ title: `${suggestedLinks.length} links suggested` });
    } catch (error) {
      toast({ title: "Error suggesting links", variant: "destructive" });
    }
    
    setSuggestingLinks(false);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      slug: "",
      meta_title: "",
      meta_description: "",
      h1_headline: "",
      page_type: "capability",
      is_published: false,
      priority: 50,
      direct_answer_block: "",
      faq_items: "[]",
      content_sections: "{}",
      internal_links: "[]",
      capability_id: "",
      industry_id: "",
      geography_id: "",
      regulation_id: "",
    });
  };

  const getPageTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      capability: "bg-blue-100 text-blue-800",
      industry: "bg-green-100 text-green-800",
      geography: "bg-purple-100 text-purple-800",
      regulation: "bg-orange-100 text-orange-800",
      problem: "bg-red-100 text-red-800",
      combined: "bg-gray-100 text-gray-800",
    };
    return <Badge className={colors[type] || ""}>{type}</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>SEO Pages</CardTitle>
            <CardDescription>
              Manage programmatic SEO pages ({pages.length} total, {pages.filter(p => p.is_published).length} published)
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Page</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Page" : "Add Page"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="energy-optimisation-steel-industry"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="page_type">Page Type</Label>
                    <Select value={formData.page_type} onValueChange={(v) => setFormData({ ...formData, page_type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="capability">Capability</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="regulation">Regulation</SelectItem>
                        <SelectItem value="problem">Problem</SelectItem>
                        <SelectItem value="combined">Combined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    required
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{formData.meta_title.length}/60 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={2}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground">{formData.meta_description.length}/160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="h1_headline">H1 Headline</Label>
                  <Input
                    id="h1_headline"
                    value={formData.h1_headline}
                    onChange={(e) => setFormData({ ...formData, h1_headline: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direct_answer_block">Direct Answer Block</Label>
                  <Textarea
                    id="direct_answer_block"
                    value={formData.direct_answer_block}
                    onChange={(e) => setFormData({ ...formData, direct_answer_block: e.target.value })}
                    rows={3}
                    placeholder="Featured snippet content for search results"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capability_id">Capability</Label>
                    <Select value={formData.capability_id} onValueChange={(v) => setFormData({ ...formData, capability_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select capability" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {capabilities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry_id">Industry</Label>
                    <Select value={formData.industry_id} onValueChange={(v) => setFormData({ ...formData, industry_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {industries.map(i => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="geography_id">Geography</Label>
                    <Select value={formData.geography_id} onValueChange={(v) => setFormData({ ...formData, geography_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select geography" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {geographies.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regulation_id">Regulation</Label>
                    <Select value={formData.regulation_id} onValueChange={(v) => setFormData({ ...formData, regulation_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select regulation" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {regulations.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_sections">Content Sections (JSON)</Label>
                  <Textarea
                    id="content_sections"
                    value={formData.content_sections}
                    onChange={(e) => setFormData({ ...formData, content_sections: e.target.value })}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faq_items">FAQ Items (JSON)</Label>
                  <Textarea
                    id="faq_items"
                    value={formData.faq_items}
                    onChange={(e) => setFormData({ ...formData, faq_items: e.target.value })}
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="internal_links">Internal Links (JSON)</Label>
                    {editingItem && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={handleSuggestLinks}
                        disabled={suggestingLinks}
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        {suggestingLinks ? "Suggesting..." : "Auto-Suggest Links"}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    id="internal_links"
                    value={formData.internal_links}
                    onChange={(e) => setFormData({ ...formData, internal_links: e.target.value })}
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority (0-100)</Label>
                    <Input
                      id="priority"
                      type="number"
                      min={0}
                      max={100}
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 50 })}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>
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
                  <TableHead>Slug</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">/{item.slug}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.meta_title}</TableCell>
                    <TableCell>{getPageTypeBadge(item.page_type)}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell>
                      <Badge variant={item.is_published ? "default" : "secondary"}>
                        {item.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handlePreview(item.slug)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`/${item.slug}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
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

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Preview: /{previewSlug}</DialogTitle>
          </DialogHeader>
          <iframe 
            src={`/${previewSlug}`} 
            className="w-full h-full border rounded-lg"
            title="Page Preview"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SEOPagesTab;
