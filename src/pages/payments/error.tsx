import { useRouter } from "next/router";
import { useCallback } from "react";

import { PUIError } from "@mojitonft/mojito-mixers";

import {
  REFERENCE_APP_LOGO_SX,
  REFERENCE_APP_THEME_OPTIONS,
} from "@components";
import { config, images } from "@constants";

const CreditCardPaymentErrorPage: React.FC = () => {
  const router = useRouter();

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
      themeOptions={REFERENCE_APP_THEME_OPTIONS}
      logoSrc={images.LOGO?.src || ""}
      logoSx={REFERENCE_APP_LOGO_SX}
      errorImageSrc=""
      onRedirect={handleRedirect}
    />
  );
};

export default CreditCardPaymentErrorPage;
