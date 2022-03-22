import { PUISuccess } from "@mojitoinc/mojito-mixers";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { images } from "@constants";
import { REFERENCE_APP_LOGO_SX, REFERENCE_APP_THEME_OPTIONS } from "../../components/payment-ui/theme/paymentModalTheme";

const CreditCardPaymentSuccessPage: React.FC = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
      window.location.replace(pathnameOrUrl);
    } else {
      router.replace(pathnameOrUrl || "/");
    }
  }, [router]);

  return (
    <PUISuccess
      themeOptions={ REFERENCE_APP_THEME_OPTIONS }
      logoSrc={ images.LOGO?.src || "" }
      logoSx={ REFERENCE_APP_LOGO_SX }
      successImageSrc=""
      onRedirect={ handleRedirect } />
  );
}

export default CreditCardPaymentSuccessPage;
