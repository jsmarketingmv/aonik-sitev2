import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Skorpios Chonos · Arquipélago dos Chonos",
  description: "Expedição náutica pelo Arquipélago dos Chonos, ecossistema marinho intocado no coração da Patagônia Chilena.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
