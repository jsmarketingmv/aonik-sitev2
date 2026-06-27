import { MetadataRoute } from "next";

const base = "https://www.aonik.com.br";
const today = new Date("2026-06-27");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepage
    { url: base, lastModified: today, changeFrequency: "weekly", priority: 1.0 },

    // Seções principais
    { url: `${base}/caminhadas`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/grupos`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/navegacao`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/bike`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/autoguiados`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/caminhos-autoguiados`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hoteis`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/jornada`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/quem-somos`, lastModified: today, changeFrequency: "monthly", priority: 0.5 },

    // Destinos principais
    { url: `${base}/destinos/tour-du-mont-blanc`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/torres-del-paine`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/cruzeiro-skorpios`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/dolomitas-alta-via`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/bavaria`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/tirol`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/coxilha-rica`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/dana-ate-petra`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/rio-serrano`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/hotel-las-torres`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/antarctica21`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/douro`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },

    // Torres del Paine — Circuito W
    { url: `${base}/destinos/torres-del-paine/w-tradicional`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/torres-del-paine/w-express`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/torres-del-paine/w-plus`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/torres-del-paine/w-journey`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },

    // Cruzeiro Skorpios
    { url: `${base}/destinos/cruzeiro-skorpios/kaweskar`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/cruzeiro-skorpios/chonos`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },

    // Antarctica21
    { url: `${base}/destinos/antarctica21/classic`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/antarctica21/express`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/antarctica21/inaugural`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/antarctica21/falkland-islands`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/antarctica21/patagonia-fjords`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },

    // Caminho de Santiago — rotas a pé
    { url: `${base}/destinos/sarria-7-etapas`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/sarria-8-etapas`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/caminho-central-ape`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-costa-ape`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-baiona-ape`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-valenca-ape`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-easy-ape`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-cebreiro`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-primitivo`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/santiago-finisterre`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },

    // Cicloturismo
    { url: `${base}/destinos/caminho-central-bike`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/caminho-costa-bike`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/pedal-porto-lisboa`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/pedal-douro-aldeias`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/pedal-aldeias-historicas`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/destinos/vale-europeu-3-dias`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos/vale-europeu-7-dias`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },

    // Caminhos de Portugal — autoguiados
    { url: `${base}/caminhos-autoguiados/douro`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/caminhos-autoguiados/douro-luxury`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/caminhos-autoguiados/rota-vicentina`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/caminhos-autoguiados/santiago-e-douro`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/caminhos-autoguiados/nazare-a-fatima`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
  ];
}
