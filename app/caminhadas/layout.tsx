import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminhadas",
  description: "Peregrinações, travessias e imersões a pé pelo mundo. Trilhas guiadas e autoguiadas nos Alpes, Patagônia, Caminho de Santiago e muito mais.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
