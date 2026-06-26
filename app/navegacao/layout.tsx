import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Navegação · Cruzeiros na Patagônia",
  description: "Cruzeiros na Patagônia Chilena e Antártica. Experiências de navegação em territórios selvagens e geleiras.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
