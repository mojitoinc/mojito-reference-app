import { useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { config } from "@constants";
import { useCollectionItemBySlugQuery } from "src/services/graphql/generated";

import { MockCMSService } from "../../data/MockCMSService";
import { AuctionDetail } from "src/components/item/AuctionDetail";
import { BuyNowDetail } from "src/components/item/BuyNowDetail";

const ItemDetail: NextPage = ({ itemID }: any) => {
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
  }, [collectionData, loading, error]);

  const cmsData = useMemo(() => {
    if (data) {
      return cms.getData(data.id);
    }
  }, [data, error, loading]);

  if (data?.details.__typename === "MarketplaceAuctionLot") {
    return <AuctionDetail item={data} cmsData={cmsData} />;
  } else if (data?.details.__typename === "MarketplaceBuyNowOutput") {
    return <BuyNowDetail item={data} cmsData={cmsData} />;
  }

  return <div>unsupported item type</div>;
};

export default ItemDetail;
