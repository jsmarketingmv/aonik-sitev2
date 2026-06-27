"use client";

import ValeEuropeuPage, { type ValeData } from "../../components/ValeEuropeuPage";

const IMG = "/vale-europeu";

const DATA: ValeData = {
  slug: "vale-europeu-3-dias",
  dias: "3 dias",
  titulo: "Parte Baixa",
  subtitulo:
    "Três dias de pedal pelo coração colonial do Vale Europeu Catarinense. Pontes cobertas, rios de água limpa, a cidade mais alemã do Brasil e o charme italiano de Rodeio. O Brasil que parece Europa, no ritmo da sua bike.",
  intro:
    "Existe um Brasil que fala alemão no café da manhã e italiano no almoço, com casas enxaimel, pontes cobertas e estradas de terra que cortam a Mata Atlântica. A Parte Baixa do Circuito Vale Europeu é a porta de entrada perfeita: três dias de pedal, paisagem que muda a cada curva e cultura viva em cada parada.",
  heroImg: `${IMG}/cover-circuito.jpeg`,
  precoBase: "R$ 2.100",
  baseInclui: [
    "4 noites de hospedagem em apartamento standard (duplo/casal) com café da manhã",
    "Suporte e monitoramento via satélite durante todo o percurso",
    "Bandana oficial AONIK de boas-vindas",
  ],
  cidades: ["Timbó", "Rio dos Cedros", "Pomerode", "Indaial", "Ascurra", "Rodeio"],
  stats: [
    { v: "3", u: "dias de pedal", s: "+ chegada e briefing" },
    { v: "139 km", u: "distância", s: "soma das 3 etapas" },
    { v: "+1.659 m", u: "ganho de altitude", s: "acumulado positivo" },
    { v: "4 noites", u: "hospedagem", s: "inclusa na base" },
    { v: "2", u: "culturas", s: "alemã e italiana" },
    { v: "o ano todo", u: "disponível", s: "partidas flexíveis" },
  ],
  blocoCultura: {
    titulo: "Pomerode e Rodeio",
    texto:
      "Pomerode é a cidade mais alemã do Brasil: o idioma, as danças e a arquitetura enxaimel seguem vivos. Mais à frente, Rodeio aparece tipicamente italiana, com igrejas e cantinas. Você pedala dentro de uma colônia europeia que o tempo preservou no interior catarinense.",
    img: `${IMG}/fp-5.jpg`,
  },
  blocoNatureza: {
    titulo: "Rios e pontes cobertas",
    texto:
      "A trilha sonora da rota é a água: riachos da Mata Atlântica que descem das encostas, o grandioso Rio Itajaí-Açu e as pontes cobertas centenárias, cartões-postais do vale. Tem pausa para banho de rio e estradas de terra silenciosas, longe do asfalto.",
    img: `${IMG}/fp-24.jpg`,
  },
  feature: {
    kicker: "Cultura viva · colônia alemã",
    titulo: "A cidade mais alemã do Brasil mora no caminho",
    texto:
      "Em Pomerode, o pomerano ainda é falado nas casas, o enxaimel desenha as fachadas e a hospitalidade germânica recebe o ciclista como se a Europa tivesse atravessado o Atlântico. Pedalar por aqui é viajar no tempo sem sair de Santa Catarina.",
    img: `${IMG}/fp-1.jpg`,
  },
  galeria: [
    { src: `${IMG}/cover-circuito.jpeg`, cap: "O grupo reunido à beira do rio", tag: "Pedal em grupo" },
    { src: `${IMG}/fp-5.jpg`, cap: "Igreja enxaimel, raríssima fora da Europa", tag: "Arquitetura" },
    { src: `${IMG}/fp-1.jpg`, cap: "Charrete e bike dividindo a estrada rural", tag: "Vida no campo" },
    { src: `${IMG}/fp-24.jpg`, cap: "Pausa sob as buganvílias, à sombra", tag: "Paradas" },
    { src: `${IMG}/fp-8.jpg`, cap: "Estrada de terra cortando a mata", tag: "Rota" },
    { src: `${IMG}/fp-22.jpg`, cap: "A paisagem do Vale Europeu", tag: "Paisagem" },
  ],
  roteiro: [
    {
      d: "01",
      tag: "Chegada e briefing",
      titulo: "Chegada a Timbó",
      texto:
        "Este é o dia planejado para você sair de sua casa e chegar até Timbó, seja de transporte aéreo utilizando o aeroporto de Navegantes, que dispõe de transfers regulares, ou então através de ônibus ou com seu próprio carro, pelas BR-101 e BR-470. Ao fim do dia faremos o briefing do roteiro e todos estarão livres para jantar.",
    },
    {
      d: "02",
      tag: "1º Dia de Pedal",
      titulo: "48 km · +560 m / -560 m · Timbó › Rio dos Cedros › Pomerode",
      texto:
        "Início na cidade de Timbó, passando pela área rural de Rio dos Cedros, onde conheceremos uma das pontes cobertas do vale, com uma pequena pausa para fotos e um agradável banho de rio. Seguiremos para Pomerode, a cidade mais alemã do Brasil, com fortes traços nos costumes, danças e idiomas. O percurso será na maior parte por áreas rurais e estradas de terra.",
    },
    {
      d: "03",
      tag: "2º Dia de Pedal",
      titulo: "45 km · +730 m / -700 m · Pomerode › Timbó › Indaial",
      texto:
        "Saímos da cidade em direção ao bairro de Wunderwald, em meio à mata temos vários riachos que serão a trilha sonora da nossa subida. Já em Indaial temos que ter atenção para atravessar com segurança a BR-470, que sempre possui um grande tráfego. Em frente encontramos o grandioso Rio Itajaí-Açu, e no centro da cidade temos a ponte dos arcos, um dos cartões-postais da cidade.",
    },
    {
      d: "04",
      tag: "3º Dia de Pedal",
      titulo: "46 km · +369 m / -364 m · Indaial › Ascurra › Rodeio › Timbó",
      texto:
        "Após o descanso, deixamos Indaial e seguimos para a localidade de Warnow. O pedal segue pelas margens do Rio Itajaí-Açu, com uma pausa para conhecer a ponte pênsil sobre o rio, e seguiremos por suas margens passando por Ascurra e chegando em Rodeio, uma cidadezinha tipicamente italiana. Para chegar a Timbó seguimos pelo acostamento da SC-110, ou há a opção de contratar um transfer para essa última parte (fale conosco).",
    },
  ],
  opcionais: [
    {
      nome: "Carro de apoio",
      preco: "R$ 2.645",
      unidade: "total",
      destaque: true,
      nota:
        "Preço total por veículo, atende até 10 pessoas de apoio, com o valor dividido entre os participantes. Já inclui o transporte de bagagem.",
    },
    { nome: "Quarto individual (single) · 4 noites", preco: "R$ 1.360", unidade: "pessoa" },
    { nome: "Transporte de bagagens", preco: "R$ 715", unidade: "total" },
    { nome: "Transfer aeroporto Navegantes (in/out, até 2 pax)", preco: "R$ 930", unidade: "total" },
    { nome: "Aluguel de E-Bike", preco: "R$ 1.290", unidade: "pessoa" },
    { nome: "Aluguel de MTB", preco: "R$ 560", unidade: "pessoa" },
    { nome: "Montagem, limpeza e desmontagem de bike", preco: "R$ 430", unidade: "pessoa" },
    { nome: "Camisa oficial manga curta", preco: "R$ 165", unidade: "pessoa" },
    { nome: "Camisa oficial manga longa", preco: "R$ 195", unidade: "pessoa" },
    { nome: "Boné de ciclismo", preco: "R$ 65", unidade: "pessoa" },
    { nome: "Meia oficial", preco: "R$ 50", unidade: "pessoa" },
  ],
  naoIncluso: [
    "Bicicleta (traga a sua ou alugue nos opcionais)",
    "Transporte até Timbó e retorno",
    "Refeições além do café da manhã (almoços e jantares)",
    "Seguro de viagem e assistência médica",
    "Itens de uso pessoal e despesas extras",
  ],
  iaTitulo: "Pergunte tudo sobre a Parte Baixa",
  iaTexto:
    "Nível de pedal, como chegar a Timbó, aluguel de bike, melhor época, o que levar e como funciona o carro de apoio. A AonikIA conhece este circuito de ponta a ponta.",
};

export default function Page() {
  return <ValeEuropeuPage data={DATA} />;
}
