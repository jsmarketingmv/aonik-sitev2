import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Central Português",
  description: "O Caminho Português Central, de Lisboa a Santiago de Compostela — 620 km de história e espiritualidade.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
