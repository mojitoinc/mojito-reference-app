import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import { CollectionGridItem } from "@components";
import { config, images, strings } from "@constants";
import { useLazyMojito, useFetchAfterAuth } from "@hooks";
import Content from "content.json";
import {
  useCollectionBySlugQuery,
  useProfileLazyQuery,
} from "src/services/graphql/generated";
import { useMemo } from "react";

import { cmsItems } from "../data/cmsData";

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
  const { items } = Content;
  const { data, loading, error } = useCollectionBySlugQuery({
    variables: {
      slug: config.COLLECTION_SLUG,
      marketplaceID: config.MARKETPLACE_ID,
    },
  });

  // const [getData, { data: profile }] = useProfileLazyQuery({
  //   variables: {
  //     organizationID: config.ORGANIZATION_ID,
  //   },
  // });

  // useFetchAfterAuth(getData);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log("error getting data", error);
    return <div>error getting data</div>;
  }

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

      {error && <div>error getting data</div>}

      <Grid>
        {data?.collectionBySlug?.items?.map((item) => (
          <CollectionGridItem
            key={item.id}
            item={item}
            cmsData={cmsItems[item.id]}
          />
        ))}
        <DummyView />
        <DummyView />
      </Grid>
    </Container>
  );
};

export default Home;
