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
      <AuthProvider>
        <MojitoApiProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} theme={theme} />
            <Footer />
          </ThemeProvider>
        </MojitoApiProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
