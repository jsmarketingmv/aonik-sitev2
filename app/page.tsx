import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Universos from "./components/Universos";
import GruposHome from "./components/GruposHome";
import JornadaPortal from "./components/JornadaPortal";
import CaminhosPortugalPortal from "./components/CaminhosPortugalPortal";
import PatagoniaPortal from "./components/PatagoniaPortal";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Universos />
      <GruposHome />
      <JornadaPortal />
      <CaminhosPortugalPortal />
      <PatagoniaPortal />
      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
