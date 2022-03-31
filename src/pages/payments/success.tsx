import { useRouter } from "next/router";
import { useCallback } from "react";

import { PUISuccess } from "@mojitoinc/mojito-mixers";

import {
  REFERENCE_APP_LOGO_SX,
  REFERENCE_APP_THEME_OPTIONS,
} from "@components";
import { images } from "@constants";

const CreditCardPaymentSuccessPage: React.FC = () => {
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
    <PUISuccess
      themeOptions={REFERENCE_APP_THEME_OPTIONS}
      logoSrc={images.LOGO?.src || ""}
      logoSx={REFERENCE_APP_LOGO_SX}
      successImageSrc=""
      onRedirect={handleRedirect}
    />
  );
};

export default CreditCardPaymentSuccessPage;
