import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ilhas Malvinas e Antártica · Antarctica21",
  description: "Expedição subantártica pelas Ilhas Malvinas e Geórgia do Sul antes de chegar à Península Antártica.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
