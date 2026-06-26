import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho de Baiona · Santiago",
  description: "Da cidade histórica de Baiona a Santiago de Compostela pela variante da costa galega.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
