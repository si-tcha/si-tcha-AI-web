import { ArrowRight } from "lucide-react";

export default function InvestorsSection() {
  return (
    <section id="investors" className="py-24 px-6" style={{ background: "var(--section-background)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">For investors & strategic partners</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-6">Back the connection between a planned harvest and a ready market.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Si-Tcha is building agricultural coordination infrastructure for markets where unreliable connectivity, fragmented supply, and informal farmer organization leave value unrealized. The model connects three needs: demand before planting, actionable agronomic data, and access through basic phones.</p>
            <p className="text-muted-foreground leading-relaxed mb-8">The five-GIC pilot is our starting point. Our ambition is to expand across Central Africa by strengthening buyer relationships, rural SMS delivery, and the formalization of farming groups.</p>
            <a href="/en/investors/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold">Explore the investment opportunity <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="space-y-4">
            {[
              { title: "A focused entry point", body: "A functioning pilot with five selected GICs in Cameroon’s Highlands, focused on potatoes and market garden produce." },
              { title: "A model designed for rural access", body: "Satellite and predictive intelligence paired with SMS delivery, so reaching farmers does not depend on smartphone adoption." },
              { title: "Clear expansion priorities", body: "Build direct telecom partnerships, accelerate GIC registration pathways, and engage international B2B buyers." },
              { title: "Impact to measure as we grow", body: "Our measurement priorities are buyer commitments, farmer net margins, post-harvest losses, and access to advice. Pilot learning will guide how we refine and expand the model." },
            ].map(({ title, body }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

