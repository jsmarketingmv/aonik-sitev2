import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Douro Experience Autoguiado",
  description:
    "Caminhada autoguiada de 6 dias pelo Vale do Douro, no seu ritmo. Vinhedos em socalcos, quintas com prova de vinho, aldeias vinhateiras e logística resolvida. A partir de € 1.557.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
