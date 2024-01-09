import { Inter } from "next/font/google";

import { places } from "../data/places";
import HomeTemplate from "@/components/atomic/templates/home/HomeTemplate";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const randomizedPlaces = places.sort(() => Math.random() - 0.5);
  // const randomizedPlaces = places;

  return <HomeTemplate places={randomizedPlaces} />;
}
