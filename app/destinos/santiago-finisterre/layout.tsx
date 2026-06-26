import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Santiago a Finisterre",
  description: "A caminhada além de Santiago — de Compostela até o Cabo Finisterre, o fim do mundo celta.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
