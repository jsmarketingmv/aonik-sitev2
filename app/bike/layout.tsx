import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cicloturismo em Portugal",
  description: "Pedais autoguiados pela Costa Atlântica, Vale do Douro e interior histórico de Portugal. Bike touring com toda a logística resolvida.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
