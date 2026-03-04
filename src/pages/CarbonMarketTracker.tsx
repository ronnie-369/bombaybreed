import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, BarChart3, Activity, Leaf, Globe, ArrowUpRight, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarketDataPoint {
  id: string;
  date: string;
  market_segment: string;
  price_inr: number;
  price_usd: number | null;
  volume_tonnes: number | null;
  source: string | null;
  notes: string | null;
}

const SEGMENT_CONFIG: Record<string, { label: string; color: string; description: string }> = {
  ICCT: { label: 'Indian Carbon Credit Trading', color: 'hsl(160, 45%, 25%)', description: 'BEE-administered compliance market under the Energy Conservation Act' },
  VCM: { label: 'Voluntary Carbon Market', color: 'hsl(200, 60%, 40%)', description: 'Verra/Gold Standard credits from India-based projects' },
  CER: { label: 'Certified Emission Reductions', color: 'hsl(35, 70%, 50%)', description: 'Legacy CDM credits transitioning to Article 6.4' },
};

const CarbonMarketTracker = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['carbon-market-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('carbon_market_data')
        .select('*')
        .order('date', { ascending: true });
      if (error) throw error;
      return data as MarketDataPoint[];
    },
    staleTime: 1000 * 60 * 30, // 30 min cache
  });

  const { latestPrices, chartData, volumeData, totalVolume } = useMemo(() => {
    if (!marketData?.length) return { latestPrices: {}, chartData: [], volumeData: [], totalVolume: 0 };

    // Latest price per segment
    const latest: Record<string, MarketDataPoint & { prevPrice: number }> = {};
    const segments = ['ICCT', 'VCM', 'CER'];
    segments.forEach(seg => {
      const segData = marketData.filter(d => d.market_segment === seg);
      if (segData.length >= 2) {
        latest[seg] = { ...segData[segData.length - 1], prevPrice: segData[segData.length - 2].price_inr };
      } else if (segData.length === 1) {
        latest[seg] = { ...segData[0], prevPrice: segData[0].price_inr };
      }
    });

    // Chart data: merge by date
    const dateMap: Record<string, any> = {};
    marketData.forEach(d => {
      const month = new Date(d.date).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      if (!dateMap[d.date]) dateMap[d.date] = { date: d.date, month };
      dateMap[d.date][d.market_segment] = Number(d.price_inr);
      dateMap[d.date][`${d.market_segment}_vol`] = d.volume_tonnes;
    });

    const chart = Object.values(dateMap).sort((a: any, b: any) => a.date.localeCompare(b.date));

    const vol = chart.map((d: any) => ({
      month: d.month,
      ICCT: d.ICCT_vol || 0,
      VCM: d.VCM_vol || 0,
      CER: d.CER_vol || 0,
    }));

    const total = marketData.reduce((sum, d) => sum + (d.volume_tonnes || 0), 0);

    return { latestPrices: latest, chartData: chart, volumeData: vol, totalVolume: total };
  }, [marketData]);

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;
  const pctChange = (curr: number, prev: number) => prev ? ((curr - prev) / prev * 100).toFixed(1) : '0';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "India Carbon Market Price Tracker",
    description: "Real-time carbon credit pricing data across Indian compliance and voluntary markets",
    url: "https://bombaybreed.com/india-carbon-market-tracker",
    creator: { "@type": "Person", name: "Theresa Ronnie" },
    temporalCoverage: "2025-06/..",
    keywords: ["carbon credits India", "ICCT pricing", "voluntary carbon market", "carbon trading India"],
  };

  return (
    <>
      <Helmet>
        <title>India Carbon Market Tracker | Live Pricing & Trends</title>
        <meta name="description" content="Track India's carbon credit prices across ICCT compliance, voluntary (VCM), and CER markets. Updated monthly with pricing trends, volumes, and policy analysis." />
        <link rel="canonical" href="https://bombaybreed.com/india-carbon-market-tracker" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs uppercase tracking-wider">
                Live Data · Updated Monthly
              </Badge>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              India Carbon Market Tracker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Monitor carbon credit prices across India's compliance and voluntary markets. 
              Data sourced from BEE, Verra, Gold Standard, and UNFCCC registries.
            </p>
          </div>
        </section>

        {/* Price Cards */}
        <section className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-8 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))
            ) : (
              Object.entries(SEGMENT_CONFIG).map(([key, config]) => {
                const data = latestPrices[key];
                if (!data) return null;
                const change = Number(pctChange(data.price_inr, data.prevPrice));
                const isUp = change >= 0;
                return (
                  <Card key={key} className="border-border/50 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{key}</span>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                      </div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-foreground">{formatINR(data.price_inr)}</span>
                        <span className="text-sm text-muted-foreground">/tCO₂e</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isUp ? (
                          <TrendingUp className="w-4 h-4 text-primary" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                        <span className={`text-sm font-medium ${isUp ? 'text-primary' : 'text-destructive'}`}>
                          {isUp ? '+' : ''}{change}%
                        </span>
                        <span className="text-xs text-muted-foreground">vs prev month</span>
                      </div>
                      {data.price_usd && (
                        <p className="text-xs text-muted-foreground mt-2">≈ ${data.price_usd}/tCO₂e</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </section>

        {/* Charts */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="price" className="gap-2"><TrendingUp className="w-4 h-4" /> Price Trends</TabsTrigger>
              <TabsTrigger value="volume" className="gap-2"><BarChart3 className="w-4 h-4" /> Volume</TabsTrigger>
            </TabsList>

            <TabsContent value="price">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-display">Carbon Credit Price Trends (₹/tCO₂e)</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[350px] w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="gradICCT" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(160, 45%, 25%)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="hsl(160, 45%, 25%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradVCM" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(200, 60%, 40%)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="hsl(200, 60%, 40%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradCER" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(35, 70%, 50%)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="hsl(35, 70%, 50%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
                        <Tooltip
                          contentStyle={{ borderRadius: '8px', border: '1px solid hsl(210, 15%, 90%)', fontSize: '13px' }}
                          formatter={(value: number, name: string) => [`₹${value}`, SEGMENT_CONFIG[name]?.label || name]}
                        />
                        <Legend formatter={(value: string) => SEGMENT_CONFIG[value]?.label || value} />
                        <Area type="monotone" dataKey="ICCT" stroke="hsl(160, 45%, 25%)" fill="url(#gradICCT)" strokeWidth={2.5} dot={{ r: 3 }} />
                        <Area type="monotone" dataKey="VCM" stroke="hsl(200, 60%, 40%)" fill="url(#gradVCM)" strokeWidth={2.5} dot={{ r: 3 }} />
                        <Area type="monotone" dataKey="CER" stroke="hsl(35, 70%, 50%)" fill="url(#gradCER)" strokeWidth={2.5} dot={{ r: 3 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volume">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-display">Trading Volume (tonnes CO₂e)</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[350px] w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ borderRadius: '8px', border: '1px solid hsl(210, 15%, 90%)', fontSize: '13px' }}
                          formatter={(value: number, name: string) => [`${value.toLocaleString()} t`, SEGMENT_CONFIG[name]?.label || name]}
                        />
                        <Legend formatter={(value: string) => SEGMENT_CONFIG[value]?.label || value} />
                        <Bar dataKey="ICCT" fill="hsl(160, 45%, 25%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="VCM" fill="hsl(200, 60%, 40%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="CER" fill="hsl(35, 70%, 50%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Market Segments */}
        <section className="container mx-auto px-4 pb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Market Segments Explained</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(SEGMENT_CONFIG).map(([key, config]) => (
              <Card key={key} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${config.color}15` }}>
                      {key === 'ICCT' ? <Leaf className="w-5 h-5" style={{ color: config.color }} /> :
                       key === 'VCM' ? <Globe className="w-5 h-5" style={{ color: config.color }} /> :
                       <Activity className="w-5 h-5" style={{ color: config.color }} />}
                    </div>
                    <h3 className="font-semibold text-foreground">{key}</h3>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">{config.label}</p>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Table */}
        <section className="container mx-auto px-4 pb-12">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-display">Full Price History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Segment</TableHead>
                        <TableHead className="text-right">₹/tCO₂e</TableHead>
                        <TableHead className="text-right">$/tCO₂e</TableHead>
                        <TableHead className="text-right">Volume (t)</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketData?.slice().reverse().map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-mono text-sm">
                            {new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {row.market_segment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{formatINR(row.price_inr)}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{row.price_usd ? `$${row.price_usd}` : '-'}</TableCell>
                          <TableCell className="text-right">{row.volume_tonnes?.toLocaleString() || '-'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{row.source || '-'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{row.notes || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Policy Context */}
        <section className="container mx-auto px-4 pb-12">
          <Card className="border-border/50 bg-primary/5">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">Policy Context</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                    <p>
                      India's carbon market is evolving rapidly. The <strong>Indian Carbon Credit Trading Scheme (ICCTS)</strong>, 
                      notified under the Energy Conservation Act 2001, is transitioning from the PAT scheme to a broader 
                      cap-and-trade mechanism administered by the Bureau of Energy Efficiency (BEE).
                    </p>
                    <p>
                      Simultaneously, the <strong>voluntary carbon market</strong> continues to grow, driven by corporate net-zero 
                      commitments and increasing CBAM pressure on Indian exporters to the EU. Quality premiums are widening 
                      as buyers shift toward high-integrity credits with co-benefits.
                    </p>
                    <p>
                      For strategic guidance on navigating India's carbon markets, explore our{' '}
                      <Link to="/carbon-market-advisory-india" className="text-primary hover:underline">Carbon Market Advisory</Link>{' '}
                      services or download our{' '}
                      <Link to="/carbon-market-outlook" className="text-primary hover:underline">Carbon Market Outlook report</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-16">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Need Carbon Market Intelligence?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get bespoke analysis on carbon pricing trends, compliance strategy, and offset portfolio optimization for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/carbon-market-advisory-india"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Explore Advisory Services <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  Browse Reports
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CarbonMarketTracker;
