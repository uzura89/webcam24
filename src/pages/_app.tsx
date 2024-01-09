import GlobalDataFetcher from "@/components/global/GlobalDataFetcher";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalDataFetcher />
      <Component {...pageProps} />
    </Fragment>
  );
}
