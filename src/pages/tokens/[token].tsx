import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import hasAccessToToken from "src/services/hasAccessToToken";

const SuccessPage: NextPage = () => {
  const router = useRouter();

  const { token } = router.query;

  return <div>You have access to the token: {token}</div>;
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const redirectToPurchase = (token?: string) => {
    return {
      redirect: {
        destination: token ? `/purchase/${token}` : "",
        permanent: false,
      },
    };
  };

  const token = context.params?.token;

  if (typeof token !== "string") {
    return redirectToPurchase();
  }

  const hasAccess = hasAccessToToken(token);
  if (hasAccess) {
    return {
      props: {},
    };
  } else {
    return redirectToPurchase(token);
  }
};

export { getServerSideProps };
export default SuccessPage;
