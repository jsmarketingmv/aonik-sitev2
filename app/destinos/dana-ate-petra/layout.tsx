import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dana até Petra · Jordânia",
  description: "10 dias de travessia a pé pelo deserto da Jordânia, da Reserva de Dana até a cidade rosa de Petra.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
