import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React, { ErrorInfo, useCallback } from "react";

import {
  CheckoutComponentWithRequiredProps,
  CheckoutEventData,
  CheckoutEventType,
  CheckoutModalError,
  PUICheckout,
  PUICheckoutProps,
} from "@mojitoinc/mojito-mixers";

import { config, images } from "@constants";
import {
  REFERENCE_APP_LOGO_SX,
  REFERENCE_APP_THEME_OPTIONS,
} from "./theme/paymentModalTheme";

export const CheckoutComponent: React.FC<CheckoutComponentWithRequiredProps> = (
  checkoutComponentProps
) => {
  const router = useRouter();

  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuthenticatedLoading,
  } = useAuth0();

  const onGoTo = useCallback(() => {
    router.push("/profile/invoices");
  }, [router]);

  const onRemoveUrlParams = useCallback(
    (cleanURL: string) => {
      router.replace(cleanURL, undefined, { shallow: true });
    },
    [router]
  );

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

    // Modal:
    // open,
    // onClose,
    onGoTo,
    goToHref: "/profile",
    goToLabel: "View Profile",

    // Flow:
    // loaderMode,
    // paymentErrorParam,
    onRemoveUrlParams,
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
    // dictionary,

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
