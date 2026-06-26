import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Antártica Inaugural · Antarctica21",
  description: "A saída inaugural da temporada antártica com Antarctica21, com programação especial de celebração.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
