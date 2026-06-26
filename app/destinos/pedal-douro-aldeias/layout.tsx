import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bike Vale do Douro",
  description: "232 km pelo Vale do Douro e planalto transmontano — vinhedos, aldeias e história sobre duas rodas.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
