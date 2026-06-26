import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quem Somos",
  description: "A AONIK é uma operadora de turismo de natureza e aventura. Viagens que viram jornada — caminhadas, bike, cruzeiros e refúgios.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
