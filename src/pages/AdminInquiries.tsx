import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: string;
  created_at: string;
};

type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  designation: string | null;
  form_type: string;
  report_requested: string;
  marketing_consent: boolean;
  created_at: string;
};

type Newsletter = {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
};

type Quiz = {
  id: string;
  personality_selected: string;
  form_completed: boolean;
  created_at: string;
};

type Download = {
  id: string;
  report_name: string;
  lead_id: string;
  downloaded_at: string;
};

const fmt = (d: string) => new Date(d).toLocaleString();

const toCSV = (rows: Record<string, unknown>[]) => {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
};

const download = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const filterRows = <T extends Record<string, unknown>>(rows: T[], q: string): T[] => {
  if (!q.trim()) return rows;
  const needle = q.toLowerCase();
  return rows.filter((r) =>
    Object.values(r).some((v) => v !== null && v !== undefined && String(v).toLowerCase().includes(needle))
  );
};

const AdminInquiries = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [query, setQuery] = useState("");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();
      if (error || !roleData) {
        toast({ title: "Access Denied", description: "Admin only", variant: "destructive" });
        navigate("/");
        return;
      }
      setIsAdmin(true);

      const [b, i, s, n, q, d] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false }),
        supabase.from("quiz_interactions").select("*").order("created_at", { ascending: false }),
        supabase.from("report_downloads").select("*").order("downloaded_at", { ascending: false }),
      ]);
      if (b.data) setBookings(b.data as Booking[]);
      if (i.data) setInquiries(i.data as ContactInquiry[]);
      if (s.data) setSubmissions(s.data as ContactSubmission[]);
      if (n.data) setNewsletters(n.data as Newsletter[]);
      if (q.data) setQuizzes(q.data as Quiz[]);
      if (d.data) setDownloads(d.data as Download[]);
      setLoading(false);
    })();
  }, [navigate, toast]);

  if (!isAdmin) return null;

  const fBookings = filterRows(bookings, query);
  const fInquiries = filterRows(inquiries, query);
  const fSubmissions = filterRows(submissions, query);
  const fNewsletters = filterRows(newsletters, query);
  const fQuizzes = filterRows(quizzes, query);
  const fDownloads = filterRows(downloads, query);

  const activeNewsletters = newsletters.filter((n) => n.is_active).length;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Inquiries</h1>
            <p className="text-muted-foreground mt-2">
              Unified view of every lead pathway across the site.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Note: forms currently post to Formspree. Tables below reflect what is also persisted in Supabase. Wire forms to Supabase to make every silo complete.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin"><Button variant="outline">Back to Admin</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {[
            { label: "Bookings", value: bookings.length },
            { label: "Contact (legacy)", value: inquiries.length },
            { label: "Report leads", value: submissions.length },
            { label: "Newsletter (active)", value: activeNewsletters },
            { label: "Quiz", value: quizzes.length },
            { label: "Downloads", value: downloads.length },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-4">
          <Input
            placeholder="Search across all rows (name, email, company, message…)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="reports">Report Leads</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Consultation Bookings</CardTitle>
                  <CardDescription>{fBookings.length} of {bookings.length} shown</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => download("bookings.csv", toCSV(fBookings))}>Export CSV</Button>
              </CardHeader>
              <CardContent>
                {loading ? <p>Loading…</p> : fBookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No bookings stored in Supabase. BookingDialog currently posts only to Formspree.</p>
                ) : (
                  <Table>
                    <TableHeader><TableRow>
                      <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Company</TableHead>
                      <TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {fBookings.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell>{b.name}</TableCell>
                          <TableCell>{b.email}</TableCell>
                          <TableCell>{b.company ?? "—"}</TableCell>
                          <TableCell>{b.preferred_date}</TableCell>
                          <TableCell>{b.preferred_time}</TableCell>
                          <TableCell><Badge variant="outline">{b.status}</Badge></TableCell>
                          <TableCell>{fmt(b.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Contact Inquiries</CardTitle>
                  <CardDescription>{fInquiries.length} of {inquiries.length} shown</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => download("contact_inquiries.csv", toCSV(fInquiries))}>Export CSV</Button>
              </CardHeader>
              <CardContent>
                {loading ? <p>Loading…</p> : fInquiries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No contact inquiries.</p>
                ) : (
                  <Table>
                    <TableHeader><TableRow>
                      <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Company</TableHead>
                      <TableHead>Message</TableHead><TableHead>Date</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {fInquiries.map((i) => (
                        <TableRow key={i.id}>
                          <TableCell>{i.name}</TableCell>
                          <TableCell>{i.email}</TableCell>
                          <TableCell>{i.company ?? "—"}</TableCell>
                          <TableCell className="max-w-md truncate" title={i.message}>{i.message}</TableCell>
                          <TableCell>{fmt(i.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Report Lead Submissions</CardTitle>
                  <CardDescription>{fSubmissions.length} of {submissions.length} shown</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => download("report_leads.csv", toCSV(fSubmissions))}>Export CSV</Button>
              </CardHeader>
              <CardContent>
                {loading ? <p>Loading…</p> : fSubmissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No report lead submissions.</p>
                ) : (
                  <Table>
                    <TableHeader><TableRow>
                      <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead>
                      <TableHead>Company</TableHead><TableHead>Report</TableHead>
                      <TableHead>Consent</TableHead><TableHead>Form</TableHead><TableHead>Date</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {fSubmissions.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>{s.name}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.phone ?? "—"}</TableCell>
                          <TableCell>{s.company_name ?? "—"}</TableCell>
                          <TableCell>{s.report_requested}</TableCell>
                          <TableCell>{s.marketing_consent ? "Yes" : "No"}</TableCell>
                          <TableCell><Badge variant="outline">{s.form_type}</Badge></TableCell>
                          <TableCell>{fmt(s.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Newsletter Subscribers</CardTitle>
                  <CardDescription>{activeNewsletters} active · {fNewsletters.length} of {newsletters.length} shown</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => download("newsletter.csv", toCSV(fNewsletters))}>Export CSV</Button>
              </CardHeader>
              <CardContent>
                {loading ? <p>Loading…</p> : fNewsletters.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No subscribers stored in Supabase.</p>
                ) : (
                  <Table>
                    <TableHeader><TableRow>
                      <TableHead>Email</TableHead><TableHead>Status</TableHead>
                      <TableHead>Subscribed</TableHead><TableHead>Unsubscribed</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {fNewsletters.map((n) => (
                        <TableRow key={n.id}>
                          <TableCell>{n.email}</TableCell>
                          <TableCell>
                            <Badge variant={n.is_active ? "default" : "secondary"}>
                              {n.is_active ? "Active" : "Unsubscribed"}
                            </Badge>
                          </TableCell>
                          <TableCell>{fmt(n.subscribed_at)}</TableCell>
                          <TableCell>{n.unsubscribed_at ? fmt(n.unsubscribed_at) : "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Green Jobs Quiz</CardTitle>
                  <CardDescription>{fQuizzes.length} of {quizzes.length} shown</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => download("quiz.csv", toCSV(fQuizzes))}>Export CSV</Button>
              </CardHeader>
              <CardContent>
                {loading ? <p>Loading…</p> : fQuizzes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No quiz interactions logged.</p>
                ) : (
                  <Table>
                    <TableHeader><TableRow>
                      <TableHead>Archetype</TableHead><TableHead>Form Completed</TableHead><TableHead>Date</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {fQuizzes.map((q) => (
                        <TableRow key={q.id}>
                          <TableCell>{q.personality_selected}</TableCell>
                          <TableCell>{q.form_completed ? "Yes" : "No"}</TableCell>
                          <TableCell>{fmt(q.created_at)}</TableCell>
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
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Report Downloads</CardTitle>
                  <CardDescription>{fDownloads.length} of {downloads.length} shown</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => download("downloads.csv", toCSV(fDownloads))}>Export CSV</Button>
              </CardHeader>
              <CardContent>
                {loading ? <p>Loading…</p> : fDownloads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No download events logged.</p>
                ) : (
                  <Table>
                    <TableHeader><TableRow>
                      <TableHead>Report</TableHead><TableHead>Lead ID</TableHead><TableHead>Downloaded</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {fDownloads.map((d) => (
                        <TableRow key={d.id}>
                          <TableCell>{d.report_name}</TableCell>
                          <TableCell className="font-mono text-xs">{d.lead_id}</TableCell>
                          <TableCell>{fmt(d.downloaded_at)}</TableCell>
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

export default AdminInquiries;
