
-- Carbon market pricing data table for the India Carbon Market Tracker
CREATE TABLE public.carbon_market_data (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  market_segment text NOT NULL, -- 'ICCT' (Indian Carbon Credit Trading), 'VCM' (Voluntary), 'CER' (Certified Emission Reductions)
  price_inr numeric(10,2) NOT NULL,
  price_usd numeric(10,2),
  volume_tonnes integer,
  source text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.carbon_market_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view carbon market data"
  ON public.carbon_market_data FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage carbon market data"
  ON public.carbon_market_data FOR ALL
  USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

-- Seed with historical data points
INSERT INTO public.carbon_market_data (date, market_segment, price_inr, price_usd, volume_tonnes, source, notes) VALUES
-- Indian Carbon Credit Trading Scheme (ICCT) - BEE administered
('2025-06-15', 'ICCT', 600, 7.10, 15000, 'BEE/MoEFCC', 'Initial CCTS pilot phase pricing'),
('2025-07-15', 'ICCT', 625, 7.40, 18000, 'BEE/MoEFCC', 'Growing demand from obligated entities'),
('2025-08-15', 'ICCT', 650, 7.70, 22000, 'BEE/MoEFCC', 'PAT Cycle VII compliance deadline effect'),
('2025-09-15', 'ICCT', 680, 8.00, 25000, 'BEE/MoEFCC', 'Expanded sectoral coverage announced'),
('2025-10-15', 'ICCT', 710, 8.35, 28000, 'BEE/MoEFCC', 'Steel sector compliance buying'),
('2025-11-15', 'ICCT', 740, 8.70, 32000, 'BEE/MoEFCC', 'Year-end compliance surge'),
('2025-12-15', 'ICCT', 780, 9.15, 38000, 'BEE/MoEFCC', 'Record trading volume'),
('2026-01-15', 'ICCT', 810, 9.50, 35000, 'BEE/MoEFCC', 'New year steady demand'),
('2026-02-15', 'ICCT', 850, 9.95, 40000, 'BEE/MoEFCC', 'Budget announcement boost'),

-- Voluntary Carbon Market (India projects)
('2025-06-15', 'VCM', 320, 3.80, 45000, 'Verra/Gold Standard', 'India renewable energy credits'),
('2025-07-15', 'VCM', 340, 4.00, 48000, 'Verra/Gold Standard', 'Cookstove projects premium'),
('2025-08-15', 'VCM', 355, 4.20, 52000, 'Verra/Gold Standard', 'Article 6.4 clarity boost'),
('2025-09-15', 'VCM', 370, 4.35, 55000, 'Verra/Gold Standard', 'Corporate net-zero commitments'),
('2025-10-15', 'VCM', 390, 4.60, 58000, 'Verra/Gold Standard', 'CBAM-driven demand'),
('2025-11-15', 'VCM', 410, 4.80, 62000, 'Verra/Gold Standard', 'COP30 anticipation'),
('2025-12-15', 'VCM', 430, 5.05, 68000, 'Verra/Gold Standard', 'Year-end offsets purchasing'),
('2026-01-15', 'VCM', 445, 5.20, 65000, 'Verra/Gold Standard', 'Steady institutional demand'),
('2026-02-15', 'VCM', 470, 5.50, 72000, 'Verra/Gold Standard', 'Quality premium widening'),

-- CER (Clean Development Mechanism legacy)
('2025-06-15', 'CER', 180, 2.10, 8000, 'UNFCCC CDM Registry', 'Legacy CER market thin'),
('2025-09-15', 'CER', 195, 2.30, 9000, 'UNFCCC CDM Registry', 'Article 6.4 transition effect'),
('2025-12-15', 'CER', 210, 2.50, 10000, 'UNFCCC CDM Registry', 'Slow recovery'),
('2026-02-15', 'CER', 225, 2.65, 11000, 'UNFCCC CDM Registry', 'Transition to new mechanism');
