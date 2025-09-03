import React, { useState, useEffect, useRef } from 'react';
import { Users, Building2, DollarSign, Settings, MessageSquare, Lightbulb, TrendingUp, Shield, Scale, ShoppingCart, Truck, Heart } from 'lucide-react';

const StakeholderEcosystemWheel = () => {
  const [hoveredStakeholder, setHoveredStakeholder] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  const stakeholders = [
    { 
      id: 'executive', 
      name: 'Executive Leadership', 
      icon: Users, 
      color: 'hsl(var(--primary))',
      challenge: 'Articulating climate vision that drives results without seeming reactive',
      advisory: 'Strategic climate narrative development and leadership positioning',
      description: 'We help CEOs and leadership teams articulate a compelling climate vision that drives organizational alignment, attracts top talent, and positions the company as an industry leader in sustainability transformation.'
    },
    { 
      id: 'cfo', 
      name: 'CFO/Finance Teams', 
      icon: DollarSign, 
      color: 'hsl(142 76% 36%)',
      challenge: 'Demonstrating climate investment ROI amid short-term cost pressures',
      advisory: 'Financial storytelling for climate investments and risk mitigation',
      description: 'We translate climate initiatives into financial narratives that demonstrate ROI, risk mitigation, and long-term value creation, helping CFOs communicate the business case for sustainability investments to stakeholders.'
    },
    { 
      id: 'coo', 
      name: 'COO/Operations', 
      icon: Settings, 
      color: 'hsl(221 83% 53%)',
      challenge: 'Balancing operational efficiency with ambitious climate targets',
      advisory: 'Operational excellence messaging that showcases climate innovation',
      description: 'We develop messaging strategies that showcase operational efficiency gains, supply chain resilience, and process innovations, helping COOs communicate how climate initiatives drive operational excellence and competitive advantage.'
    },
    { 
      id: 'cso', 
      name: 'CSO/Sustainability', 
      icon: Heart, 
      color: 'hsl(160 84% 39%)',
      challenge: 'Translating complex climate data into compelling business cases',
      advisory: 'Data-driven sustainability narrative and stakeholder engagement',
      description: 'We help sustainability leaders translate complex climate data into compelling narratives that secure internal buy-in, demonstrate impact to external stakeholders, and position sustainability as a core business strategy.'
    },
    { 
      id: 'communications', 
      name: 'Corporate Communications', 
      icon: MessageSquare, 
      color: 'hsl(262 83% 58%)',
      challenge: 'Avoiding greenwashing while communicating climate progress authentically',
      advisory: 'Science-based messaging and authentic climate communication',
      description: 'We partner with communications teams to develop authentic, science-based messaging that avoids greenwashing risks, builds stakeholder trust, and effectively communicates climate progress and commitments across all channels.'
    },
    { 
      id: 'product', 
      name: 'Product Development', 
      icon: Lightbulb, 
      color: 'hsl(25 95% 53%)',
      challenge: 'Communicating sustainability features as compelling value propositions',
      advisory: 'Product innovation messaging and market differentiation strategies',
      description: 'We help product teams communicate how climate considerations drive innovation, create customer value, and differentiate products in the market, turning sustainability features into compelling value propositions.'
    },
    { 
      id: 'investors', 
      name: 'Investors & Analysts', 
      icon: TrendingUp, 
      color: 'hsl(239 84% 67%)',
      challenge: 'Proving climate resilience translates to long-term financial performance',
      advisory: 'Investment-grade climate resilience and ESG positioning',
      description: 'We craft investor communications that demonstrate climate resilience, future-readiness, and long-term value creation, helping companies attract ESG-focused investors and improve access to green capital.'
    },
    { 
      id: 'board', 
      name: 'Board of Directors', 
      icon: Shield, 
      color: 'hsl(0 84% 60%)',
      challenge: 'Understanding climate risks and opportunities for governance oversight',
      advisory: 'Board-ready climate risk assessment and strategic guidance',
      description: 'We prepare board-ready materials that clearly articulate climate risks, opportunities, and strategic responses, enabling directors to make informed decisions and fulfill their governance responsibilities on climate matters.'
    },
    { 
      id: 'regulators', 
      name: 'Regulators & Policy Makers', 
      icon: Scale, 
      color: 'hsl(215 25% 27%)',
      challenge: 'Meeting evolving compliance requirements while maintaining competitiveness',
      advisory: 'Regulatory engagement and compliance communication strategies',
      description: 'We help organizations engage constructively with regulators by communicating climate commitments, progress, and compliance efforts in ways that build regulatory trust and influence policy development.'
    },
    { 
      id: 'customers', 
      name: 'Customers', 
      icon: ShoppingCart, 
      color: 'hsl(330 81% 60%)',
      challenge: 'Meeting rising sustainability expectations without premium pricing barriers',
      advisory: 'Customer-facing sustainability messaging and value communication',
      description: 'We develop customer-facing climate narratives that build brand loyalty, justify premium pricing, and meet growing consumer demand for sustainable products and transparent environmental practices.'
    },
    { 
      id: 'suppliers', 
      name: 'Suppliers & Partners', 
      icon: Truck, 
      color: 'hsl(45 93% 47%)',
      challenge: 'Engaging supply chain partners on climate without disrupting relationships',
      advisory: 'Supply chain engagement and collaborative sustainability messaging',
      description: 'We facilitate clear communication of climate expectations, support supplier engagement on sustainability initiatives, and help build collaborative partnerships that strengthen the entire value chain\'s climate performance.'
    },
    { 
      id: 'community', 
      name: 'Community & NGOs', 
      icon: Users, 
      color: 'hsl(173 80% 40%)',
      challenge: 'Building authentic community trust around climate impact and benefits',
      advisory: 'Community engagement and stakeholder relationship building',
      description: 'We help organizations engage authentically with local communities and NGOs, building trust through transparent communication about climate impacts, community benefits, and collaborative environmental stewardship.'
    },
  ];

  // Responsive sizing based on container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const size = Math.min(containerWidth, 500);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const radius = dimensions.width * 0.32;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const labelRadius = radius + 60;

  const getStakeholderPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle };
  };

  const getColumnLayout = () => {
    const leftColumn: Array<{ stakeholder: typeof stakeholders[0], index: number, pos: ReturnType<typeof getStakeholderPosition> }> = [];
    const rightColumn: Array<{ stakeholder: typeof stakeholders[0], index: number, pos: ReturnType<typeof getStakeholderPosition> }> = [];

    stakeholders.forEach((stakeholder, index) => {
      const pos = getStakeholderPosition(index, stakeholders.length);
      // Use cos(angle) >= 0 for proper left/right split
      if (Math.cos(pos.angle) >= 0) {
        rightColumn.push({ stakeholder, index, pos });
      } else {
        leftColumn.push({ stakeholder, index, pos });
      }
    });

    // Sort by vertical position
    leftColumn.sort((a, b) => a.pos.y - b.pos.y);
    rightColumn.sort((a, b) => a.pos.y - b.pos.y);

    return { leftColumn, rightColumn };
  };

  const getColumnLabelPositions = () => {
    const { leftColumn, rightColumn } = getColumnLayout();
    const padding = 60;
    const availableHeight = dimensions.height - 2 * padding;
    
    const leftLabels = leftColumn.map((item, index) => ({
      ...item,
      labelX: 24,
      labelY: padding + (availableHeight / Math.max(leftColumn.length - 1, 1)) * index
    }));
    
    const rightLabels = rightColumn.map((item, index) => ({
      ...item,
      labelX: dimensions.width - 24,
      labelY: padding + (availableHeight / Math.max(rightColumn.length - 1, 1)) * index
    }));
    
    return { leftLabels, rightLabels };
  };

  const { leftLabels, rightLabels } = getColumnLabelPositions();

  const renderLeaderLine = (nodePos: { x: number, y: number }, labelPos: { x: number, y: number }, isHovered: boolean) => {
    const midX = (nodePos.x + labelPos.x) / 2;
    const midY = (nodePos.y + labelPos.y) / 2;
    
    return (
      <path
        d={`M ${nodePos.x},${nodePos.y} Q ${midX},${midY} ${labelPos.x},${labelPos.y}`}
        className={`stroke-2 transition-all duration-300 fill-none ${
          isHovered ? 'stroke-primary opacity-100' : 'stroke-muted-foreground/30'
        }`}
        strokeLinecap="round"
      />
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stakeholder Ecosystem</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Effective communication with diverse stakeholder groups requires tailored strategies and messaging.
          </p>

          <div ref={containerRef} className="relative w-full flex justify-center">
            <div className="relative">
              <svg 
                width={dimensions.width} 
                height={dimensions.height} 
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} 
                className="max-w-full h-auto"
              >
                {/* Orbit ring */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  className="fill-none stroke-muted-foreground/20 stroke-1"
                />

                {/* Center Circle */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="58"
                  className="fill-primary/10 stroke-primary stroke-2"
                />
                <text
                  x={centerX}
                  y={centerY - 16}
                  textAnchor="middle"
                  className="fill-primary font-semibold text-xs"
                >
                  Strategic
                </text>
                <text
                  x={centerX}
                  y={centerY}
                  textAnchor="middle"
                  className="fill-primary font-semibold text-xs"
                >
                  Communications
                </text>
                <text
                  x={centerX}
                  y={centerY + 16}
                  textAnchor="middle"
                  className="fill-primary font-semibold text-xs"
                >
                  Advisory
                </text>

                {/* Leader lines to labels */}
                {[...leftLabels, ...rightLabels].map(({ stakeholder, pos, labelX, labelY }) => {
                  if (hoveredStakeholder !== stakeholder.id) return null;
                  return (
                    <g key={`line-${stakeholder.id}`} className="animate-fade-in">
                      {renderLeaderLine(
                        { x: pos.x, y: pos.y },
                        { x: labelX, y: labelY },
                        true
                      )}
                    </g>
                  );
                })}

                {/* Stakeholder Circles */}
                {stakeholders.map((stakeholder, index) => {
                  const pos = getStakeholderPosition(index, stakeholders.length);
                  const IconComponent = stakeholder.icon;
                  const isHovered = hoveredStakeholder === stakeholder.id;

                  return (
                    <g key={stakeholder.id}>
                      {/* Hover ring */}
                      {isHovered && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="35"
                          className="fill-none stroke-primary stroke-2 animate-scale-in"
                        />
                      )}
                      
                      {/* Main circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="28"
                        className={`cursor-pointer transition-all duration-300 ${
                          isHovered 
                            ? 'fill-primary' 
                            : 'fill-background hover:fill-muted stroke-muted-foreground/20 stroke-1'
                        }`}
                        style={{ fill: isHovered ? stakeholder.color : undefined }}
                        tabIndex={0}
                        role="button"
                        aria-label={stakeholder.name}
                        onMouseEnter={() => setHoveredStakeholder(stakeholder.id)}
                        onMouseLeave={() => setHoveredStakeholder(null)}
                        onFocus={() => setHoveredStakeholder(stakeholder.id)}
                        onBlur={() => setHoveredStakeholder(null)}
                        onClick={() => setHoveredStakeholder(stakeholder.id)}
                        onKeyDown={(e) => {
                          if (e.code === 'Enter' || e.code === 'Space') {
                            setHoveredStakeholder(stakeholder.id);
                          }
                        }}
                      />

                      {/* Icon */}
                      <foreignObject
                        x={pos.x - 10}
                        y={pos.y - 10}
                        width="20"
                        height="20"
                        className="pointer-events-none"
                      >
                        <IconComponent 
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isHovered ? 'text-white' : 'text-primary'
                          }`}
                        />
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>

              {/* Absolutely positioned labels */}
              {leftLabels.map(({ stakeholder, labelX, labelY }) => {
                const isHovered = hoveredStakeholder === stakeholder.id;
                if (!isHovered) return null;
                return (
                   <div
                    key={`left-${stakeholder.id}`}
                    className="absolute transition-all duration-300 cursor-pointer scale-105 animate-fade-in"
                    style={{
                      left: `${labelX}px`,
                      top: `${labelY}px`,
                      transform: 'translate(-100%, -50%)'
                    }}
                    tabIndex={0}
                    role="button"
                    onMouseEnter={() => setHoveredStakeholder(stakeholder.id)}
                    onMouseLeave={() => setHoveredStakeholder(null)}
                    onFocus={() => setHoveredStakeholder(stakeholder.id)}
                    onBlur={() => setHoveredStakeholder(null)}
                    onKeyDown={(e) => {
                      if (e.code === 'Enter' || e.code === 'Space') {
                        setHoveredStakeholder(stakeholder.id);
                      }
                    }}
                  >
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`inline-block px-3 py-2 rounded-full bg-white shadow-sm border text-sm font-medium transition-all duration-300 ${
                        isHovered ? 'text-primary border-primary/20 shadow-md' : 'text-foreground/80 border-muted'
                      }`}>
                        {stakeholder.name}
                      </span>
                      <div className="px-2 py-1 bg-muted/90 rounded text-xs text-muted-foreground max-w-xs text-right">
                        {stakeholder.challenge}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {rightLabels.map(({ stakeholder, labelX, labelY }) => {
                const isHovered = hoveredStakeholder === stakeholder.id;
                if (!isHovered) return null;
                return (
                  <div
                    key={`right-${stakeholder.id}`}
                    className="absolute transition-all duration-300 cursor-pointer scale-105 animate-fade-in"
                    style={{
                      left: `${labelX}px`,
                      top: `${labelY}px`,
                      transform: 'translate(0%, -50%)'
                    }}
                    tabIndex={0}
                    role="button"
                    onMouseEnter={() => setHoveredStakeholder(stakeholder.id)}
                    onMouseLeave={() => setHoveredStakeholder(null)}
                    onFocus={() => setHoveredStakeholder(stakeholder.id)}
                    onBlur={() => setHoveredStakeholder(null)}
                    onKeyDown={(e) => {
                      if (e.code === 'Enter' || e.code === 'Space') {
                        setHoveredStakeholder(stakeholder.id);
                      }
                    }}
                  >
                    <div className="flex flex-col items-start space-y-1">
                      <span className={`inline-block px-3 py-2 rounded-full bg-white shadow-sm border text-sm font-medium transition-all duration-300 ${
                        isHovered ? 'text-primary border-primary/20 shadow-md' : 'text-foreground/80 border-muted'
                      }`}>
                        {stakeholder.name}
                      </span>
                      <div className="px-2 py-1 bg-muted/90 rounded text-xs text-muted-foreground max-w-xs">
                        {stakeholder.challenge}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected stakeholder details */}
          {hoveredStakeholder && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border animate-fade-in">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className={`p-2 rounded-full`} style={{ backgroundColor: stakeholders.find(s => s.id === hoveredStakeholder)?.color }}>
                  {React.createElement(
                    stakeholders.find(s => s.id === hoveredStakeholder)?.icon || Users,
                    { className: "h-5 w-5 text-white" }
                  )}
                </div>
                <h3 className="text-xl font-semibold">
                  {stakeholders.find(s => s.id === hoveredStakeholder)?.name}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">Key Challenge:</h4>
                  <p className="text-sm text-muted-foreground">
                    {stakeholders.find(s => s.id === hoveredStakeholder)?.challenge}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">Our Advisory Focus:</h4>
                  <p className="text-sm text-muted-foreground">
                    {stakeholders.find(s => s.id === hoveredStakeholder)?.advisory}
                  </p>
                </div>
                
                <div className="pt-2 border-t border-muted/50">
                  <p className="text-sm text-muted-foreground">
                    {stakeholders.find(s => s.id === hoveredStakeholder)?.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-sm text-muted-foreground">
            <p>Hover over each stakeholder group to learn about tailored communication strategies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StakeholderEcosystemWheel;