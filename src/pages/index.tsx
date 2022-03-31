import type { NextPage } from "next";
import Image from "next/image";
import { useMemo } from "react";
import styled from "styled-components";

import { CollectionGridItem } from "@components";
import { config, images, strings } from "@constants";
import { useCollectionBySlugQuery } from "@services";
import { MockCMSService } from "@state";

const Container = styled.main`
  background: ${({ theme }) => theme.backgrounds.grid};
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 90px 48px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.body()};
  text-align: center;
`
);

const Grid = styled.div(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -12px;
  max-width: 1600px;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    display: block;
  }
`
);

const DummyView = styled.div`
  width: 432px;
  margin: 0 12px;
`;

const Home: NextPage = () => {
  const cms = useMemo(() => {
    return new MockCMSService();
  }, []);
  const { data, error } = useCollectionBySlugQuery({
    variables: {
      slug: config.COLLECTION_SLUG,
      marketplaceID: config.MARKETPLACE_ID,
    },
  });

  return (
    <Container>
      <Image
        src={images.BRAND_ICON?.src}
        alt={images.BRAND_ICON?.alt}
        width={images.BRAND_ICON?.width}
        height={images.BRAND_ICON?.height}
      />
      <Title>{strings.GRID.TITLE}</Title>

      <Subtitle>{strings.GRID.SUBTITLE}</Subtitle>

      {error && <div>{strings.COMMON.ERROR_GETTING_DATA}</div>}

      <Grid>
        {data?.collectionBySlug?.items?.map((item) => (
          <CollectionGridItem
            key={item.id}
            item={item}
            cmsData={cms.getData(item.id)}
            youHoldBid={
              (item.details.__typename === "MarketplaceAuctionLot" &&
                item.details.myBid &&
                item.details.currentBid?.id === item.details.myBid?.id) ||
              false
            }
          />
        ))}
        <DummyView />
        <DummyView />
      </Grid>
    </Container>
  );
};

export default Home;
