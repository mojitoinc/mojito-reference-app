import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";

import { Header, Footer } from "@components";
import { images, strings } from "@constants";
import { AuthProvider, MojitoApiProvider } from "@state";
import { GlobalStyles } from "@theme/GlobalStyles";
import { theme } from "@theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{strings.SITE_TITLE}</title>
        <link rel="icon" href={images.FAVICON} />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MojitoApiProvider>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </MojitoApiProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
