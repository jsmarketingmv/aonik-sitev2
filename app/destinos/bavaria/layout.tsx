import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bavária Alemã",
  description: "9 dias nos Alpes Bávaros, entre castelos medievais, lagos cristalinos e trilhas de alta montanha com guia especializado.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
