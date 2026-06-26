import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Antártica Express · Antarctica21",
  description: "A expedição mais ágil à Antártica — 6 dias a partir de Punta Arenas com Antarctica21.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
