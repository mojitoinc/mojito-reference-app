import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { StyledEngineProvider } from '@mui/material/styles';

import {
  CheckoutOverlayProvider,
  THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY,
  THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY,
} from "@mojitoinc/mojito-mixers";

import { Header, Footer, CheckoutComponent } from "@components";
import { images, strings } from "@constants";
import { AuthProvider, MojitoApiProvider } from "@state";
import { GlobalStyles } from "@theme/GlobalStyles";
import { theme } from "@theme/theme";
import  { Layout } from "../components/shared";

function MyApp({ Component, pageProps }: AppProps) :JSX.Element{
  const router = useRouter();
  const paymentIdParam =
    router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam =
    router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  // Add any other pages where you don't want the Payment UI to be rendered:
  const doNotRenderPaymentUI = [
    "/payments/success",
    "/payments/error",
    "/payments/failure",
  ].includes(router.pathname);

  // Debug information in case you need it:
  // console.log({ pathname: router.asPath, paymentIdParam, paymentErrorParam, doNotRenderPaymentUI });

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
            <CheckoutOverlayProvider
              paymentIdParam={paymentIdParam}
              paymentErrorParam={paymentErrorParam}
              checkoutComponent={CheckoutComponent}
              doNotRenderPaymentUI={doNotRenderPaymentUI}
            >
             <Layout >
                <GlobalStyles />
                <Header />
                <Component {...pageProps} />
                <Footer />
              </Layout>
            </CheckoutOverlayProvider>
          </MojitoApiProvider>
          </AuthProvider>
          </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
