import { useRouter } from "next/router";
import { useCallback } from "react";

import { PUIError } from "@mojitonft/mojito-mixers";

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

  const handleRedirect = useCallback(
    (pathnameOrUrl: string) => {
      if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
        window.location.replace(pathnameOrUrl);
      } else {
        router.replace(pathnameOrUrl || "/");
      }
    },
    [router]
  );

  return (
    <PUIError
      uri={config.MOJITO_API_URL || ""}
      getAuthenticationToken={getAuthenticationToken}
      themeOptions={REFERENCE_APP_THEME_OPTIONS}
      logoSrc={images.LOGO?.src || ""}
      logoSx={REFERENCE_APP_LOGO_SX}
      errorImageSrc=""
      onRedirect={handleRedirect}
    />
  );
};

export default CreditCardPaymentErrorPage;
