import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import hasAccessToToken from "src/services/hasAccessToToken";
import convertToToken from "src/services/convertToToken";
import { getRedirect } from "@utils";

interface IProps {
  token: string;
}

const SuccessPage: NextPage<IProps> = ({ token }) => {
  const router = useRouter();

  return <div>You have access to the token: {token}</div>;
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const mojitoId = context.params?.id;

  if (typeof mojitoId !== "string") {
    return getRedirect();
  }

  const token = convertToToken(mojitoId);

  if (hasAccessToToken(token)) {
    return getRedirect("purchase", mojitoId);
  } else {
    return {
      props: { token },
    };
  }
};

export { getServerSideProps };
export default SuccessPage;
