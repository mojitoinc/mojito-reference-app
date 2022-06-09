import { DefaultTheme } from "styled-components";

import { FontStyle } from "./styled";

export const UNIT = 12;
const MAX_CONTENT_WIDTH = 1368;

export const theme: DefaultTheme = {
  backgrounds: {
    grid: "url(/images/background.png)",
  },
  borderRadius: {
    small: "8px",
    medium: "16px",
    large: "24px",
    rounded: "1024px",
  },
  borders: {
    thin: (borderColor: string = theme.colors.text) =>
      `1px solid ${borderColor}`,
    medium: (borderColor: string = theme.colors.text) =>
      `2px solid ${borderColor}`,
  },
  colors: {
    text: "#000000",
    primary: "#FF00FF",
    secondary: "#29ABE2",
    background: "#FFFFFF",
    imageBackground: "#CCCCCC",
    disabled: "#C4C4C4",
    border: "rgba(194, 180, 154, 0.5)",
    info: "#C4C4C4",
    bidBannerBorder: "#999999",
    modalOverlayBackground: "rgba(0, 0, 0, 0.6)",
    textOverlayBackground: "#ffffffaf",
  },
  fonts: {
    primary: "IBMPlexMono",
    secondary: "PostGrotesk",
    h1Size: "48px",
    h2Size: "32px",
    h3Size: "24px",
    bodySize: "20px",
    smallSize: "14px",
    h1: (fontStyle: FontStyle = "normal") =>
      `${fontStyle} 500 ${theme.fonts.h1Size} "${theme.fonts.primary}", sans-serif`,
    h2: (fontStyle: FontStyle = "normal") =>
      `${fontStyle} 500 ${theme.fonts.h2Size} "${theme.fonts.primary}", sans-serif`,
    h3: (
      fontWeight: string = "500",
      fontFamily: string = theme.fonts.primary,
      fontStyle: FontStyle = "normal"
    ) =>
      `${fontStyle} ${fontWeight} ${theme.fonts.h3Size} "${fontFamily}", sans-serif`,
    body: (fontWeight: string = "500", fontStyle: FontStyle = "normal") =>
      `${fontStyle} ${fontWeight} ${theme.fonts.bodySize} "${theme.fonts.secondary}", sans-serif`,
    small: (fontWeight: string = "500", fontStyle: FontStyle = "normal") =>
      `${fontStyle} ${fontWeight} ${theme.fonts.smallSize} "${theme.fonts.secondary}", sans-serif`,
  },
  textDecoration: {
    link: "underline",
    seeMoreText: "underline",
  },
  zIndex: {
    info: 1,
    footerLogo: -1000,
  },
  unit: (times: number = 1) => `${UNIT * times}px`,
  breakpoints: {
    sm: 500,
    md: 767,
    lg: 1115,
    maxWidth: MAX_CONTENT_WIDTH,
  },
  up: (breakpoint: number) => `@media (min-width: ${breakpoint}px`,
  down: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
};
