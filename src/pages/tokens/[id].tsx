import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import hasAccessToToken from "src/services/hasAccessToToken";

const SuccessPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  return <div>You have access to the token: {id}</div>;
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const redirectToPurchase = (id?: string) => {
    return {
      redirect: {
        destination: id ? `/purchase/${id}` : "",
        permanent: false,
      },
    };
  };

  const id = context.params?.id;

  if (typeof id !== "string") {
    return redirectToPurchase();
  }

  const hasAccess = hasAccessToToken(id);
  if (hasAccess) {
    return {
      props: {},
    };
  } else {
    return redirectToPurchase(id);
  }
};

export { getServerSideProps };
export default SuccessPage;
