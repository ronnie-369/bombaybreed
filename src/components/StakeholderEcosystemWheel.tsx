import React, { useState } from 'react';
import { Users, Building2, DollarSign, Settings, MessageSquare, Lightbulb, TrendingUp, Shield, Scale, ShoppingCart, Truck, Heart } from 'lucide-react';

const StakeholderEcosystemWheel = () => {
  const [hoveredStakeholder, setHoveredStakeholder] = useState<string | null>(null);

  const stakeholders = [
    { id: 'executive', name: 'Executive Leadership', icon: Users, color: 'from-primary to-primary/80' },
    { id: 'cfo', name: 'CFO/Finance Teams', icon: DollarSign, color: 'from-green-500 to-green-400' },
    { id: 'coo', name: 'COO/Operations', icon: Settings, color: 'from-blue-500 to-blue-400' },
    { id: 'cso', name: 'CSO/Sustainability', icon: Heart, color: 'from-emerald-500 to-emerald-400' },
    { id: 'communications', name: 'Corporate Communications', icon: MessageSquare, color: 'from-purple-500 to-purple-400' },
    { id: 'product', name: 'Product Development', icon: Lightbulb, color: 'from-orange-500 to-orange-400' },
    { id: 'investors', name: 'Investors & Analysts', icon: TrendingUp, color: 'from-indigo-500 to-indigo-400' },
    { id: 'board', name: 'Board of Directors', icon: Shield, color: 'from-red-500 to-red-400' },
    { id: 'regulators', name: 'Regulators & Policy Makers', icon: Scale, color: 'from-gray-600 to-gray-500' },
    { id: 'customers', name: 'Customers', icon: ShoppingCart, color: 'from-pink-500 to-pink-400' },
    { id: 'suppliers', name: 'Suppliers & Partners', icon: Truck, color: 'from-yellow-500 to-yellow-400' },
    { id: 'community', name: 'Community & NGOs', icon: Users, color: 'from-teal-500 to-teal-400' },
  ];

  const radius = 180;
  const centerX = 200;
  const centerY = 200;

  const getStakeholderPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle: (angle * 180) / Math.PI };
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stakeholder Ecosystem</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Effective communication with diverse stakeholder groups requires tailored strategies and messaging.
          </p>

          <div className="relative inline-block">
            <svg 
              width="400" 
              height="400" 
              viewBox="0 0 400 400" 
              className="max-w-full h-auto"
            >
              {/* Center Circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r="60"
                className="fill-primary/10 stroke-primary stroke-2"
              />
              <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                className="fill-primary font-semibold text-sm"
              >
                Strategic
              </text>
              <text
                x={centerX}
                y={centerY + 8}
                textAnchor="middle"
                className="fill-primary font-semibold text-sm"
              >
                Communications
              </text>

              {/* Connection Lines */}
              {stakeholders.map((stakeholder, index) => {
                const pos = getStakeholderPosition(index, stakeholders.length);
                return (
                  <line
                    key={`line-${stakeholder.id}`}
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    className={`stroke-2 transition-all duration-300 ${
                      hoveredStakeholder === stakeholder.id 
                        ? 'stroke-primary opacity-100' 
                        : 'stroke-muted-foreground/20'
                    }`}
                  />
                );
              })}

              {/* Stakeholder Circles */}
              {stakeholders.map((stakeholder, index) => {
                const pos = getStakeholderPosition(index, stakeholders.length);
                const IconComponent = stakeholder.icon;
                const isHovered = hoveredStakeholder === stakeholder.id;

                return (
                  <g key={stakeholder.id}>
                    {/* Outer glow circle for hover effect */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHovered ? "35" : "30"}
                      className={`transition-all duration-300 ${
                        isHovered 
                          ? 'fill-primary/20 stroke-primary stroke-2' 
                          : 'fill-background stroke-muted-foreground/30 stroke-1'
                      }`}
                    />
                    
                    {/* Inner circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="25"
                      className={`cursor-pointer transition-all duration-300 ${
                        isHovered 
                          ? 'fill-primary' 
                          : 'fill-background hover:fill-muted'
                      }`}
                      onMouseEnter={() => setHoveredStakeholder(stakeholder.id)}
                      onMouseLeave={() => setHoveredStakeholder(null)}
                    />

                    {/* Icon placeholder - we'll use a small circle for now since SVG icons are complex */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      className={`pointer-events-none transition-all duration-300 ${
                        isHovered 
                          ? 'fill-white' 
                          : 'fill-primary'
                      }`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels positioned around the wheel */}
            <div className="absolute inset-0">
              {stakeholders.map((stakeholder, index) => {
                const pos = getStakeholderPosition(index, stakeholders.length);
                const isHovered = hoveredStakeholder === stakeholder.id;
                
                // Calculate label position (further out from the circle)
                const labelRadius = radius + 40;
                const angle = (index * 2 * Math.PI) / stakeholders.length - Math.PI / 2;
                const labelX = centerX + labelRadius * Math.cos(angle);
                const labelY = centerY + labelRadius * Math.sin(angle);
                
                return (
                  <div
                    key={`label-${stakeholder.id}`}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isHovered ? 'scale-110 font-semibold text-primary' : 'text-foreground/80'
                    }`}
                    style={{
                      left: `${(labelX / 400) * 100}%`,
                      top: `${(labelY / 400) * 100}%`,
                    }}
                    onMouseEnter={() => setHoveredStakeholder(stakeholder.id)}
                    onMouseLeave={() => setHoveredStakeholder(null)}
                  >
                    <span className="text-xs md:text-sm font-medium text-center whitespace-nowrap cursor-pointer">
                      {stakeholder.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected stakeholder details */}
          {hoveredStakeholder && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border animate-fade-in">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className={`p-2 rounded-full bg-gradient-to-r ${
                  stakeholders.find(s => s.id === hoveredStakeholder)?.color
                }`}>
                  {React.createElement(
                    stakeholders.find(s => s.id === hoveredStakeholder)?.icon || Users,
                    { className: "h-5 w-5 text-white" }
                  )}
                </div>
                <h3 className="text-xl font-semibold">
                  {stakeholders.find(s => s.id === hoveredStakeholder)?.name}
                </h3>
              </div>
              <p className="text-muted-foreground">
                Strategic communication approach tailored for this stakeholder group's unique needs and priorities.
              </p>
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