"use client";

import ValeEuropeuPage, { type ValeData } from "../../components/ValeEuropeuPage";

const IMG = "/vale-europeu";

const DATA: ValeData = {
  slug: "vale-europeu-7-dias",
  dias: "7 dias",
  titulo: "Circuito Completo",
  subtitulo:
    "O circuito inteiro, da parte baixa colonial até os campos altos do planalto. Sete dias de pedal, cerca de 300 km, pontes cobertas, cachoeiras, a Região dos Lagos e o ponto mais alto a quase 1.000 metros de altitude. A travessia completa do Vale Europeu.",
  intro:
    "Quem quer o Vale Europeu de verdade pedala o circuito inteiro: começa na colônia alemã e italiana das partes baixas e sobe, dia após dia, até os campos do planalto, as cachoeiras escondidas e a Região dos Lagos. Sete dias de pedal que conectam cultura, água, mata e altitude numa só travessia.",
  heroImg: `${IMG}/fp-8.jpg`,
  precoBase: "R$ 4.560",
  baseInclui: [
    "8 noites de hospedagem em apartamento standard (duplo/casal) com café da manhã",
    "Suporte e monitoramento via satélite durante todo o percurso",
    "Bandana oficial AONIK de boas-vindas",
  ],
  cidades: ["Timbó", "Pomerode", "Indaial", "Rodeio", "Dr. Pedrinho", "Alto Cedros", "Palmeiras"],
  stats: [
    { v: "7", u: "dias de pedal", s: "+ chegada e briefing" },
    { v: "319 km", u: "distância", s: "circuito completo" },
    { v: "+5.328 m", u: "ganho de altitude", s: "acumulado positivo" },
    { v: "8 noites", u: "hospedagem", s: "inclusa na base" },
    { v: "~1.000 m", u: "altitude máxima", s: "ponto mais alto" },
    { v: "o ano todo", u: "disponível", s: "partidas flexíveis" },
  ],
  blocoCultura: {
    titulo: "Da colônia ao planalto",
    texto:
      "A travessia começa na herança europeia das partes baixas, Pomerode alemã, Rodeio italiana, casas enxaimel e o Caminho dos Anjos com sua réplica do Cristo Redentor. Aos poucos a paisagem vira planalto: arrozais, reflorestamentos e fazendas com vistas rurais que se abrem no alto.",
    img: `${IMG}/fp-5.jpg`,
  },
  blocoNatureza: {
    titulo: "Cachoeiras e Região dos Lagos",
    texto:
      "Na parte alta, a água manda: a cachoeira Véu de Noiva, riachos para atravessar, paredões e a Região dos Lagos em Rio dos Cedros. No ponto mais alto, quase a 1.000 metros, duas cachoeiras escondidas, uma ótima para banho, recompensam a subida mais longa do circuito.",
    img: `${IMG}/fp-33.jpg`,
  },
  feature: {
    kicker: "Parte alta · planalto",
    titulo: "A subida mais longa termina nos campos do alto",
    texto:
      "Depois de Rodeio, o circuito ganha altitude pelo Caminho dos Anjos e não para mais de subir. A recompensa é o planalto: campos abertos, lagos espelhados, ar puro e o silêncio que só existe a quase mil metros de altura. É a parte do Vale que poucos conhecem.",
    img: `${IMG}/way-circuito.jpg`,
  },
  galeria: [
    { src: `${IMG}/fp-8.jpg`, cap: "Estrada de mata, ritmo de quem tem tempo", tag: "Rota" },
    { src: `${IMG}/way-circuito.jpg`, cap: "Os campos altos vistos do alto", tag: "Parte alta" },
    { src: `${IMG}/fp-33.jpg`, cap: "O dossel das araucárias e pinheiros", tag: "Mata" },
    { src: `${IMG}/fp-20.jpg`, cap: "Carro de apoio pronto na beira da estrada", tag: "Suporte" },
    { src: `${IMG}/fp-24.jpg`, cap: "Pausa sob as buganvílias", tag: "Paradas" },
    { src: `${IMG}/fp-5.jpg`, cap: "Igreja enxaimel, raríssima fora da Europa", tag: "Cultura" },
    { src: `${IMG}/cover-circuito.jpeg`, cap: "O grupo reunido à beira do rio", tag: "Pedal em grupo" },
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
      titulo: "53 km · +550 m / -427 m · Indaial › Ascurra › Rodeio",
      texto:
        "Após o descanso, deixamos Indaial e seguimos para o Ribeirão Encano. O pedal segue pelas margens do riacho, com pontes cobertas e casas enxaimel fazendo parte do caminho, onde vamos conhecer uma enorme ponte pênsil sobre o Rio Itajaí-Açu. Seguiremos por suas margens passando por Ascurra e chegando em Rodeio, uma cidadezinha tipicamente italiana. Aqui iniciamos a parte alta do circuito.",
    },
    {
      d: "05",
      tag: "4º Dia de Pedal",
      titulo: "43 km · +1.132 m / -670 m · Rodeio › Benedito Novo › Doutor Pedrinho",
      texto:
        "Deixamos Rodeio e iniciamos a subida mais longa do circuito pelo Caminho dos Anjos, onde temos uma réplica do Cristo Redentor, próxima à metade da subida. Logo chegaremos ao vale do Ribeirão Liberdade, em Benedito Novo, onde conhecemos a Mega Bike e uma das poucas igrejas enxaimel fora da Europa. O final do nosso pedal será em Doutor Pedrinho.",
    },
    {
      d: "06",
      tag: "5º Dia de Pedal",
      titulo: "38 km · +800 m / -600 m · Dr. Pedrinho › Região dos Lagos",
      texto:
        "Seguimos em meio aos arrozais até o início da trilha que nos leva à cachoeira Véu de Noiva, um dos cartões-postais da cidade. Continuaremos mais um trecho pelo asfalto, mas logo estaremos pedalando por uma estradinha de paisagens bucólicas, atravessando riachos até chegar à Região dos Lagos, em Rio dos Cedros.",
    },
    {
      d: "07",
      tag: "6º Dia de Pedal",
      titulo: "39 km · +756 m / -746 m · ponto mais alto, ~1.000 m",
      texto:
        "Nosso pedal segue em meio a reflorestamentos e fazendas com belas paisagens rurais. Neste dia chegamos ao ponto mais alto do circuito, quase a 1.000 metros acima do nível do mar. Faremos um pequeno desvio para conhecer duas belíssimas cachoeiras, sendo uma delas ótima para banho, e mais um pouco de pedal nos leva a outro belíssimo lago.",
    },
    {
      d: "08",
      tag: "7º Dia de Pedal",
      titulo: "53 km · +800 m / -1.350 m · Palmeiras › Timbó",
      texto:
        "Último dia de pedal: deixamos o lago com seus lindos paredões. Neste dia, longas descidas farão parte do nosso pedal, assim como uma subida curta, porém com a maior inclinação do circuito. Vamos passar por uma linda ponte coberta e pedalar às margens das corredeiras do Rio dos Cedros. Já em Benedito Novo, seguimos pelo centro da cidade até Timbó, onde iniciamos nosso pedal.",
    },
  ],
  opcionais: [
    {
      nome: "Carro de apoio",
      preco: "R$ 6.000",
      unidade: "total",
      destaque: true,
      nota:
        "Preço total por veículo, atende até 10 pessoas de apoio, com o valor dividido entre os participantes. Já inclui o transporte de bagagem.",
    },
    { nome: "Quarto individual (single) · 8 noites", preco: "R$ 2.775", unidade: "pessoa" },
    { nome: "Transporte de bagagens (até 4 pax)", preco: "R$ 1.715", unidade: "total" },
    { nome: "Transfer aeroporto Navegantes (in/out, até 2 pax)", preco: "R$ 930", unidade: "total" },
    { nome: "Aluguel de E-Bike", preco: "R$ 3.000", unidade: "pessoa" },
    { nome: "Aluguel de MTB", preco: "R$ 1.300", unidade: "pessoa" },
    { nome: "Montagem, limpeza e desmontagem de bike", preco: "R$ 430", unidade: "pessoa" },
    { nome: "Camisa oficial manga curta", preco: "R$ 180", unidade: "pessoa" },
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
  iaTitulo: "Pergunte tudo sobre o Circuito Completo",
  iaTexto:
    "Preparo físico para os 319 km, a subida do Caminho dos Anjos, a Região dos Lagos, aluguel de E-Bike, melhor época e logística. A AonikIA conhece a travessia inteira de ponta a ponta.",
};

export default function Page() {
  return <ValeEuropeuPage data={DATA} />;
}
