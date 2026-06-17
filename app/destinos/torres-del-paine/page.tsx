import type { Metadata } from "next";
import Capa from "./capa";

export const metadata: Metadata = {
  title: "Torres del Paine · Circuito W | AONIK",
  description:
    "Caminhe o lendário circuito W em Torres del Paine, na Patagônia Chilena. Quatro programas, guiado ou autoguiado, com refúgios, camping e o Hotel Las Torres. Logística cuidada pela AONIK.",
  openGraph: {
    title: "Torres del Paine · Circuito W | AONIK",
    description:
      "Quatro formas de percorrer a oitava maravilha do mundo. Comunidade, conforto e a logística toda cuidada pela AONIK.",
  },
};

export default function Page() {
  return <Capa />;
}
