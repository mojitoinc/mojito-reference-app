import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY } from "@mojitonft/mojito-mixers";
import { CheckoutComponent } from "@components";

const CreditCardPaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIdParam = params.get(THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY) || "";

    setPaymentId(paymentIdParam);
  }, []);

  useEffect(() => {
    if (paymentId === "") router.replace("/");
  }, [paymentId, router]);

  return paymentId ? (
    <CheckoutComponent
      loaderMode="success"
      open
      paymentIdParam={ paymentId } />
  ) : null;
};

export default CreditCardPaymentSuccessPage;
