import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type Source =
  | "bookings"
  | "contact_inquiries"
  | "contact_submissions"
  | "newsletter_subscribers"
  | "quiz_interactions"
  | "report_downloads";

const SOURCES: { key: Source; label: string; dateCol: string; color: string }[] = [
  { key: "bookings", label: "Bookings", dateCol: "created_at", color: "#1A3D5C" },
  { key: "contact_inquiries", label: "Contact", dateCol: "created_at", color: "#C5A059" },
  { key: "contact_submissions", label: "Report leads", dateCol: "created_at", color: "#0A0A0B" },
  { key: "newsletter_subscribers", label: "Newsletter", dateCol: "subscribed_at", color: "#7A8FA6" },
  { key: "quiz_interactions", label: "Quiz", dateCol: "created_at", color: "#A07C3F" },
  { key: "report_downloads", label: "Downloads", dateCol: "downloaded_at", color: "#475569" },
];

const RANGES = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1y", days: 365 },
];

const dayKey = (iso: string) => iso.slice(0, 10);

const buildSeries = (dataByDate: Record<string, Record<Source, number>>, days: number) => {
  const out: Array<Record<string, number | string>> = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const k = d.toISOString().slice(0, 10);
    const row: Record<string, number | string> = { date: k.slice(5) };
    for (const s of SOURCES) row[s.label] = dataByDate[k]?.[s.key] ?? 0;
    out.push(row);
  }
  return out;
};

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [days, setDays] = useState(30);
  const [raw, setRaw] = useState<Record<string, Record<Source, number>>>({});
  const [totals, setTotals] = useState<Record<Source, number>>({
    bookings: 0,
    contact_inquiries: 0,
    contact_submissions: 0,
    newsletter_subscribers: 0,
    quiz_interactions: 0,
    report_downloads: 0,
  });

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

      const since = new Date();
      since.setUTCDate(since.getUTCDate() - 365);
      const sinceIso = since.toISOString();

      const results = await Promise.all(
        SOURCES.map((s) =>
          supabase
            .from(s.key)
            .select(s.dateCol)
            .gte(s.dateCol, sinceIso)
            .order(s.dateCol, { ascending: false })
            .limit(1000)
        )
      );

      const byDate: Record<string, Record<Source, number>> = {};
      const tot: Record<Source, number> = { ...totals };
      results.forEach((res, idx) => {
        const s = SOURCES[idx];
        if (!res.data) return;
        tot[s.key] = res.data.length;
        for (const row of res.data as Array<Record<string, string>>) {
          const iso = row[s.dateCol];
          if (!iso) continue;
          const k = dayKey(iso);
          byDate[k] ??= {
            bookings: 0,
            contact_inquiries: 0,
            contact_submissions: 0,
            newsletter_subscribers: 0,
            quiz_interactions: 0,
            report_downloads: 0,
          };
          byDate[k][s.key]++;
        }
      });
      setRaw(byDate);
      setTotals(tot);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, toast]);

  const series = useMemo(() => buildSeries(raw, days), [raw, days]);
  const rangeTotals = useMemo(() => {
    const out: Record<string, number> = {};
    for (const s of SOURCES) out[s.label] = series.reduce((a, r) => a + (Number(r[s.label]) || 0), 0);
    return out;
  }, [series]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Form Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Daily submission volume across every lead pathway.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/inquiries"><Button variant="outline">View Inquiries</Button></Link>
            <Link to="/admin"><Button variant="outline">Back to Admin</Button></Link>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {RANGES.map((r) => (
            <Button
              key={r.label}
              variant={days === r.days ? "default" : "outline"}
              size="sm"
              onClick={() => setDays(r.days)}
            >
              {r.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {SOURCES.map((s) => (
            <Card key={s.key}>
              <CardContent className="p-4">
                <div className="text-2xl font-semibold" style={{ color: s.color }}>
                  {rangeTotals[s.label] ?? 0}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-[10px] text-muted-foreground/70 mt-1">
                  {totals[s.key]} all-time (1y cap)
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {loading ? (
          <Card><CardContent className="p-12 text-center text-muted-foreground">Loading…</CardContent></Card>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Submissions over time</CardTitle>
                <CardDescription>Daily count per source, last {days} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 360 }}>
                  <ResponsiveContainer>
                    <LineChart data={series} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      {SOURCES.map((s) => (
                        <Line
                          key={s.key}
                          type="monotone"
                          dataKey={s.label}
                          stroke={s.color}
                          strokeWidth={2}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Totals by source</CardTitle>
                <CardDescription>Range total comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={SOURCES.map((s) => ({ source: s.label, total: rangeTotals[s.label] ?? 0, fill: s.color }))}
                      margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="total" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
