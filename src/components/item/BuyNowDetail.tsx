import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  CollectionItemDataAllFragment,
  useProfileLazyQuery,
  useProfileQuery,
} from "src/services/graphql/generated";
import { CMSData } from "src/data/MockCMSService";
import { config, images, strings } from "@constants";
import { useFetchAfterAuth } from "@hooks";
import {
  Author,
  AuthorDescription,
  AuthorImage,
  AuthorName,
  DetailContainer,
  DetailLeft,
  DetailRight,
  ItemDescription,
  ItemTitle,
  LotId,
  MoreText,
  Row,
  StyledContent,
  StyledImage,
  Video,
} from "./ItemComponents";
import {
  Winner,
} from "./AuctionComponents";
import { Button, StatusTag } from "../shared";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { getSaleStage } from "src/utils/isDuringSale";
import { CheckoutComponentProps, useCheckoutOverlay } from "@mojitoinc/mojito-mixers";

const Main = styled.main`
  padding: 40px 0;
`;

export interface AuctionDetailProps {
  item: CollectionItemDataAllFragment;
  cmsData?: CMSData;
}
export const BuyNowDetail: React.FC<AuctionDetailProps> = ({
  item,
  cmsData,
}) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [isSeeMoreLot, setIsSeeMoreLot] = useState(true);
  const [isSeeMoreAuthor, setIsSeeMoreAuthor] = useState(true);
  const router = useRouter();

  const { data: profile } = useProfileQuery({
    skip: !isAuthenticated,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };


  const { open, setCheckoutComponentProps } = useCheckoutOverlay();

  const getComponentPropsRef = useRef<() => CheckoutComponentProps>(() => ({}));

  getComponentPropsRef.current = () => {
    return {
      orgID: config.ORGANIZATION_ID || "",
      checkoutItems: [{
        // Common:
        lotID: (item?.details?.id as string) || "",
        lotType: "buyNow",
        name: item.name || "",
        description: cmsData?.about || "",
        imageSrc: cmsData?.image || "",
        imageBackground: "rgba(0, 0, 0, .125)",

        // Buy Now:
        units: 1,
        totalSupply: (item?.details as { totalUnits: number })?.totalUnits || 0,
        remainingSupply: (item?.details as { totalAvailableUnits: number })?.totalAvailableUnits || 0,

        // Auction:
        fee: 0,
      }],
    };
  };

  const handleOpenClicked = useCallback(() => {
    if (!profile || !item || !cmsData) return;

    open(getComponentPropsRef.current());
  }, [open, profile, item, cmsData]);

  useEffect(() => {
    setCheckoutComponentProps(getComponentPropsRef.current());

  // If some of the fields in the object above can change, add them to the dependencies here:
  }, [setCheckoutComponentProps, profile, item, cmsData]);

  if (item.details.__typename !== "MarketplaceBuyNowOutput") {
    return <div>invalid type</div>;
  }

  const isLotDescriptionLong = cmsData && cmsData.about.length > 350;
  const isAboutAuthorLong = cmsData && cmsData.author.about.length > 150;

  const saleStage = getSaleStage(item);
  const isPreSale = saleStage === "pre";
  const isDuringSale = saleStage === "during";
  const isPostSale = saleStage === "post";

  return (  
    <Main>
      <StyledContent>
        <DetailContainer>
          <DetailLeft>
            {cmsData?.format === "image" && (
              <StyledImage src={cmsData.image} alt={item.name} width={612} />
            )}
            {cmsData?.format === "video" && (
              <Video width={612} controls preload="auto">
                <source src={cmsData.video} type="video/mp4" />
              </Video>
            )}
          </DetailLeft>

          <DetailRight>
            {
              <>
                <Row>
                  <LotId>#{cmsData?.lotNumber}</LotId>
                  <StatusTag item={item} />
                </Row>
              </>
            }
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>
              {`${
                isSeeMoreLot && isLotDescriptionLong
                  ? `${cmsData?.about.slice(0, 350)}...`
                  : cmsData?.about
              } `}
              {isLotDescriptionLong && (
                <MoreText onClick={() => setIsSeeMoreLot(!isSeeMoreLot)}>
                  {isSeeMoreLot
                    ? strings.COMMON.SEE_MORE
                    : strings.COMMON.SEE_LESS}
                </MoreText>
              )}
            </ItemDescription>
            <Author>
              <AuthorImage>
                <Image
                  src={
                    cmsData?.author.avatar.url || images.AVATAR_PLACEHOLDER?.src
                  }
                  alt={images.AVATAR_PLACEHOLDER?.alt}
                  width={images.AVATAR_PLACEHOLDER?.authorSize}
                  height={images.AVATAR_PLACEHOLDER?.authorSize}
                />
              </AuthorImage>
              <div>
                <AuthorName>{cmsData?.author.name}</AuthorName>
                <AuthorDescription>
                  {`${
                    isSeeMoreAuthor && isAboutAuthorLong
                      ? `${cmsData?.author.about.slice(0, 150)}...`
                      : cmsData?.author.about
                  } `}
                  {isAboutAuthorLong && (
                    <MoreText
                      onClick={() => setIsSeeMoreAuthor(!isSeeMoreAuthor)}
                    >
                      {isSeeMoreAuthor
                        ? strings.COMMON.SEE_MORE
                        : strings.COMMON.SEE_LESS}
                    </MoreText>
                  )}
                </AuthorDescription>
              </div>
            </Author>

            <div>
              {isPreSale && (
                <Button isBig disabled>
                  {strings.LOT.AVAILABLE_SOON}
                </Button>
              )}
              {isDuringSale && !isLoading && (
                <>
                  {isAuthenticated ? (
                    <Button onClick={ handleOpenClicked } isBig>
                      BUY NOW
                    </Button>
                  ) : (
                    <Button isBig onClick={login}>
                      {strings.LOT.LOGIN_BUTTON}
                    </Button>
                  )}
                </>
              )}
              {isPostSale && <Winner>Sold out</Winner>}
            </div>
          </DetailRight>
        </DetailContainer>
      </StyledContent>
    </Main>
  );
};
