import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tirol Austríaco",
  description: "10 dias no Stubaier Höhenweg, um dos mais belos percursos alpinos da Áustria com glaciares e vistas únicas.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
