import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Full cards on desktop, native keyboard-accessible accordions on mobile. */
export default function ResponsiveCard({ header, children, group, className = "" }: {
  header: ReactNode; children: ReactNode; group: string; className?: string;
}) {
  const [desktop, setDesktop] = useState(true);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <details {...(desktop ? {} : { name: group })} open={desktop || expanded}
      onToggle={event => { if (!desktop) setExpanded(event.currentTarget.open); }}
      className={`responsive-card ${className}`}>
      <summary tabIndex={desktop ? -1 : 0}><div className="min-w-0 flex-1">{header}</div><ChevronDown aria-hidden="true" className="accordion-chevron w-4 h-4 shrink-0 text-primary" /></summary>
      <div className="responsive-card-content">{children}</div>
    </details>
  );
}
