import { useEnvStore } from "@/store/envStore";
import { useEffect } from "react";

export default function GlobalDataFetcher() {
  const { fetchMapboxKey } = useEnvStore();

  useEffect(() => {
    fetchMapboxKey();
  }, [fetch]);

  return null;
}
