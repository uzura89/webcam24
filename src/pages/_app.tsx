import { Fragment } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

import GlobalDataFetcher from "@/components/global/GlobalDataFetcher";
import { GlobalModals } from "@/components/global/GlobalModals";
import HeadSetter from "@/components/atomic/organisms/HeadSetter";
import { APP_SUBTITLE, APP_TITLE } from "@/cons/brand.cons";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <HeadSetter
        pageTitle={`${APP_TITLE}: ${APP_SUBTITLE}`}
        pageDescription="Randomly connects to interesting live cameras around the world."
        pagePath="/"
      />

      <GlobalDataFetcher />
      <Component {...pageProps} />
      <GlobalModals />
    </Fragment>
  );
}
