import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { StyledEngineProvider } from '@mui/material/styles';
import { Header, Footer } from "@components";
import { images, strings } from "@constants";
import { AuthProvider, MojitoApiProvider } from "@state";
import { GlobalStyles } from "@theme/GlobalStyles";
import { theme } from "@theme/theme";
import  { Layout } from "../components/shared";

function MyApp({ Component, pageProps }: AppProps) :JSX.Element{

  return (
    <>
      <Head>
        <title>{strings.SITE_TITLE}</title>
        <link rel="icon" href={images.FAVICON} />
      </Head>
      <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>

        <AuthProvider>
          <MojitoApiProvider>
            <Layout >
              <GlobalStyles />
              <Header />
              <Component {...pageProps} />
              <Footer />
            </Layout>
          </MojitoApiProvider>
          </AuthProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
