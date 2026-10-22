import { ArrowRight, Sprout, Users, MapPin } from "lucide-react";

export default function GicDirectorySection() {
  return (
    <section id="gics" className="cowrie-surface py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="cowrie-copy max-w-3xl mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">The pilot in Cameroon</span>
        <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-5">Rooted in real farming communities.</h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed mb-10">
          Si-Tcha AI’s functioning pilot serves five selected Common Initiative Groups (GICs) in Cameroon’s Highlands. The focus is practical: coordinate potato and market garden production, connect growers with demand, and make useful advice accessible beyond the internet.
        </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "5 selected GICs", body: "A focused cooperative pilot to test and refine the model with farming groups." },
            { icon: MapPin, title: "Cameroon’s Highlands", body: "A local starting point for learning how market coordination and rural access work together." },
            { icon: Sprout, title: "Potatoes & market garden produce", body: "An initial focus on crops where production planning and timely market access matter." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6">
              <Icon className="w-6 h-6 text-primary mb-5" />
              <h3 className="font-bold text-lg mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>

            </div>
          ))}
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-8">Discuss pilot participation <ArrowRight className="w-4 h-4" /></a>
      </div>
    </section>
  );
}

