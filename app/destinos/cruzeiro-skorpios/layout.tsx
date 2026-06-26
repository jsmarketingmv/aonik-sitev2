import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Skorpios · Cruzeiro Patagônia",
  description: "Cruzeiros pela Patagônia Chilena a bordo dos navios Skorpios — canais, fiordes e glaciares entre Puerto Montt e Laguna San Rafael.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
