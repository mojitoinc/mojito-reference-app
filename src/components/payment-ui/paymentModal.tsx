import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import {
  PUICheckout,
  PUICheckoutProps,
} from "@mojitoinc/mojito-mixers";
import React, { useCallback } from "react";
import { config } from "@constants";
import { useRouter } from "next/router";
import { REFERENCE_APP_LOGO_SX, REFERENCE_APP_THEME_OPTIONS } from "./theme/paymentModalTheme";
import { images } from "@constants";


export type PaymentModalProps = Pick<
  PUICheckoutProps,
  "open" | "onClose" | "loaderMode" | "paymentErrorParam" | "orgID" | "checkoutItems"
>;

export const PaymentModal: React.FC<PaymentModalProps> = (props) => {
  const {
    isAuthenticated,
    isLoading: isAuthenticatedLoading,
    loginWithRedirect,
  } = useAuth0();

  const router = useRouter();

  const handleLogin = useCallback(() => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  }, [loginWithRedirect, router]);

  const onGoTo = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const onRemoveUrlParams = useCallback((cleanURL: string) => {
    router.replace(cleanURL, undefined, { shallow: true });
  }, [router]);

  const checkoutModalProps: PUICheckoutProps = {
    // ProviderInjector:
    uri: config.MOJITO_API_URL || "",

    // Modal:
    // open,
    // onClose,
    onGoTo,
    goToLabel: "View Profile",

    // Flow:
    // loaderMode,
    // paymentErrorParam,
    onRemoveUrlParams,
    guestCheckoutEnabled: false,
    productConfirmationEnabled: false,
    vertexEnabled: false,
    threeDSEnabled: true,

    // Personalization:
    themeOptions: REFERENCE_APP_THEME_OPTIONS,
    logoSrc: images.LOGO?.src || "",
    logoSx: REFERENCE_APP_LOGO_SX,
    loaderImageSrc: "",
    purchasingImageSrc: "",
    // purchasingMessages,
    successImageSrc: "",
    errorImageSrc: "",
    userFormat: "email",
    acceptedPaymentTypes: ["CreditCard"],
    // acceptedCreditCardNetworks: ["visa", "mastercard"],
    // network,
    // dictionary,

    // Legal:
    consentType: "circle",

    // Data:
    // orgID: profile.userOrgs[0].organizationId || "",
    // invoiceID: "",
    // checkoutItem: {
    //   lotID: "",
    //   lotType: "buyNow",
    //   name: "Bla bla",
    //   description: "Bla bla",
    //   price: 40000,
    //   fee: 400,
    //   imageSrc: "https://media4.giphy.com/media/12r0kgdqCAcdMc/giphy.gif?cid=ecf05e47dufmxmlymwjx4t6yo1yymxdd5pttemprmz1r0632&rid=giphy.gif&ct=g",
    //   imageBackground: "red",
    // },

    // Authentication:
    onLogin: handleLogin,
    isAuthenticated,
    isAuthenticatedLoading,

    // Other Events:
    debug: window.location.hostname === "localhost",
    // onEvent,
    // onError,
    // onCatch,

    // Lot-specific props:
    ...props,
  };

  return <PUICheckout {...checkoutModalProps} />;
};
