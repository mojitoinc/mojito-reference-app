import Select from "react-select";
import styled from "styled-components";

import { Button } from "@components";

export const ModalTitle = styled.h3(
  ({ theme }) => `
  margin-top: 0;
  margin-bottom: 38px;

  ${theme.down(theme.breakpoints.md)} {
    font-size: 20px;
  }
`
);

export const ModalDetailContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0;
    flex-direction: column;
  }
`
);

export const ModalDetailLeft = styled.div(
  ({ theme }) => `
  flex: 1;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0 0 40px;
    width: 100%;
  }
`
);

export const ItemImage = styled.img(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  height: 200px;
  object-fit: cover;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    height: auto;
    max-height: 500px;
    width: 100%;
  }
`
);

export const ItemVideo = styled.video(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  height: 200px;
  object-fit: cover;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    height: auto;
    max-height: 500px;
    width: 100%;
  }
`
);

export const ModalDetailRight = styled.div(
  ({ theme }) => `
  flex: 1.5;
  margin-left: 1rem;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0;
    width: 100%;
  }
`
);

export const ModalCurrentBid = styled.span(
  ({ theme }) => `
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.small};
  font: ${theme.fonts.small("bold")};
  padding: 3px 8px;
  margin-bottom: 18px;
`
);

export const ModalItemDescription = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 20px;
`
);

export const BidContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectBidContainer = styled(Select)(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.small};
  display: flex;
  font: ${theme.fonts.small("bold")};
  height: 40px;
  justify-content: flex-end;
`
);

export const Separator = styled.hr`
  border: ${({ theme }) => theme.borders.thin(theme.colors.border)};
  border-bottom: none;
`;

export const MaxTotalContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font: ${theme.fonts.small("bold")};
  line-height: 18px;
`
);

export const ConfirmButton = styled(Button)(
  ({ theme }) => `
  width: 100%;
  max-width: 320px;
  margin: 67px auto 0;

  ${theme.down(theme.breakpoints.md)} {
    border-radius: ${theme.borderRadius.small};
    font-size: 20px;
    height: 56px;
  }
`
);

export const SuccessContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

export const SuccessMessage = styled.h3`
  margin: 50px 0 0;
`;
