import type { NextPage } from "next";
import { useRouter } from "next/router";

const UnsuccessfulPage: NextPage = () => {
  const router = useRouter();

  const { token } = router.query;

  return <div>Redirect user to the purchase page for this token: {token}</div>;
};

export default UnsuccessfulPage;