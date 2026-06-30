import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { persistFormSubmissionAsync } from '@/lib/formPersistence';
import heroImg from '@/assets/trocadero-paris-heatwave.jpg';
import './europe-india.css';

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';

const WhyEuropeMeltsRead: React.FC = () => {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [subState, setSubState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    try {
      const ok = sessionStorage.getItem('bb_eu_unlocked') === '1';
      setUnlocked(ok);
    } catch {
      setUnlocked(true);
    }
  }, []);

  if (unlocked === null) return null;
  if (!unlocked) return <Navigate to="/series/europe-india/why-europe-melts" replace />;

  const onNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setSubState('error'); return; }
    setSubState('sending');
    const payload = {
      email: email.trim(),
      form_type: 'newsletter',
      source_tag: 'series-subscriber-europe-india',
      _subject: 'New series subscriber: Europe-India',
    };
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      persistFormSubmissionAsync(payload);
      setSubState('done');
    } catch {
      setSubState('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Why Europe Melts at 41°C When the Gulf Works at 50°C | Bombay Breed</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="bb-eu">
        <div className="banner">
          Thank you for downloading. Article 01 of the five-piece Europe-India series. The next piece publishes mid-July 2026.
        </div>
        <div className="col">
          <div className="crumb">Climate Series / 01 of 05</div>
          <h1 className="bb-head">Why Europe melts at 41°C when the Gulf works at 50°C.</h1>
          <p className="dek">A Bombay Breed Climate Brief, investor and policy edition. 1,200 words.</p>
          <div className="meta">
            <span><b>Date</b>30 June 2026</span>
            <span><b>Published by</b>Bombay Breed Consulting</span>
            <span><b>Read</b>6 minutes</span>
          </div>

          <img src={heroImg} alt="Parisians cooling off in the Trocadero Fountain during the June 2026 European heat dome" className="hero-img" width={1536} height={1024} />
          <p className="caption">
            Parisians cooling off in the Trocadero Fountain by the Eiffel Tower, 24 June 2026. France lost over 1,000 people in the heat dome between 21 and 29 June 2026. Photo: REUTERS / Gonzalo Fuentes.
          </p>

          <div className="body">
            <h2 className="bb-sec">I. The Dome</h2>
            <p>Over 1,300 people are dead across Europe in the ten days between 21 and 30 June. France lost 1,000. Spain lost 327. Germany set a new national temperature record at 41.7°C this weekend. Leipzig suspended its entire tram network on 27 June because the rails buckled. SNCF cancelled 71 intercity trains in one day. The Eiffel Tower closed early for four consecutive afternoons.</p>
            <p><strong>Allianz Trade has modelled a cumulative European Union GDP loss of 5 to 7 percent by 2030 from repeated heat events. Fortune puts the total economic exposure above USD 600 billion.</strong> The 62,775 European deaths from the 2024 summer is now the baseline; Nature Communications projects this doubles by mid-century without wartime-pace adaptation. The heat dome itself is breaking down today as Atlantic air pushes in from the west. The structural problem is not.</p>
            <p>The question worth answering for an investor or policymaker is not why this heatwave happened. World Weather Attribution scientists already settled that on 26 June: 100 times more likely than the same heatwave in 2003, virtually impossible in 1976, 3.5°C cooler in that climate. The question is why Europe is dying and its infrastructure failing at temperatures that the Gulf, South Asia and Africa absorb routinely. The answer has nothing to do with the thermometer.</p>

            <h2 className="bb-sec">II. The Asymmetry</h2>
            <p>Europe was built for a 200-year-old problem: keeping winter heat inside. The continent's residential stock is one giant insulation system pointed in the wrong direction. Stone walls, slate roofs, double glazing, sealed lofts. Between 19 and 30 percent of European Union households have air conditioning; in the United Kingdom the figure is below 5 percent. Saudi Arabia is at 95 percent. The American figure is 90 percent.</p>
            <p>This is a building-stock problem and a procurement problem at the same time. The traffic-light housings that sagged in Verona and Berlin are not melting in the chemistry sense; polycarbonate has a melting point of 225°C and nothing in Europe came close. What is failing is the glass transition at 145°C, with surface temperatures of 70 to 90°C on dark housings in direct sun. Gulf and Indian signals are type-tested to plus 74°C ambient and use pale aluminium housings. <strong>Same polymer family, different specification. The European specification was written for a climate that no longer exists.</strong></p>
            <p>The rails are the same story. European continuous welded rail is laid at a neutral temperature of 18 to 30°C. American practice is 32 to 43°C. When the rail rises more than 20°C above its neutral, the constrained steel buckles laterally. At 44°C air, the rail can be at 60°C, which is 30 to 40°C above European neutral. Slovakia has imposed a national 80 km/h cap. Leipzig is destressing its tram network. Every European rail operator is now looking at a multi-decade, continent-scale destressing programme.</p>
            <p>Then there is the demographic load. <strong>21.6 percent of the European Union population is over 65; this rises to 32.5 percent by 2100.</strong> The Nature Medicine analysis of the 2024 summer found mortality in people over 75 running 323 percent higher than all other age groups combined. Italy lost over 19,000 last summer. Italy has the second-oldest population on earth.</p>
            <p>The Gulf bought its way out of the equivalent problem with a fossil-fuel-subsidised cooling grid that consumes 70 percent of household electricity. Saudi Arabia runs at 9,444 kilowatt-hours per capita against a world average of 3,127. That trade-off is climatically self-cancelling but operationally functional. Europe never built that grid, never had that subsidy, and now has the most fragile bodies inside its buildings.</p>

            <h2 className="bb-sec">III. The Decade</h2>
            <p>This becomes a portfolio question across six sectors over the next ten years.</p>
            <p><strong>Rail and transit.</strong> Continental destressing of welded rail to a higher neutral temperature is a multi-billion-euro capex programme that no European operator has yet announced and all of them now require. Watch national operators in France, Germany, Italy, Spain and the Netherlands for procurement notices over the next 18 months. Indian Railways already specifies neutral temperatures in the 35 to 40°C range, which is closer to American practice; the Vande Bharat rollout is on the right side of this curve.</p>
            <p><strong>Insurance.</strong> European property premiums for residential and commercial real estate will reprice. Munich Re and Swiss Re will lead. The under-discussed exposure is European life and health insurance, which has not yet priced in compound day-night heatwaves in an ageing population. Indian insurers should not import the European reserving assumptions wholesale.</p>
            <p><strong>Real estate retrofit.</strong> The capital required to retrofit European residential stock for active cooling is in the trillions of euros. This creates a multi-decade tailwind for heat-pump manufacturers, HVAC contractors, insulation reformulators and external shading installers. The contrarian play is whether the European Union will mandate this through revisions to the Energy Performance of Buildings Directive; that decision is on the regulatory clock for 2027.</p>
            <p><strong>Healthcare capacity.</strong> Heat-resilient elderly care, ICU surge capacity, and emergency medical service scaling are now permanent line items in European national budgets. Italy, Spain, Greece and France will lead. India should watch the procurement playbook closely as it ages out of its demographic dividend.</p>
            <p><strong>Agriculture.</strong> Soil moisture is at seasonal lows across France and Spain; French wheat and Spanish vegetable yields are exposed. The European Common Agricultural Policy revision in 2028 will need to incorporate heat resilience or lose political support. Indian agri-tech exporters should track this as a market signal.</p>
            <p><strong>Energy.</strong> French nuclear output dropped roughly 7 percent of national demand last week because the Rhône and Garonne ran too warm for cooling. Hydro generation is constrained across the south. The European Union electricity grid is moving from a winter-peaking system to a dual-peak system within a decade. Storage and demand-response infrastructure follows.</p>

            <h2 className="bb-sec">What this means for India</h2>
            <p>India is structurally better positioned than Europe to absorb extreme heat, for three reasons that are easy to lose. The population is younger by sixteen years. Vernacular architecture in much of the country still rejects heat rather than retains it. Acclimatisation is real and measurable in Indian bodies in a way that European bodies have lost.</p>
            <p>The risk is that India imports European mistakes without inheriting European balance sheets. The cement-and-glass tower replacing the courtyard house, the sealed apartment block replacing the cross-ventilated bungalow, the dark asphalt replacing the shaded narrow lane. <strong>Every Tier-1 Indian city is currently rebuilding itself to a specification that Europe is about to spend a trillion euros undoing.</strong></p>
            <p>The investable thesis for India is not adaptation capital coming in. It is preventing maladaptation capital from being deployed in the first place. The single most useful piece of climate policy India could pass in the next decade is a residential building code that makes active cooling demand a design-stage liability rather than a retrofit-stage afterthought.</p>
            <p>The European decade is going to be a retrofit decade, a demographic decade, and a public-health-infrastructure decade. India can choose not to enter that decade in the same condition. That choice is being made right now, in every building permit issued in Bombay, Bengaluru, Hyderabad and Pune. The window to make it well is shorter than the lead time on the buildings themselves.</p>

            <p className="source">
              Bombay Breed advises on climate transition strategy in India. Sourced from World Weather Attribution, The Lancet Public Health, Nature Medicine, Nature Communications, the International Energy Agency, the World Health Organization and the Penn State Heat Project. Full source ledger on request.
            </p>
          </div>

          <div className="next-card">
            <div className="nc-head">Next in the series</div>
            <h3 className="nc-title">The Concrete Trap: India is rebuilding Bombay in the wrong material.</h3>
            <p className="nc-sub">Why Indian Tier-1 cities are replacing vernacular thick-wall, cross-ventilated housing with European-style sealed-envelope construction, and what that locks in. Publishes mid-July 2026.</p>
            {subState === 'done' ? (
              <p className="nc-confirm">Thank you. I will write to you when The Concrete Trap publishes.</p>
            ) : (
              <form className="nc-form" onSubmit={onNotify} noValidate>
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={subState === 'sending'}>
                  {subState === 'sending' ? 'Sending…' : 'Notify me when it publishes'}
                </button>
                {subState === 'error' && (
                  <p style={{ width: '100%', color: '#ffd9b3', fontSize: 13, margin: '6px 0 0' }}>
                    Please enter a valid email and try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyEuropeMeltsRead;
