import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { images, strings, TERMS_AND_CONDITIONS_LINK } from "@constants";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.a(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 18px;
`
);

const FooterLogo = styled.div`
  margin: 34px 0;
  z-index: ${({ theme }) => theme.zIndex.footerLogo}; ;
`;

export const Footer = () => (
  <StyledFooter>
    <Link href={TERMS_AND_CONDITIONS_LINK} passHref>
      <FooterText target="_blank">
        {strings.COMMON.TERMS_AND_CONDITIONS}
      </FooterText>
    </Link>
    <FooterLogo>
      <Image
        src={images.LOGO?.src}
        alt={images.LOGO?.alt}
        width={images.LOGO?.footerWidth}
        height={images.LOGO?.footerHeight}
      />
    </FooterLogo>
  </StyledFooter>
);
