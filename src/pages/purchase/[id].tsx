import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UnsuccessfulPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    /*
     * Redirect to the purchase page if the id is valid.
     * TODO:
     * - Token validation
     * - Some url modification maybe
     * - Redirect to other platform to purchase the id
     */
    router.push("https://metaverse.sothebys.com/lfc");
  }, [router]);

  return <div>Redirect user to the purchase page for this id: {id}</div>;
};

export default UnsuccessfulPage;
