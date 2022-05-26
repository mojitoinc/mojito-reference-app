import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React, { ErrorInfo, useCallback } from "react";

import {
  PUICheckoutComponentProps,
  CheckoutEventData,
  CheckoutEventType,
  CheckoutModalError,
  PUICheckout,
  PUICheckoutProps,
  THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY,
  THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY,
  PUIRouterOptions,
} from "@mojitonft/mojito-mixers";

import { config, images } from "@constants";
import {
  REFERENCE_APP_LOGO_SX,
  REFERENCE_APP_THEME_OPTIONS,
} from "./theme/paymentModalTheme";

export const CheckoutComponent: React.FC<PUICheckoutComponentProps> = (
  checkoutComponentProps
) => {
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuthenticatedLoading,
    getIdTokenClaims,
  } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    return token?.__raw || "";
  }, [getIdTokenClaims]);

  const onGoTo = useCallback((pathnameOrUrl: string, { replace, reason, ...options }: PUIRouterOptions = {}) => {
    if (pathnameOrUrl.startsWith("http")) {
      if (replace) {
        console.log(`Replace URL with ${ pathnameOrUrl }`, reason);
        window.location.replace(pathnameOrUrl);
      } else {
        console.log(`Push URL ${ pathnameOrUrl }`, reason);
        window.location.href = pathnameOrUrl;
      }
    } else if (replace) {
      console.log(`Replace route with ${ pathnameOrUrl }`, reason);
      router.replace(pathnameOrUrl || "/", undefined, options);
    } else {
      console.log(`Push route ${ pathnameOrUrl }`, reason);
      router.push(pathnameOrUrl || "/", undefined, options);
    }
  }, [router]);

  const handleLogin = useCallback(async () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  }, [loginWithRedirect, router]);

  const handleEvent = useCallback(
    (eventType: CheckoutEventType, eventData: CheckoutEventData) => {
      // console.log(`🎯 ${ eventType }`, eventData);
    },
    []
  );

  const handleError = useCallback((error: CheckoutModalError) => {
    // console.log(error);
  }, []);

  const handleCatch = useCallback(
    (error: Error, errorInfo?: ErrorInfo): void | true => {
      // console.log(error, errorInfo);

      return true;
    },
    []
  );

  const checkoutProps: PUICheckoutProps = {
    ...checkoutComponentProps,

    // ProviderInjector:
    uri: config.MOJITO_API_URL || "",
    getAuthenticationToken,

    // Modal:
    // open,
    // onClose,
    onGoTo,

    // Flow:
    // loaderMode,
    paymentIdParam,
    paymentErrorParam,
    guestCheckoutEnabled: false,
    productConfirmationEnabled: false,
    vertexEnabled: false,
    threeDSEnabled: true,

    // Theming:
    // theme,
    themeOptions: REFERENCE_APP_THEME_OPTIONS,

    // Personalization:
    logoSrc: images.LOGO?.src || "",
    logoSx: REFERENCE_APP_LOGO_SX,
    // loaderImageSrc,
    // purchasingImageSrc,
    // purchasingMessages,
    // successImageSrc,
    // errorImageSrc,
    userFormat: "email",
    acceptedPaymentTypes: ["CreditCard"],
    acceptedCreditCardNetworks: ["visa", "mastercard"],
    // network,
    // paymentLimits,
    dictionary: {
      goToHref: "/profile",
      goToLabel: "View Profile",
    },

    // Legal:
    consentType: "circle",

    // Data:
    orgID: checkoutComponentProps.orgID || "",
    // invoiceID,
    checkoutItems: checkoutComponentProps.checkoutItems || [],

    // Authentication:
    onLogin: handleLogin,
    isAuthenticated,
    isAuthenticatedLoading,

    // Other Events:
    debug: true,
    onEvent: handleEvent,
    onError: handleError,
    onCatch: handleCatch,
  };

  return <PUICheckout {...checkoutProps} />;
};
