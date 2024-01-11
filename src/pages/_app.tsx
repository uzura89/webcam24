import { Fragment } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

import GlobalDataFetcher from "@/components/global/GlobalDataFetcher";
import { GlobalModals } from "@/components/global/GlobalModals";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalDataFetcher />
      <Component {...pageProps} />
      <GlobalModals />
    </Fragment>
  );
}
