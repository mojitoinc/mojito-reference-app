import { useRouter } from "next/router";
import { useCallback } from "react";

import { PUIError, PUIRouterOptions } from "@mojitonft/mojito-mixers";

import {
  REFERENCE_APP_LOGO_SX,
  REFERENCE_APP_THEME_OPTIONS,
} from "@components";
import { config, images } from "@constants";
import { useAuth0 } from "@auth0/auth0-react";

const CreditCardPaymentErrorPage: React.FC = () => {
  const router = useRouter();
  const { getIdTokenClaims } = useAuth0();

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

  return (
    <PUIError
      uri={config.MOJITO_API_URL || ""}
      getAuthenticationToken={getAuthenticationToken}
      themeOptions={REFERENCE_APP_THEME_OPTIONS}
      logoSrc={images.LOGO?.src || ""}
      logoSx={REFERENCE_APP_LOGO_SX}
      errorImageSrc=""
      onGoTo={onGoTo}
    />
  );
};

export default CreditCardPaymentErrorPage;
