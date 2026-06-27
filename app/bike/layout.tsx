import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cicloturismo em Portugal",
  description: "Pedais autoguiados pela Costa Atlântica, Vale do Douro e interior histórico de Portugal. Bike touring com toda a logística resolvida.",
  openGraph: {
    title: "Cicloturismo em Portugal | AONIK",
    description: "Pedais autoguiados pela Costa Atlântica, Vale do Douro e interior histórico de Portugal. Bike touring com toda a logística resolvida.",
    url: "https://www.aonik.com.br/bike",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "Cicloturismo em Portugal — AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
