import { APP_TITLE } from "@/cons/brand.cons";
import Head from "next/head";

interface Props {
  pageTitle: string;
  pageDescription: string;
  pagePath: string;
  pageImg?: string;
  siteName?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
}

export default function HeadSetter({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  siteName,
  pageImgWidth,
  pageImgHeight,
}: Props) {
  const _siteName = siteName || APP_TITLE;

  const imgWidth = pageImgWidth ? pageImgWidth : 1280;
  const imgHeight = pageImgHeight ? pageImgHeight : 640;
  const _pageImage = pageImg;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
      />
      <meta name="description" content={pageDescription} />
      <meta property="og:url" content={pagePath} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={_siteName} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={_pageImage} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="canonical" href={pagePath} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={pagePath} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={_pageImage} />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/img/favicon/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/img/favicon/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/img/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/img/favicon/favicon-16x16.png"
      />

      {/* For PWA */}
      <link rel="manifest" href="/manifest.json" />

      {/* HotJar */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3823461,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
        }}
      />
    </Head>
  );
}
