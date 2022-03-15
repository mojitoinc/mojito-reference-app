import moment from "moment";
import { CollectionItemDataFragment } from "src/services/graphql/generated";

export function getSaleStage(
  item: CollectionItemDataFragment
): "pre" | "during" | "post" {
  const auctionStartUnix = moment(item.details.startDate ?? null).unix();
  const auctionEndUnix = moment(item.details.endDate ?? null).unix();
  const nowUnix = moment().unix();

  if (nowUnix < auctionStartUnix) {
    return "pre";
  } else if (nowUnix > auctionStartUnix && nowUnix < auctionEndUnix) {
    return "during";
  } else if (nowUnix > auctionEndUnix) {
    return "post";
  }

  return "pre";
}

export function isPreSale(item: CollectionItemDataFragment): boolean {
  return getSaleStage(item) === "pre";
}

export function isDuringSale(item: CollectionItemDataFragment): boolean {
  return getSaleStage(item) === "during";
}

export function isPostSale(item: CollectionItemDataFragment): boolean {
  return getSaleStage(item) === "post";
}
