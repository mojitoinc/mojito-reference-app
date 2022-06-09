import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { AuctionDetail, BuyNowDetail } from "@components";
import { config, strings } from "@constants";
import { useCollectionItemBySlugQuery } from "@services";
import { MockCMSService } from "@state";

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const cms = useMemo(() => {
    return new MockCMSService();
  }, []);

  // TODO(dankins): this is not ideal, we should have a query to get a collection item by collection+item slug
  const {
    data: collectionData,
    error,
    loading,
  } = useCollectionItemBySlugQuery({
    variables: {
      marketplaceID: config.MARKETPLACE_ID,
      collectionSlug: config.COLLECTION_SLUG,
      filter: {},
    },
  });
  // so this is a hack to find the correct collection item until the query is available
  const data = useMemo(() => {
    if (collectionData && collectionData.collectionBySlug) {
      const item = collectionData.collectionBySlug.items?.find(
        (i) => i.slug === router.query["slug"]
      );

      return item;
    }
  }, [collectionData, router.query]);

  const cmsData = useMemo(() => {
    if (data) {
      return cms.getData(data.id);
    }
  }, [cms, data]);

  if (loading) {
    return <></>;
  }

  if (data?.details.__typename === "MarketplaceAuctionLot") {
    return <AuctionDetail item={data} cmsData={cmsData} />;
  } else if (data?.details.__typename === "MarketplaceBuyNowOutput") {
    return <BuyNowDetail item={data} cmsData={cmsData} />;
  }

  return <div>{strings.COMMON.UNSUPPORTED_ITEM_TYPE}</div>;
};

export default ItemDetail;
