// Caminho Português de Santiago Interior: duas versões (desde Vila Pouca de Aguiar e desde Chaves).
// Fonte: programas da Portugal NTN Walking (temporada 2027), adaptados ao português do Brasil.
// Chaves = Vila Pouca a partir da etapa de Chaves a Verín.

export type Etapa = {
  de: string;
  para: string;
  texto: string;
  km: string;
  sobe: number;
  desce: number;
  horas: string;
  foto: string;
  transfer?: string;
};

const F = (n: string) => `/images/caminho-interior/${n}.jpg`;

const ETAPAS: Etapa[] = [
  {
    de: "Vila Pouca de Aguiar", para: "Vidago", km: "18,6", sobe: 79, desce: 457, horas: "4h30", foto: F("dia-01-1"),
    texto: "Entre as serras do Alvão e da Padrela, o Caminho desce suave pelo vale de Aguiar, por trilhas de terra e aldeias de granito. Passa pela estância termal de Pedras Salgadas e termina em Vidago, vila termal cheia de charme.",
  },
  {
    de: "Vidago", para: "Chaves", km: "20,2", sobe: 331, desce: 328, horas: "5h30", foto: F("dia-02-1"),
    texto: "Estradas rurais e caminhos de terra sobem até Vilas Boas e Vilela do Tâmega, com o vale aberto à frente. A descida pela várzea leva a Chaves, cidade de termas e muralhas, onde você entra pela ponte romana sobre o Tâmega.",
  },
  {
    de: "Chaves", para: "Verín", km: "28,4", sobe: 222, desce: 198, horas: "7h", foto: F("dia-03-2"),
    texto: "A etapa mais longa, quase toda plana: a várzea de Chaves, a igreja românica de Outeiro Seco e a fronteira cruzada em Vilarelho da Raia. Já na Galiza, as vinhas de Monterrei levam a Verín, terra de águas minerais.",
  },
  {
    de: "Verín", para: "Trasmiras", km: "23,6", sobe: 676, desce: 420, horas: "7h", foto: F("dia-04-1"),
    texto: "O grande dia de montanha. A subida ao Castelo de Monterrei revela o vale e a fronteira, e o caminho segue pelas vinhas de Albarellos e Infesta até perto dos 850 metros. A descida suave leva a Trasmiras, às portas da Limia.",
  },
  {
    de: "Trasmiras", para: "Xinzo de Limia", km: "12,9", sobe: 26, desce: 47, horas: "3h", foto: F("dia-05-1"),
    texto: "Uma etapa curta e plana pela planície da Limia, onde existiu a lagoa de Antela, entre campos abertos e canais. Você chega cedo a Xinzo de Limia, com a tarde livre numa vila famosa pelo Entroido e pelas Pantallas.",
  },
  {
    de: "Xinzo de Limia", para: "Allariz", km: "23,1", sobe: 175, desce: 339, horas: "5h45", foto: F("dia-06-2"),
    texto: "Da planície aos caminhos de pedra e carvalhais da Reserva da Biosfera de Allariz. Uma descida longa leva ao vale do Arnoia e a Allariz, vila premiada pela recuperação do seu patrimônio, de pontes medievais e casas de pedra.",
  },
  {
    de: "Allariz", para: "Ourense", km: "17,2", sobe: 219, desce: 400, horas: "4h30", foto: F("dia-07-2"),
    texto: "Em Santa Mariña de Augas Santas, o castro de Armea, a «Cidade Perdida», e o misterioso Forno da Santa. A caminhada termina antes da zona industrial e um transfer leva você ao centro de Ourense, para uma tarde nas termas de As Burgas.",
    transfer: "Transfer incluído do fim da etapa até o centro de Ourense.",
  },
  {
    de: "Ourense", para: "Cea", km: "22,6", sobe: 589, desce: 210, horas: "6h30", foto: F("dia-08-1"),
    texto: "A saída é pela ponte romana sobre o Minho, rumo à subida mais dura da Galiza, até o alto de Astrés. Depois, carvalhais e aldeias de granito até Cea, terra do pão assado em forno a lenha numa receita de séculos.",
  },
  {
    de: "Cea", para: "Lalín", km: "27,9", sobe: 582, desce: 620, horas: "7h45", foto: F("dia-09-2"),
    texto: "A etapa mais alta e solitária: um planalto de mato e horizontes largos até perto dos 850 metros, com a variante opcional pelo Mosteiro de Oseira. Termina junto à estação da Laxe, com um transfer curto até Lalín, terra do cozido.",
    transfer: "Transfer incluído da Laxe até o centro de Lalín.",
  },
  {
    de: "Lalín", para: "Silleda", km: "18,7", sobe: 265, desce: 405, horas: "5h", foto: F("dia-10-1"),
    texto: "Corredoiras, carvalhos, espigueiros e cruzeiros nos caminhos verdes do Deza. O grande momento do dia é a Ponte Taboada, construída no ano 912, uma das pontes datadas mais antigas da Galiza. Tarde livre em Silleda.",
  },
  {
    de: "Silleda", para: "Ponte Ulla", km: "19,5", sobe: 286, desce: 472, horas: "5h15", foto: F("dia-11-1"),
    texto: "Caminhos tranquilos entre prados, bosques de carvalho e castanheiro e aldeias como Bandeira. No fim, uma descida acentuada ao vale do Ulla, com o grande viaduto ferroviário e Santiago a apenas um dia.",
  },
  {
    de: "Ponte Ulla", para: "Santiago de Compostela", km: "19,7", sobe: 404, desce: 333, horas: "5h30", foto: F("dia-12-1"),
    texto: "O Pico Sacro, ligado à lenda do Apóstolo, acompanha a subida a Outeiro. O caminho desce ao vale do Sar e entra no centro histórico pela Porta de Mazarelos, até a Praza do Obradoiro. É hora de retirar a sua Compostela.",
  },
];

const DIA_FINAL = {
  titulo: "Santiago de Compostela",
  texto: "Depois do café da manhã e do check-out, o programa termina. Se der tempo, assista à Missa do Peregrino, suba às coberturas da catedral ou passeie pelo Mercado de Abastos. Dá para somar noites extras em Santiago.",
  foto: F("dia-12-2"),
};

export type ProgramaInterior = {
  slug: string;
  nome: string;
  desde: string;
  subtitulo: string;
  dias: number;
  noites: number;
  km: string;
  etapas: Etapa[];
  diaFinal: typeof DIA_FINAL;
  capa: string;
  sobre: string[];
  destaques: string[];
  nivel: string;
  inclui: string[];
  naoInclui: string[];
  extras: string[];
  preco: string;
  single: string;
  /** versão em grupo guiado AONIK (só Vila Pouca) */
  grupo?: { periodo: string; texto: string };
  interesse: string;
  interesseGrupo?: string;
  galeria: string[];
};

const comum = {
  diaFinal: DIA_FINAL,
  naoInclui: [
    "Passagens até o ponto de partida e de volta a partir de Santiago de Compostela",
    "Almoços, jantares e bebidas",
    "Entradas em monumentos, museus e termas",
    "Taxas turísticas, quando houver",
    "Despesas pessoais",
    "Serviços não indicados como incluídos",
  ],
};

const destaquesBase = [
  "Um Caminho de Santiago longe das multidões",
  "Ponte romana de Chaves e Castelo de Monterrei",
  "Reserva da Biosfera de Allariz e Augas Santas",
  "Pontes medievais e carvalhais da Vía da Prata",
  "Chegada à Praza do Obradoiro e à sua Compostela",
  "Bagagem levada de hospedagem em hospedagem",
];

export const VILA_POUCA: ProgramaInterior = {
  ...comum,
  slug: "caminho-interior-vila-pouca",
  nome: "Caminho Português Interior",
  desde: "desde Vila Pouca de Aguiar",
  subtitulo: "Doze etapas a pé pelo interior de Portugal e da Galiza, de Vila Pouca de Aguiar a Santiago de Compostela, entre vilas termais, castelos de fronteira, carvalhais e aldeias onde o Caminho ainda se faz em silêncio.",
  dias: 13, noites: 12, km: "252,4 km",
  etapas: ETAPAS,
  capa: F("capa"),
  sobre: [
    "O Caminho Português Interior é a forma mais tranquila de chegar a Santiago de Compostela. São doze etapas a pé, de Vila Pouca de Aguiar até a Praza do Obradoiro, por um caminho longe das multidões, onde você caminha horas a fio ouvindo só os próprios passos.",
    "A primeira metade atravessa o interior de Portugal e a fronteira galega: as vilas termais de Pedras Salgadas, Vidago e Chaves, a ponte romana sobre o Tâmega, as vinhas de Monterrei e a planície da Limia. Na Galiza, o caminho entra na Reserva da Biosfera de Allariz, chega às termas de Ourense e segue pela Vía da Prata, entre carvalhais, pontes medievais e aldeias de granito, até a catedral de Santiago.",
  ],
  destaques: ["Vilas termais de Pedras Salgadas, Vidago, Chaves e Ourense", ...destaquesBase],
  nivel: "O terreno é, na maior parte, fácil: caminhos rurais, trilhas de terra e estradas secundárias com pouco trânsito. O que pede preparo é a soma dos dias: doze etapas seguidas, com média de 21 km por dia. As mais exigentes são Chaves a Verín (28,4 km, plana mas longa), Verín a Trasmiras (a subida mais forte, até perto dos 850 m), Ourense a Cea e Cea a Lalín (27,9 km, a etapa mais alta da Galiza). Recomendamos experiência em caminhadas de vários dias e calçado já amaciado.",
  inclui: [
    "12 noites em quarto duplo com banheiro privativo, em hotéis, casas rurais e hospedagens com personalidade ao longo do Caminho",
    "Café da manhã diário, do dia 2 ao dia 13",
    "Transporte de bagagem entre as hospedagens (uma mala por pessoa)",
    "Transfers curtos do roteiro: fim da etapa ao centro de Ourense (dia 7) e da Laxe a Lalín (dia 9)",
    "Kit do peregrino: credencial para carimbar ao longo do Caminho e dossiê com mapas, descrição das etapas e tracks de GPS",
    "Suporte por telefone 24 horas, com assistência durante a caminhada",
    "Seguro de caminhada",
  ],
  extras: [
    "Noite extra em Vila Pouca de Aguiar, antes do início",
    "Noites extras em Santiago de Compostela",
    "Transfer do Porto (aeroporto ou cidade) até Vila Pouca de Aguiar",
    "Transfer de Santiago até o aeroporto ou o Porto",
    "Suplemento de quarto individual",
    "Jantares nas hospedagens onde houver",
  ],
  preco: "€ 1.550",
  single: "€ 436",
  grupo: {
    periodo: "Outubro de 2027",
    texto: "A AONIK vai levar este Caminho em grupo guiado, com saída em outubro de 2027. Datas exatas e tarifa do grupo saem em breve: entre na pré-lista e seja o primeiro a saber, com prioridade na reserva.",
  },
  interesse: "PORTUGAL - Caminho Português Interior (Vila Pouca de Aguiar)",
  interesseGrupo: "GRUPOS DE TREKKING - Caminho Português Interior · Outubro 2027",
  galeria: ["capa", "dia-01-2", "dia-02-1", "dia-02-3", "dia-03-1", "dia-03-2", "dia-05-2", "dia-06-2", "dia-07-1", "dia-07-2", "dia-10-1", "dia-12-1", "dia-12-2", "dia-12-3"].map(F),
};

export const CHAVES: ProgramaInterior = {
  ...comum,
  slug: "caminho-interior-chaves",
  nome: "Caminho Português Interior",
  desde: "desde Chaves",
  subtitulo: "Dez etapas a pé de Chaves a Santiago de Compostela, pela fronteira, pelo Castelo de Monterrei, pelos carvalhais de Allariz e pela Vía da Prata, onde o Caminho ainda se faz em silêncio.",
  dias: 11, noites: 10, km: "213,6 km",
  etapas: ETAPAS.slice(2),
  capa: F("dia-02-1"),
  sobre: [
    "O Caminho Português Interior desde Chaves é a forma mais tranquila de chegar a Santiago de Compostela em dez dias de caminhada. Ele parte da cidade termal de Chaves, junto à ponte romana sobre o Tâmega, e chega à Praza do Obradoiro por um caminho longe das multidões.",
    "Logo no primeiro dia você cruza a fronteira e entra na Galiza pelas vinhas de Monterrei. Depois vêm a planície da Limia, a Reserva da Biosfera de Allariz, as termas de Ourense e, daí, a Vía da Prata, entre carvalhais, pontes medievais e aldeias de granito, até a catedral de Santiago.",
  ],
  destaques: ["Termas de Chaves e de Ourense", ...destaquesBase],
  nivel: "O terreno é, na maior parte, fácil: caminhos rurais, trilhas de terra e estradas secundárias com pouco trânsito. O que pede preparo é a soma dos dias: dez etapas seguidas, com média de 21 km por dia. As mais exigentes são logo a primeira, Chaves a Verín (28,4 km, plana mas longa), Verín a Trasmiras (a subida mais forte, até perto dos 850 m), Ourense a Cea e Cea a Lalín (27,9 km, a etapa mais alta da Galiza). Recomendamos experiência em caminhadas de vários dias e calçado já amaciado.",
  inclui: [
    "10 noites em quarto duplo com banheiro privativo, em hotéis, casas rurais e hospedagens com personalidade ao longo do Caminho",
    "Café da manhã diário, do dia 2 ao dia 11",
    "Transporte de bagagem entre as hospedagens (uma mala por pessoa)",
    "Transfers curtos do roteiro: fim da etapa ao centro de Ourense (dia 5) e da Laxe a Lalín (dia 7)",
    "Kit do peregrino: credencial para carimbar ao longo do Caminho e dossiê com mapas, descrição das etapas e tracks de GPS",
    "Suporte por telefone 24 horas, com assistência durante a caminhada",
    "Seguro de caminhada",
  ],
  extras: [
    "Noite extra em Chaves, antes do início",
    "Noites extras em Santiago de Compostela",
    "Transfer do Porto (aeroporto ou cidade) até Chaves",
    "Transfer de Santiago até o aeroporto ou o Porto",
    "Suplemento de quarto individual",
    "Jantares nas hospedagens onde houver",
  ],
  preco: "€ 1.326",
  single: "€ 334",
  interesse: "PORTUGAL - Caminho Português Interior (Chaves)",
  galeria: ["dia-02-1", "dia-02-3", "dia-03-1", "dia-03-2", "dia-04-1", "dia-05-2", "dia-06-2", "dia-07-1", "dia-07-2", "dia-08-1", "dia-10-1", "dia-12-1", "dia-12-2", "dia-12-3"].map(F),
};

export const DISPONIBILIDADE = "O ano todo, exceto nas semanas de Natal e Páscoa e nas duas primeiras semanas de agosto.";
