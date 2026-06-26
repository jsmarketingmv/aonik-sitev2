import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Douro Luxury",
  description:
    "O Douro em estado de luxo. 6 dias com estadia em quintas históricas, provas de Vinho do Porto Vintage e caminhadas curtas e refinadas pelo Vale do Douro, Patrimônio UNESCO. A partir de € 2.130.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
