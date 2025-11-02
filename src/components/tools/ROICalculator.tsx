import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { trackConversion } from '@/utils/analytics';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    currentRevenue: '',
    inefficiencyPercent: '15',
    projectDuration: '12',
  });
  
  const [results, setResults] = useState<{
    potentialSavings: number;
    revenueIncrease: number;
    roi: number;
    paybackMonths: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResults(null); // Reset results when inputs change
  };

  const calculateROI = () => {
    const revenue = parseFloat(inputs.currentRevenue) || 0;
    const inefficiency = parseFloat(inputs.inefficiencyPercent) || 0;
    const duration = parseFloat(inputs.projectDuration) || 12;

    // Calculate potential savings (inefficiency reduction)
    const potentialSavings = revenue * (inefficiency / 100);
    
    // Calculate revenue increase (conservative 5-15% improvement)
    const revenueIncrease = revenue * 0.08;
    
    // Total annual benefit
    const totalBenefit = potentialSavings + revenueIncrease;
    
    // Assumed investment (based on typical advisory engagement)
    const investment = 50000; // Base advisory fee
    
    // Calculate ROI
    const roi = ((totalBenefit - investment) / investment) * 100;
    
    // Payback period
    const monthlyBenefit = totalBenefit / 12;
    const paybackMonths = investment / monthlyBenefit;

    const calculatedResults = {
      potentialSavings,
      revenueIncrease,
      roi,
      paybackMonths,
    };

    setResults(calculatedResults);

    // Track calculator usage
    trackConversion.calculatorUsed('roi_calculator', {
      revenue: revenue,
      estimated_roi: Math.round(roi),
      estimated_savings: Math.round(potentialSavings),
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="h-4 w-4" />
            Interactive Tool
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how strategic advisory can impact your bottom line in under 2 minutes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-8 glass-card">
            <h3 className="text-2xl font-bold mb-6">Your Business Metrics</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="revenue" className="text-base font-semibold mb-2 block">
                  Annual Revenue (USD)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="5000000"
                    value={inputs.currentRevenue}
                    onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
                    className="pl-10 text-lg h-12"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Your current annual revenue
                </p>
              </div>

              <div>
                <Label htmlFor="inefficiency" className="text-base font-semibold mb-2 block">
                  Operational Inefficiency (%)
                </Label>
                <Input
                  id="inefficiency"
                  type="number"
                  min="0"
                  max="50"
                  value={inputs.inefficiencyPercent}
                  onChange={(e) => handleInputChange('inefficiencyPercent', e.target.value)}
                  className="text-lg h-12"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Estimated % of revenue lost to inefficiencies (typical: 10-20%)
                </p>
              </div>

              <div>
                <Label htmlFor="duration" className="text-base font-semibold mb-2 block">
                  Project Duration (months)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="3"
                  max="24"
                  value={inputs.projectDuration}
                  onChange={(e) => handleInputChange('projectDuration', e.target.value)}
                  className="text-lg h-12"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Length of advisory engagement
                </p>
              </div>

              <Button
                onClick={calculateROI}
                size="lg"
                className="w-full mt-4"
                disabled={!inputs.currentRevenue}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate ROI
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-8 glass-card bg-gradient-to-br from-primary/10 to-background">
            <h3 className="text-2xl font-bold mb-6">Your Potential Results</h3>
            
            {!results ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Calculator className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Enter your metrics and click Calculate</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-background/80 rounded-lg border-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold text-muted-foreground">ROI</span>
                  </div>
                  <p className="text-4xl font-bold text-primary">
                    {results.roi.toFixed(0)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Return on investment
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/80 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-xs font-semibold text-muted-foreground">Potential Savings</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(results.potentialSavings)}
                    </p>
                  </div>

                  <div className="p-4 bg-background/80 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="text-xs font-semibold text-muted-foreground">Revenue Growth</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(results.revenueIncrease)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-background/80 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-amber-600" />
                    <span className="text-xs font-semibold text-muted-foreground">Payback Period</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {results.paybackMonths.toFixed(1)} months
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    These are conservative estimates. Actual results typically exceed projections.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Discuss Your Custom Strategy
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
