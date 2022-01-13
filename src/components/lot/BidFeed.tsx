import React from "react";
import styled from "styled-components";

import { BidFeedItem } from "@components";
import { strings } from "@constants";

const Container = styled.div(
  ({ theme }) => `
  margin: 0 auto;
  margin-top: 100px;
  max-width: ${theme.breakpoints.lg + 1}px;
  width: 100%;
`
);

const Title = styled.h2`
  margin-bottom: 22px;
`;

const Table = styled.div`
  position: relative;
`;

export const BidFeed = ({ bids, profile }: any) => {
  bids = bids?.map((bid: any) => {
    bid.isYou = profile?.me.id == bid.marketplaceUser.id;
    return bid;
  });

  const _youFirstBid = bids.findIndex((bid: any) => bid.isYou);
  if (_youFirstBid == 0) bids[0].holdBid = true;
  else if (_youFirstBid > 0) {
    bids[_youFirstBid].outbid = true;
    if (bids[0].amount == bids[_youFirstBid].amount) {
      bids[_youFirstBid].outbidinfo = true;
    }
  }

  return (
    <Container>
      <Title>{strings.LOT.BID_FEED.TITLE}</Title>
      <Table>
        {bids.map((item: any, index: number) => (
          <BidFeedItem
            item={item}
            isTop={index === 0}
            key={item.id}
            userId={profile?.me.id}
          />
        ))}
      </Table>
    </Container>
  );
};
