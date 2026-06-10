"use client";
import { motion } from "framer-motion";

// Equirectangular projection: 1000×500 viewBox
const mx = (lng: number) => ((lng + 180) / 360) * 1000;
const my = (lat: number) => ((90 - lat) / 180) * 500;

// Improved continent paths — more key points for smoother appearance
const LAND: string[] = [
  // North America
  [
    `M${mx(-89)},${my(16)}`,
    `L${mx(-83)},${my(10)}`, // Central America
    `L${mx(-77)},${my(8)}`,  // Panama
    `L${mx(-81)},${my(25)}`, // Florida
    `L${mx(-80)},${my(32)}`, // Georgia coast
    `L${mx(-76)},${my(35)}`, // Cape Hatteras
    `L${mx(-74)},${my(41)}`, // NYC
    `L${mx(-70)},${my(42)}`, // Cape Cod
    `L${mx(-60)},${my(44)}`, // Nova Scotia
    `L${mx(-53)},${my(47)}`, // Newfoundland
    `L${mx(-53)},${my(56)}`, // Labrador
    `L${mx(-79)},${my(63)}`, // Hudson Bay west
    `L${mx(-95)},${my(63)}`,
    `L${mx(-120)},${my(61)}`, // Alaska panhandle start
    `L${mx(-140)},${my(60)}`,
    `L${mx(-168)},${my(60)}`, // Alaska tip
    `L${mx(-152)},${my(58)}`, // Kodiak area
    `L${mx(-134)},${my(57)}`, // SE Alaska
    `L${mx(-124)},${my(49)}`, // Vancouver
    `L${mx(-122)},${my(38)}`, // SF
    `L${mx(-117)},${my(32)}`, // San Diego
    `L${mx(-110)},${my(23)}`, // Baja tip
    `L${mx(-105)},${my(20)}`, // Mexico coast
    `L${mx(-90)},${my(16)}`,  // Yucatan west
    "Z",
  ].join(""),

  // Greenland
  [
    `M${mx(-45)},${my(60)}`,
    `L${mx(-55)},${my(70)}`,
    `L${mx(-73)},${my(77)}`,
    `L${mx(-40)},${my(83)}`,
    `L${mx(-20)},${my(82)}`,
    `L${mx(-24)},${my(64)}`,
    "Z",
  ].join(""),

  // South America — with Brazil bump
  [
    `M${mx(-79)},${my(10)}`,  // Colombia/Ecuador border
    `L${mx(-75)},${my(11)}`,  // Venezuela west
    `L${mx(-67)},${my(11)}`,  // Caracas
    `L${mx(-62)},${my(11)}`,
    `L${mx(-60)},${my(8)}`,   // Trinidad area
    `L${mx(-50)},${my(2)}`,   // Amapá
    `L${mx(-38)},${my(-4)}`,  // Fortaleza — easternmost Brazil
    `L${mx(-35)},${my(-8)}`,  // Recife (Brazil's tip)
    `L${mx(-39)},${my(-13)}`, // Salvador
    `L${mx(-40)},${my(-20)}`, // Vitória
    `L${mx(-43)},${my(-23)}`, // Rio de Janeiro
    `L${mx(-46)},${my(-24)}`, // São Paulo coast
    `L${mx(-49)},${my(-28)}`, // Florianópolis
    `L${mx(-51)},${my(-31)}`, // Porto Alegre
    `L${mx(-53)},${my(-33)}`, // Chuy
    `L${mx(-56)},${my(-35)}`, // Montevideo
    `L${mx(-58)},${my(-34)}`, // Buenos Aires
    `L${mx(-63)},${my(-38)}`, // Mar del Plata area
    `L${mx(-65)},${my(-43)}`, // Peninsula Valdés
    `L${mx(-66)},${my(-48)}`, // Comodoro
    `L${mx(-68)},${my(-54)}`, // Río Gallegos
    `L${mx(-68)},${my(-55)}`, // Cape Horn
    `L${mx(-72)},${my(-52)}`, // Puerto Natales
    `L${mx(-75)},${my(-42)}`, // Puerto Montt area
    `L${mx(-74)},${my(-37)}`, // Concepción
    `L${mx(-71)},${my(-33)}`, // Valparaíso
    `L${mx(-70)},${my(-23)}`, // Antofagasta
    `L${mx(-70)},${my(-18)}`, // Arica
    `L${mx(-75)},${my(-10)}`, // Lima
    `L${mx(-77)},${my(-1)}`,  // Ecuador coast
    `L${mx(-79)},${my(5)}`,   // Colombia coast
    `L${mx(-79)},${my(10)}`,
    "Z",
  ].join(""),

  // Europe — more detailed
  [
    `M${mx(-9)},${my(37)}`,   // Portugal SW
    `L${mx(-9)},${my(42)}`,   // Portugal north
    `L${mx(-8)},${my(44)}`,   // Galicia/Spain NW
    `L${mx(-3)},${my(44)}`,   // Cantabrian coast
    `L${mx(-2)},${my(44)}`,   // Basque
    `L${mx(1)},${my(43)}`,    // Pyrenees/Med
    `L${mx(3)},${my(43)}`,    // Marseille area
    `L${mx(5)},${my(44)}`,    // Rhône delta
    `L${mx(7)},${my(44)}`,    // Genoa/Liguria
    `L${mx(12)},${my(44)}`,   // Italy NE/Adriatic
    `L${mx(15)},${my(38)}`,   // Italy bottom
    `L${mx(16)},${my(38)}`,   // Calabria
    `L${mx(18)},${my(40)}`,   // Heel of Italy
    `L${mx(20)},${my(39)}`,   // Greece/Albania
    `L${mx(22)},${my(37)}`,   // Greece south
    `L${mx(26)},${my(38)}`,   // Aegean/Turkey west
    `L${mx(28)},${my(41)}`,   // Istanbul
    `L${mx(30)},${my(43)}`,   // Romania/Black Sea
    `L${mx(30)},${my(47)}`,   // Moldova
    `L${mx(27)},${my(47)}`,   // Ukraine
    `L${mx(24)},${my(54)}`,   // Poland/Kaliningrad
    `L${mx(18)},${my(55)}`,   // Germany coast
    `L${mx(10)},${my(57)}`,   // Denmark/Jutland
    `L${mx(8)},${my(58)}`,    // Norway south
    `L${mx(5)},${my(59)}`,    // Bergen
    `L${mx(0)},${my(62)}`,    // Norway mid
    `L${mx(10)},${my(63)}`,   // Trondheim
    `L${mx(14)},${my(66)}`,   // Norway arctic
    `L${mx(25)},${my(71)}`,   // Nordkapp
    `L${mx(30)},${my(70)}`,   // North Finland
    `L${mx(30)},${my(60)}`,   // St. Petersburg area
    `L${mx(27)},${my(59)}`,   // Estonia/Latvia
    `L${mx(22)},${my(57)}`,   // Lithuania
    `L${mx(21)},${my(54)}`,   // Gdansk
    `L${mx(-5)},${my(48)}`,   // Brittany
    `L${mx(-5)},${my(50)}`,   // UK SW Cornwall
    `L${mx(-3)},${my(58)}`,   // Scotland
    `L${mx(-4)},${my(58)}`,   // Scotland NW
    `L${mx(-7)},${my(55)}`,   // Ireland north
    `L${mx(-10)},${my(51)}`,  // Ireland SW
    `L${mx(-6)},${my(50)}`,   // Cornwall back
    `L${mx(-5)},${my(48)}`,   // Brittany
    `L${mx(-4)},${my(46)}`,   // France west
    `L${mx(-2)},${my(44)}`,   // Basque
    `L${mx(-7)},${my(42)}`,   // NW Spain
    `L${mx(-9)},${my(39)}`,   // Portugal middle
    `L${mx(-9)},${my(37)}`,   // Portugal SW
    "Z",
  ].join(""),

  // Africa — improved with Gulf of Guinea dip
  [
    `M${mx(-6)},${my(36)}`,   // Morocco
    `L${mx(-2)},${my(35)}`,   // NW Algeria
    `L${mx(10)},${my(37)}`,   // Tunisia
    `L${mx(15)},${my(33)}`,   // Libya NW
    `L${mx(25)},${my(31)}`,   // Libya/Egypt
    `L${mx(32)},${my(31)}`,   // Egypt west
    `L${mx(35)},${my(29)}`,   // Sinai/Red Sea
    `L${mx(43)},${my(12)}`,   // Djibouti
    `L${mx(51)},${my(11)}`,   // Somalia Horn
    `L${mx(45)},${my(2)}`,    // Mogadishu
    `L${mx(41)},${my(-2)}`,   // Kenya coast
    `L${mx(40)},${my(-11)}`,  // Tanzania
    `L${mx(35)},${my(-24)}`,  // Mozambique middle
    `L${mx(32)},${my(-26)}`,  // Mozambique south
    `L${mx(26)},${my(-34)}`,  // South Africa east
    `L${mx(18)},${my(-35)}`,  // South Africa tip (Cape)
    `L${mx(16)},${my(-29)}`,  // Namibia south
    `L${mx(11)},${my(-17)}`,  // Angola south
    `L${mx(12)},${my(-5)}`,   // Congo mouth
    `L${mx(9)},${my(4)}`,     // Cameroon
    `L${mx(2)},${my(6)}`,     // Gulf of Guinea — Nigeria/Benin
    `L${mx(-3)},${my(5)}`,    // Ghana/Ivory Coast
    `L${mx(-8)},${my(5)}`,    // Liberia
    `L${mx(-15)},${my(10)}`,  // Guinea
    `L${mx(-17)},${my(15)}`,  // Senegal/Dakar
    `L${mx(-17)},${my(21)}`,  // Western Sahara
    `L${mx(-13)},${my(28)}`,  // Morocco south
    `L${mx(-6)},${my(36)}`,   // Morocco
    "Z",
  ].join(""),

  // Asia — Middle East through East Asia
  [
    `M${mx(36)},${my(37)}`,   // Turkey NE / Caucasus
    `L${mx(42)},${my(41)}`,   // Georgia
    `L${mx(50)},${my(43)}`,   // Caspian
    `L${mx(60)},${my(55)}`,   // Kazakhstan
    `L${mx(75)},${my(55)}`,   // Central Asia
    `L${mx(85)},${my(55)}`,
    `L${mx(105)},${my(73)}`,  // Siberia
    `L${mx(130)},${my(70)}`,  // Siberia East
    `L${mx(143)},${my(48)}`,  // Sakhalin area
    `L${mx(141)},${my(43)}`,  // Japan mainland (Korea Strait)
    `L${mx(129)},${my(35)}`,  // Korea south
    `L${mx(122)},${my(24)}`,  // China SE coast / Taiwan
    `L${mx(115)},${my(22)}`,  // Guangdong
    `L${mx(110)},${my(18)}`,  // Hainan
    `L${mx(109)},${my(11)}`,  // Vietnam south
    `L${mx(104)},${my(1)}`,   // Singapore
    `L${mx(103)},${my(1)}`,
    `L${mx(100)},${my(4)}`,   // Malaysia west
    `L${mx(98)},${my(8)}`,    // Thailand/Myanmar coast
    `L${mx(96)},${my(16)}`,   // Myanmar
    `L${mx(94)},${my(22)}`,   // Myanmar north
    `L${mx(88)},${my(22)}`,   // Bangladesh/Ganges delta
    `L${mx(80)},${my(8)}`,    // India tip
    `L${mx(76)},${my(8)}`,    // Kerala
    `L${mx(72)},${my(22)}`,   // Mumbai
    `L${mx(68)},${my(22)}`,   // India NW
    `L${mx(64)},${my(25)}`,   // Pakistan
    `L${mx(60)},${my(22)}`,   // Oman coast
    `L${mx(58)},${my(22)}`,
    `L${mx(56)},${my(24)}`,
    `L${mx(51)},${my(24)}`,   // UAE
    `L${mx(43)},${my(12)}`,   // Yemen
    `L${mx(43)},${my(17)}`,   // Red Sea west
    `L${mx(37)},${my(22)}`,   // Saudi W coast
    `L${mx(32)},${my(29)}`,   // Suez / Sinai
    `L${mx(35)},${my(36)}`,   // Turkey south coast
    `L${mx(36)},${my(37)}`,
    "Z",
  ].join(""),

  // Australia
  [
    `M${mx(114)},${my(-22)}`, // NW Pilbara
    `L${mx(122)},${my(-18)}`, // Broome
    `L${mx(128)},${my(-15)}`, // Darwin area east
    `L${mx(130)},${my(-12)}`, // Darwin
    `L${mx(136)},${my(-12)}`, // Arnhem Land
    `L${mx(140)},${my(-14)}`,
    `L${mx(144)},${my(-11)}`, // Cape York N
    `L${mx(146)},${my(-18)}`, // Townsville
    `L${mx(153)},${my(-27)}`, // Brisbane / Gold Coast
    `L${mx(151)},${my(-34)}`, // Sydney
    `L${mx(150)},${my(-37)}`, // Gippsland
    `L${mx(145)},${my(-38)}`, // Melbourne
    `L${mx(139)},${my(-37)}`, // SA/Vic border
    `L${mx(137)},${my(-35)}`, // Adelaide
    `L${mx(131)},${my(-32)}`, // Nullarbor
    `L${mx(121)},${my(-34)}`, // Perth south
    `L${mx(114)},${my(-30)}`, // Perth north
    `L${mx(113)},${my(-26)}`, // Shark Bay
    `L${mx(114)},${my(-22)}`,
    "Z",
  ].join(""),
];

const GRID_LNG = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
const GRID_LAT = [-60, -30, 0, 30, 60];

export interface MapPin {
  label: string;
  sub: string;
  lng: number;
  lat: number;
  anchor?: "start" | "middle" | "end";
}

interface WorldMapProps {
  pins?: MapPin[];
  gold?: string;
  theme?: "dark" | "light";
}

const DEFAULT_PINS: MapPin[] = [
  { label: "Tour du Mont Blanc", sub: "Alpes · 3 países", lng: 6.9, lat: 45.9, anchor: "middle" },
  { label: "Patagônia", sub: "Rio Serrano · Skorpios", lng: -72, lat: -51, anchor: "start" },
  { label: "Jaci's Lodges", sub: "Madikwe · África do Sul", lng: 26.3, lat: -24.8, anchor: "start" },
];

export default function WorldMap({ pins = DEFAULT_PINS, gold = "#c9a86a", theme = "dark" }: WorldMapProps) {
  const isLight = theme === "light";
  const landFill   = isLight ? "rgba(39,104,75,0.06)"  : "rgba(201,168,106,0.07)";
  const landStroke = isLight ? "rgba(39,104,75,0.22)"  : "rgba(201,168,106,0.24)";
  const gridColor  = isLight ? "rgba(39,104,75,0.07)"  : "rgba(201,168,106,0.07)";
  const equatorColor = isLight ? "rgba(39,104,75,0.18)" : "rgba(201,168,106,0.18)";
  const dotCenter  = isLight ? "#f5f1e8" : "#17150f";

  return (
    <div className="relative w-full select-none overflow-hidden" aria-hidden>
      <svg viewBox="0 0 1000 500" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Latitude/longitude grid */}
        {GRID_LNG.map((lng) => (
          <line
            key={lng}
            x1={mx(lng)} y1={0} x2={mx(lng)} y2={500}
            stroke={gridColor} strokeWidth="0.5"
          />
        ))}
        {GRID_LAT.map((lat) => (
          <line
            key={lat}
            x1={0} y1={my(lat)} x2={1000} y2={my(lat)}
            stroke={lat === 0 ? equatorColor : gridColor}
            strokeWidth={lat === 0 ? "0.9" : "0.5"}
            strokeDasharray={lat === 0 ? "5,4" : undefined}
          />
        ))}

        {/* Continents */}
        {LAND.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={landFill}
            stroke={landStroke}
            strokeWidth="0.75"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {/* Pins */}
        {pins.map((pin, i) => {
          const px = mx(pin.lng);
          const py = my(pin.lat);
          const anchor = pin.anchor ?? "middle";
          const dir = anchor === "start" ? 1 : anchor === "end" ? -1 : 0;

          // L-shaped connector geometry
          const diagEndX = anchor === "middle" ? px : px + dir * 24;
          const diagEndY = anchor === "middle" ? py - 26 : py - 17;
          const horizEndX = anchor === "middle" ? px : px + dir * 38;
          const horizEndY = diagEndY;
          const labelX   = anchor === "middle" ? px : px + dir * 42;
          const labelY   = anchor === "middle" ? py - 33 : diagEndY - 7;
          const subY     = anchor === "middle" ? py - 22 : diagEndY + 4;

          // Halo color for label readability on any background
          const halo = isLight ? "rgba(245,241,232,0.95)" : "rgba(23,21,15,0.9)";

          return (
            <g key={`${pin.label}-${i}`}>
              {/* Animated pulse ring */}
              <motion.circle
                cx={px} cy={py}
                fill="none"
                stroke={gold}
                strokeWidth="0.7"
                initial={{ r: 5, opacity: 0.8 }}
                animate={{ r: 20, opacity: 0 }}
                transition={{
                  duration: 3,
                  delay: i * 0.8,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeOut",
                }}
              />
              {/* Static halo */}
              <circle cx={px} cy={py} r={5.5} fill={gold} opacity={0.1} />
              {/* Pin dot */}
              <circle cx={px} cy={py} r={3.5} fill={gold} />
              <circle cx={px} cy={py} r={1.4} fill={dotCenter} />

              {/* L-shaped connector */}
              {anchor === "middle" ? (
                <line
                  x1={px} y1={py - 4}
                  x2={px} y2={py - 26}
                  stroke={gold} strokeWidth="0.7" opacity={0.5}
                />
              ) : (
                <>
                  <line
                    x1={px + dir * 4} y1={py}
                    x2={diagEndX} y2={diagEndY}
                    stroke={gold} strokeWidth="0.7" opacity={0.5}
                  />
                  <line
                    x1={diagEndX} y1={horizEndY}
                    x2={horizEndX} y2={horizEndY}
                    stroke={gold} strokeWidth="0.7" opacity={0.5}
                  />
                </>
              )}

              {/* Label — stroke halo keeps text readable on any bg */}
              <text
                x={labelX}
                y={labelY}
                textAnchor={anchor}
                fill={gold}
                fontSize="9"
                fontFamily="'Fraunces', Georgia, serif"
                fontWeight="300"
                letterSpacing="0.04em"
                stroke={halo}
                strokeWidth="5"
                paintOrder="stroke"
              >
                {pin.label}
              </text>
              <text
                x={labelX}
                y={subY}
                textAnchor={anchor}
                fill={gold}
                fontSize="6"
                fontFamily="'Inter', sans-serif"
                fontWeight="400"
                letterSpacing="0.12em"
                opacity={0.6}
                stroke={halo}
                strokeWidth="4"
                paintOrder="stroke"
              >
                {pin.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
