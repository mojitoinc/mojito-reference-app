import { CollectionItemDataAllFragment } from "@services";
import { CMSData } from "@state";

export interface AuctionDetailProps {
  item: CollectionItemDataAllFragment;
  cmsData?: CMSData;
}

export interface BidConfirmModalProps {
  handleClose: () => void;
  item: CollectionItemDataAllFragment;
  cmsData?: CMSData;
  setHasBid: (value: boolean) => void;
}
