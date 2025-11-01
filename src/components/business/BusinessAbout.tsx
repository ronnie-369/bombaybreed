import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BusinessAbout = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="section-title bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Leadership & Experience
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Led by <strong>Theresa Ronnie</strong>, Bombay Breed Consulting brings together deep expertise in 
                strategic communications, business transformation, and executive leadership.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">C-Suite Advisory Excellence</h3>
                  <p className="text-foreground/70">
                    With 11 years of C-suite management experience, Theresa has partnered with CEOs and executive teams 
                    to navigate complex business challenges, identify growth opportunities, and drive organizational transformation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">Integrated Strategic Communications</h3>
                  <p className="text-foreground/70">
                    18 years of experience in strategic communications spanning advertising agency leadership, 
                    in-house creative operations, and performance marketing optimization.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">Enterprise Leadership</h3>
                  <p className="text-foreground/70">
                    Senior leadership roles at <strong>Microsoft India</strong> and <strong>KPMG</strong> provided 
                    invaluable experience in large-scale organizational strategy, change management, and cross-functional collaboration.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">Advertising & Creative Excellence</h3>
                  <p className="text-foreground/70">
                    Led creative departments and advertising agencies, building high-performing teams and delivering 
                    award-winning campaigns for global brands across diverse industries.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-foreground/80 italic">
                  "Strategic growth requires both creative vision and operational discipline. 
                  Our approach brings these elements together to create sustainable competitive advantage."
                </p>
                <p className="text-foreground/60 mt-2">— Theresa Ronnie, Founder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BusinessAbout;
