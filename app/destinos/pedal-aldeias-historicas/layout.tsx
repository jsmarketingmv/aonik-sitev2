import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bike Aldeias Históricas",
  description: "227 km pelo interior montanhoso de Portugal, pedaling pelas aldeias históricas da Serra da Estrela.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
