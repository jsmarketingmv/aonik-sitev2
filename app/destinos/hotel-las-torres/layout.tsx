import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Las Torres Patagonia",
  description: "Hotel icônico dentro do Parque Nacional Torres del Paine. Base ideal para o Circuito W e trilhas na Patagônia.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
