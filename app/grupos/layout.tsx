import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grupos de Trekking",
  description: "Saídas em grupo pelos cantos mais bonitos do planeta. Guia especializado, grupos pequenos, tudo organizado.",
  openGraph: {
    title: "Grupos de Trekking | AONIK",
    description: "Saídas em grupo pelos cantos mais bonitos do planeta. Guia especializado, grupos pequenos, tudo organizado.",
    url: "https://www.aonik.com.br/grupos",
    images: [{ url: "/images/grupos/tmb-cume.jpg", width: 1200, height: 630, alt: "Grupos de Trekking AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
