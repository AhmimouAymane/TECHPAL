import { ViewTransition } from "react";

/**
 * Remonte à chaque navigation (clé unique) et pilote les transitions de page
 * directionnelles via l'API View Transitions (React 19.3).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
