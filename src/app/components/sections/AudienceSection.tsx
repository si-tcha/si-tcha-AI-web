import { Users, ShoppingBasket, Leaf } from "lucide-react";

export default function AudienceSection() {
  return (
    <section className="cowrie-surface py-24 px-6 bg-background" aria-labelledby="audience-title">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">One connected agricultural ecosystem</span>
        <h2 id="audience-title" className="text-3xl lg:text-4xl font-bold mt-2 mb-10">Better coordination. Shared opportunity.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, role: "For farmers & GICs", title: "Grow with a clearer route to market.", body: "Bring your group’s production plans closer to real buyer needs. Receive practical advice by SMS and get support to formalize your cooperative—so you can approach markets and funding programs on stronger terms.", cta: "Connect your farming group" },
            { icon: ShoppingBasket, role: "For buyers & wholesalers", title: "Plan supply before the harvest.", body: "Engage organized farming groups earlier. Align crop needs, expected volumes, and timing before planting, with the aim of building more predictable sourcing relationships.", cta: "Discuss your sourcing needs" },
            { icon: Leaf, role: "For agronomists", title: "Bring expertise closer to the field.", body: "Combine your local knowledge with satellite and predictive insights to guide crop monitoring and timely advice. Help turn complex data into decisions farmers can act on.", cta: "Explore agronomic collaboration" },
          ].map(({ icon: Icon, role, title, body, cta }, index) => (
            <article key={role} className="border border-border rounded-2xl p-7 bg-card flex flex-col">
              <Icon className="w-6 h-6 text-primary mb-5" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{role}</p>
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{body}</p>
              <a href={["/en/farmers-groups/", "/en/buyers/", "/en/agronomists/"][index]} className="text-sm font-semibold text-primary">{cta} →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

