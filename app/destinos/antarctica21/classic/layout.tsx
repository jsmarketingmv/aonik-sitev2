import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Antártica Classic · Antarctica21",
  description: "10 dias de expedição ao continente antártico com Antarctica21. A experiência mais completa de imersão no gelo.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
