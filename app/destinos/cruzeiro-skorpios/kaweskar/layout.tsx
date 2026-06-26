import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Skorpios Kawésqar · Glaciares da Patagônia",
  description: "Navegação pelo Canal Sarmiento e Fiordes Kawésqar, entre glaciares e natureza selvagem da Patagônia Chilena.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
