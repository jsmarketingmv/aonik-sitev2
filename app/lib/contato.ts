// Dados de contato da AONIK (referência do site atual).
// Centralizado para reuso em formulário, rodapé e botão flutuante.
export const AONIK = {
  whatsapp: "5547988047422", // 47 98804-7422
  whatsappLabel: "47 98804-7422",
  email: "contato@aonik.com.br",
  instagram: "aonik.experiences",
  instagramUrl: "https://instagram.com/aonik.experiences",
  cidade: "Blumenau, Santa Catarina, SC, Brasil",
} as const;

/* Mensagens pré-preenchidas por slug de produto */
const WA_MSGS: Record<string, string> = {
  "w-tradicional":    "Olá! Gostaria de mais informações sobre o Circuito W Tradicional em Torres del Paine.",
  "w-express":        "Olá! Gostaria de mais informações sobre o Circuito W Express em Torres del Paine.",
  "w-plus":           "Olá! Gostaria de mais informações sobre o W+ Express Plus em Torres del Paine.",
  "w-journey":        "Olá! Gostaria de mais informações sobre o W Journey em Torres del Paine.",
  "skorpios":         "Olá! Gostaria de mais informações sobre o Cruzeiro Skorpios na Patagônia.",
  "rio-serrano":      "Olá! Gostaria de mais informações sobre o Hotel Rio Serrano na Patagônia.",
  "compostela":       "Olá! Gostaria de mais informações sobre o Caminho de Santiago de Compostela.",
  "tmb":              "Olá! Gostaria de mais informações sobre o Tour du Mont Blanc.",
  "dolomitas":        "Olá! Gostaria de mais informações sobre as Dolomitas Alta Via 1.",
  "antarctica21":     "Olá! Gostaria de mais informações sobre a expedição com a Antarctica21.",
  "tirol":            "Olá! Gostaria de mais informações sobre o Tirol Austríaco (Stubaier Höhenweg).",
  "dana-ate-petra":   "Olá! Gostaria de mais informações sobre o roteiro Dana até Petra.",
  "douro":            "Olá! Gostaria de mais informações sobre o Douro Experience Autoguiado.",
  "douro-luxury":     "Olá! Gostaria de mais informações sobre o Douro Luxury.",
  "santiago-e-douro": "Olá! Gostaria de mais informações sobre o roteiro Santiago e Douro.",
};
const WA_DEFAULT = "Olá! Gostaria de mais informações sobre os roteiros da AONIK.";

/** Gera link wa.me com mensagem pré-preenchida, por slug de produto. */
export function waUrl(slug?: string): string {
  const text = (slug ? WA_MSGS[slug] : undefined) ?? WA_DEFAULT;
  return `https://wa.me/${AONIK.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Lista curada de destinos — espelha o portfólio do SaaS (ContactForm.tsx).
// Mantida em PT (nomes próprios do portfólio) para os 3 idiomas; localizar depois se preciso.
export const DESTINOS_CURADOS = [
  "PORTUGAL - Caminho de Santiago A PÉ",
  "PORTUGAL - Caminho de Santiago DE BIKE",
  "PORTUGAL - Região do Douro",
  "PORTUGAL - Douro Experience (Autoguiado)",
  "PORTUGAL - Douro Luxury (Guiado)",
  "PORTUGAL - Santiago e Douro",
  "PORTUGAL - Região de Trás-Os-Montes",
  "PORTUGAL - Parque Nacional Peneda Gerês",
  "PORTUGAL - Rota Vicentina",
  "PORTUGAL - Bike Porto a Lisboa",
  "PORTUGAL - Caminho de Nazaré a Fátima",
  "PORTUGAL - Bike Aldeias Históricas",
  "PORTUGAL - Ilha dos Açores",
  "PORTUGAL - Ilha da Madeira",
  "ESPANHA - Santiago de Compostela",
  "PATAGÔNIA CHILENA - Torres del Paine · W Journey Circuit",
  "PATAGÔNIA CHILENA - Torres del Paine · W Express",
  "PATAGÔNIA CHILENA - Torres del Paine · W+ Express Plus",
  "PATAGÔNIA CHILENA - Torres del Paine · W Tradicional",
  "PATAGÔNIA CHILENA - Rio Serrano",
  "PATAGÔNIA CHILENA - Hotel Las Torres",
  "PATAGÔNIA CHILENA - Hotéis All Inclusive",
  "PATAGÔNIA CHILENA - Cruzeiro Skorpios",
  "PATAGÔNIA CHILENA - Cruzeiro Antarctida 21",
  "PATAGÔNIA CHILENA - Roteiros e Passeios",
  "BRASIL - Coxilha Rica, Serra Catarinense",
  "BRASIL - Urubici, Serra Catarinense",
  "BRASIL - Outros Roteiros",
  "BRASIL - Travessia Cassino ao Chui",
  "GRUPOS DE TREKKING - Tour Du Mont Blanc",
  "GRUPOS DE TREKKING - Dolomitas Alta Via",
  "GRUPOS DE TREKKING - Bavária Alemã",
  "GRUPOS DE TREKKING - Tirol Austríaco",
  "GRUPOS DE TREKKING - Dana até Petra",
  "GRUPOS DE TREKKING - Liechtenstein",
  "GRUPOS DE TREKKING - Santiago de Compostela",
  "GRUPOS DE TREKKING - Douro Experience (Grupos)",
  "OUTRAS EXPERIÊNCIAS - Safáris na África",
  "OUTRAS EXPERIÊNCIAS - Cruzeiros Expedição",
  "OUTRAS EXPERIÊNCIAS - Roteiros de Bike",
  "OUTRAS EXPERIÊNCIAS - Roteiros de Neve",
  "OUTRAS EXPERIÊNCIAS - Hotéis de Natureza",
  "OUTRAS EXPERIÊNCIAS - Experiências Brasil",
] as const;
