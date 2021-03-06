import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import hasAccessToToken from "src/services/hasAccessToToken";
import convertToToken from "src/services/convertToToken";
import { getRedirect } from "@utils";

interface IProps {
  token: string;
}

const UnsuccessfulPage: NextPage<IProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    /*
     * Redirect to the purchase page if the id is valid.
     * TODO:
     * - Some url modification maybe
     * - Redirect to other platform to purchase the token
     */
    console.log("has access to token");
    router.push("https://metaverse.sothebys.com/lfc");
  }, [router]);

  return <div>{"You'll be redirected to the purchase page..."}</div>;
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const mojitoId = context.params?.id;

  if (typeof mojitoId !== "string") {
    return getRedirect();
  }

  const token = convertToToken(mojitoId);

  return hasAccessToToken(token)
    ? getRedirect("tokens", mojitoId)
    : {
        props: { token },
      };
};

export { getServerSideProps };
export default UnsuccessfulPage;
