import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Grupos de Trekking",
  description: "Saídas em grupo pelos cantos mais bonitos do planeta. Guia especializado, grupos pequenos, tudo organizado.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
