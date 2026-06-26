import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coxilha Rica · Serra Catarinense",
  description: "5 dias de caminhada nos campos de altitude da Serra Catarinense. A Patagônia brasileira — campos floridos e horizonte infinito.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
