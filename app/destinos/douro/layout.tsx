import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Douro Experience",
  description: "8 dias de caminhada pelo Vale do Douro, entre vinhedos em socalcos, aldeias históricas e as margens do Rio Douro.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
