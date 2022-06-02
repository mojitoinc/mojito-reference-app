import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RedeemComponent } from "src/components/item/RedeemComponent";

const RedeemPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const walletAddr = "0x4C3485B53F19A6eC6eB865CF2DF9F3B5792Af64b";

  return (
    <RedeemComponent
      id={id as string}
      walletAddr={walletAddr}
    ></RedeemComponent>
  );
};

export default RedeemPage;
