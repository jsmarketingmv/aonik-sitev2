import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dolomitas Alta Via 1",
  description: "10 dias na Alta Via 1, o percurso mais clássico dos Alpes Italianos, entre picos de calcário e refúgios históricos.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
