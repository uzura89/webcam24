import { places } from "../data/places";
import HomeTemplate from "@/components/atomic/templates/home/HomeTemplate";

export default function Home() {
  const randomizedPlaces = places.sort(() => Math.random() - 0.5);

  return <HomeTemplate places={randomizedPlaces} />;
}
