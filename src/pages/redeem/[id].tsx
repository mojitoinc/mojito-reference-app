import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RedeemComponent } from "src/components/item/RedeemComponent";

const RedeemPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <RedeemComponent id={id as string}></RedeemComponent>;
};

export default RedeemPage;
