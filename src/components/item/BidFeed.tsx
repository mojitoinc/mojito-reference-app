import React, { useMemo } from "react";
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

export const BidFeed = ({ bids: parentBids, profile }: any) => {
  const userId = profile?.me?.id || "";

  const bids = useMemo(() => {
    const yourFirstBidIndex = parentBids.findIndex((bid: any) => bid.marketplaceUser.id === userId);

    return parentBids.map((parentBid: any, i: number) => {
      const holdBid = i === 0 && yourFirstBidIndex === 0;
      const outbid = !holdBid && i === yourFirstBidIndex && yourFirstBidIndex > 0;
      const outbidinfo = outbid && parentBids[0].amount === parentBid.amount;

      return {
        ...parentBid,
        holdBid,
        outbid,
        outbidinfo,
      };
    })
  }, [parentBids, userId]);

  return (
    <Container>
      <Title>{strings.ITEM.BID_FEED.TITLE}</Title>
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
