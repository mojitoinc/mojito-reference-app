import styled from "styled-components";

export const Main = styled.main`
  padding: 40px 0;
`;

export const TopBanner = styled.div(
  ({ theme }) => `
      font: ${theme.fonts.body("bold")};
      height: 40px;
      margin: 0 auto;
      margin-bottom: 16px;
      max-width: 1176px;
      padding: 0 30px;
      width: 100%;
    `
);

export const DetailContainer = styled.div(
  ({ theme }) => `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    
      ${theme.down(theme.breakpoints.lg)} {
        margin: 0;
      }
    `
);

export const DetailLeft = styled.div(
  ({ theme }) => `
      margin: 0 36px 40px;
    
      & .image,
      .video {
        background-color: ${theme.colors.imageBackground};
        border-radius: ${theme.borderRadius.medium};
        max-height: 588px;
        object-fit: contain;
      }
    
      ${theme.down(theme.breakpoints.md)} {
        padding: 0 30px;
      }
    
      ${theme.down(theme.breakpoints.lg)} {
        margin: 0 0 40px;
      }
    `
);

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledImage = styled.img(
  ({ theme }) => `
    background-color: ${theme.colors.imageBackground};
    border-radius: ${theme.borderRadius.medium};
    max-height: 588px;
    object-fit: contain;
  
    ${theme.down(theme.breakpoints.md)} {
      width: 100%;
    }
  `
);

export const Video = styled.video(
  ({ theme }) => `
    background-color: ${theme.colors.imageBackground};
    border-radius: ${theme.borderRadius.medium};
    max-height: 588px;
    object-fit: contain;
  
    ${theme.down(theme.breakpoints.md)} {
      width: 100%;
    }
  `
);

export const DetailRight = styled.div(
  ({ theme }) => `
    margin: 0 36px;
    max-width: 432px;
    width: 100%;
  
    ${theme.down(theme.breakpoints.lg)} {
      margin: 0 30px;
    }
  `
);

export const Row = styled.div`
  align-items: center;
  display: flex;
`;

export const LotId = styled.span(
  ({ theme }) => `
      color: ${theme.colors.primary};
      font: ${theme.fonts.body("bold")};
      margin-right: 8px;
    `
);

export const ItemTitle = styled.h2`
  margin: 16px 0;
`;

export const ItemDescription = styled.p(
  ({ theme }) => `
    font: ${theme.fonts.small()};
    line-height: 20px;
  `
);

export const MoreText = styled.span(
  ({ theme }) => `
    color: ${theme.colors.primary};
    cursor: pointer;
    font: ${theme.fonts.small("bold")};
    text-decoration: ${theme.textDecoration.seeMoreText};
  `
);

export const Author = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 141px;
`;

export const AuthorImage = styled.div`
  margin-right: 30px;
  min-width: 60px;

  & img {
    border-radius: 50%;
  }
`;

export const AuthorName = styled.h3(
  ({ theme }) => `
    font: ${theme.fonts.body("bold")};
    margin: 0 0 10px;
  `
);

export const AuthorDescription = styled.p(
  ({ theme }) => `
    font: ${theme.fonts.small()};
    line-height: 20px;
  `
);
