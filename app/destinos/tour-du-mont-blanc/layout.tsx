import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tour du Mont Blanc",
  description: "14 dias percorrendo os Alpes Franceses, Italianos e Suíços no circuito mais famoso do mundo. Grupos guiados com curadoria AONIK.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
