import { Sprout } from "lucide-react";
export function Brand() {
  return (
    <div className="ci-brand">
      <span>
        <Sprout size={21} aria-hidden />
      </span>
      <div>
        cardápio<span className="ci-brand-light">inteligente</span>
      </div>
      <small>30 DIAS</small>
    </div>
  );
}
