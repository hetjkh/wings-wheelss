import localFont from "next/font/local";
import {
  Abril_Fatface, Bebas_Neue, Bodoni_Moda, Cinzel, Cinzel_Decorative, Cormorant_Garamond, DM_Serif_Display, Forum, Fraunces,
  Gloock, Great_Vibes, Instrument_Serif, Italiana, Marcellus, Pinyon_Script, Playfair_Display, Poiret_One, Prata, Syne, Yeseva_One,
} from "next/font/google";

export const casko = localFont({ src: "../../public/fonts/casko-luxury-regular.otf", variable: "--font-casko", display: "block" });

const cinzel = Cinzel({ subsets: ["latin"], weight: "500", display: "swap", preload: false });
const cinzelDeco = Cinzel_Decorative({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "500", display: "swap", preload: false });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: "500", display: "swap", preload: false });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500", display: "swap", preload: false });
const abril = Abril_Fatface({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const italiana = Italiana({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const forum = Forum({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const prata = Prata({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const gloock = Gloock({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const yeseva = Yeseva_One({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], weight: "500", display: "swap", preload: false });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const poiret = Poiret_One({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const syne = Syne({ subsets: ["latin"], weight: "600", display: "swap", preload: false });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap", preload: false });

export type LogoFont = { id: string; label: string; family: string };

export const logoFonts: LogoFont[] = [
  { id: "casko", label: "Casko Luxury", family: casko.style.fontFamily },
  { id: "apris", label: "Apris (site)", family: "var(--font-heading), serif" },
  { id: "cinzel", label: "Cinzel", family: cinzel.style.fontFamily },
  { id: "cinzel-deco", label: "Cinzel Decorative", family: cinzelDeco.style.fontFamily },
  { id: "playfair", label: "Playfair Display", family: playfair.style.fontFamily },
  { id: "bodoni", label: "Bodoni Moda", family: bodoni.style.fontFamily },
  { id: "cormorant", label: "Cormorant Garamond", family: cormorant.style.fontFamily },
  { id: "abril", label: "Abril Fatface", family: abril.style.fontFamily },
  { id: "dm-serif", label: "DM Serif Display", family: dmSerif.style.fontFamily },
  { id: "italiana", label: "Italiana", family: italiana.style.fontFamily },
  { id: "marcellus", label: "Marcellus", family: marcellus.style.fontFamily },
  { id: "forum", label: "Forum", family: forum.style.fontFamily },
  { id: "prata", label: "Prata", family: prata.style.fontFamily },
  { id: "gloock", label: "Gloock", family: gloock.style.fontFamily },
  { id: "yeseva", label: "Yeseva One", family: yeseva.style.fontFamily },
  { id: "fraunces", label: "Fraunces", family: fraunces.style.fontFamily },
  { id: "instrument", label: "Instrument Serif", family: instrument.style.fontFamily },
  { id: "poiret", label: "Poiret One", family: poiret.style.fontFamily },
  { id: "great-vibes", label: "Great Vibes", family: greatVibes.style.fontFamily },
  { id: "pinyon", label: "Pinyon Script", family: pinyon.style.fontFamily },
  { id: "syne", label: "Syne", family: syne.style.fontFamily },
  { id: "bebas", label: "Bebas Neue", family: bebas.style.fontFamily },
];
