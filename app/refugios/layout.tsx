import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Refúgios de Natureza",
  description: "Hospedagens únicas em meio à natureza na Patagônia, Alpes e além. Experiências de imersão fora dos roteiros convencionais.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
