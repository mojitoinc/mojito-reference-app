import styled from "styled-components";

export const YourBid = styled.div(
  ({ theme }) => `
    align-items: center;
    border: ${theme.borders.medium(theme.colors.bidBannerBorder)};
    border-radius: ${theme.borderRadius.small};
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  `
);

export const Outbid = styled.div(
  ({ theme }) => `
    align-items: center;
    border: ${theme.borders.medium(theme.colors.primary)};
    border-radius: ${theme.borderRadius.small};
    color: ${theme.colors.primary};
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  `
);

export const CurrentBid = styled.p(
  ({ theme }) => `
    font: ${theme.fonts.body()};
    line-height: 22px;
    text-align: center;
    margin: 40px 0 20px;
  `
);

export const CurrentBidAmount = styled.span(
  ({ theme }) => `
    color: ${theme.colors.primary};
    font-weight: bold;
  `
);

export const Winner = styled.div(
  ({ theme }) => `
    font: ${theme.fonts.body()};
    text-align: center;
  
    & span {
      font-weight: bold;
    }
  `
);

export const WinnerName = styled.span(
  ({ theme }) => `
    color: ${theme.colors.secondary};
  `
);
