/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { images } from "@constants";
import { AuctionDetailProps } from "@interfaces";
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
  Row,
  StyledContent,
  StyledImage,
  Main,
} from "./ItemComponents";
import { CMSData } from "@state";

interface IProps {
  cmsData?: CMSData;
}

export const TokenDetail: React.FC<IProps> = ({ cmsData }) => {
  return (
    <Main>
      <StyledContent>
        <DetailContainer>
          <DetailLeft>
            {cmsData?.format === "image" && (
              <StyledImage
                src={cmsData.image}
                alt={cmsData.author.name}
                width={612}
              />
            )}
          </DetailLeft>

          <DetailRight>
            <Row>
              <LotId>#{cmsData?.lotNumber}</LotId>
            </Row>
            <ItemTitle>{cmsData?.about}</ItemTitle>
            <ItemDescription>{cmsData?.about}</ItemDescription>
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
                <AuthorDescription>{cmsData?.author.about}</AuthorDescription>
              </div>
            </Author>
          </DetailRight>
        </DetailContainer>
      </StyledContent>
    </Main>
  );
};
