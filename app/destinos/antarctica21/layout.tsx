import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Antarctica21 · Expedições à Antártica",
  description: "Expedições à Antártica com Antarctica21, o especialista em cruzeiros ao continente gelado a partir de Punta Arenas.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
