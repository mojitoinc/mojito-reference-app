import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import hasAccessToToken from "src/services/hasAccessToToken";
import convertToToken from "src/services/convertToToken";
import { getRedirect } from "@utils";
import { MockCMSService } from "@state";
import { useMemo } from "react";
import { AuctionDetail, BuyNowDetail, TokenDetail } from "@components";

interface IProps {
  token: string;
}

const SuccessPage: NextPage<IProps> = ({ token }) => {
  const router = useRouter();
  const cms = useMemo(() => {
    return new MockCMSService();
  }, []);

  const mojitoId = router.query.id as string;

  const cmsData = useMemo(() => {
    return cms.getData(mojitoId);
  }, [cms, mojitoId]);

  return <TokenDetail cmsData={cmsData}></TokenDetail>;
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const mojitoId = context.params?.id;

  if (typeof mojitoId !== "string") {
    return getRedirect();
  }

  const token = convertToToken(mojitoId);

  return hasAccessToToken(token)
    ? {
        props: { token },
      }
    : getRedirect("purchase", mojitoId);
};

export { getServerSideProps };
export default SuccessPage;
