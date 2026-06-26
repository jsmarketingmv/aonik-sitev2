import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fiordes da Patagônia · Antarctica21",
  description: "Navegação pelos fiordes chilenos da Patagônia antes da grande travessia à Antártica.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
