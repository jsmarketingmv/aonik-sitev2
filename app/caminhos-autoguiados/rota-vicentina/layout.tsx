import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rota Vicentina",
  description:
    "Oito dias à beira do Atlântico pela costa mais selvagem do sudoeste de Portugal. 91,1 km pelo Trilho dos Pescadores, entre falésias, praias desertas e vilas piscatórias. Autoguiado, a partir de € 856.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
