import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import { LotGridItem } from "@components";
import { config, images, strings } from "@constants";
import { useCollection, useLazyMojito, useFetchAfterAuth } from "@hooks";
import { EMojitoQueries } from "@state";
import Content from "content.json";

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

const Date = styled.p(
  ({ theme }) => `
  color: ${theme.colors.background};
  font: ${theme.fonts.body()};
  text-align: center;
`
);

const Domain = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.body("bold")};
  margin: 35px 0 120px;
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
  const { lots } = Content;
  const { collection } = useCollection(config.COLLECTION_SLUG);

  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  const collectionLotsIds = collection?.items?.map((e: any) => e.lot.id) || [];
  let filteredLots = lots.filter((e) => collectionLotsIds.includes(e.mojitoId));

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

      <Date>{strings.GRID.DATE_AND_LOCATION}</Date>

      <Domain>{strings.GRID.DOMAIN}</Domain>

      <Grid>
        {filteredLots.map((lot) => {
          const item = collection?.items.find(
            (item: any) => item.lot.id === lot.mojitoId
          );

          return lot ? (
            <LotGridItem
              key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
              mojitoLotData={item.lot}
              lot={lot}
              isCollectionItem
              youHoldBid={item.lot.currentBid.marketplaceUser.id === profile?.me.id}
            />
          ) : null;
        })}
        <DummyView />
        <DummyView />
      </Grid>
    </Container>
  );
};

export default Home;
