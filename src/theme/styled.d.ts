import "styled-components";

export type FontStyle = "normal" | "italic";

declare module "styled-components" {
  export interface DefaultTheme {
    backgrounds: {
      grid: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      rounded: string;
    };
    borders: {
      thin: (borderColor?: string) => string;
      medium: (borderColor?: string) => string;
    };
    colors: {
      background: string;
      bidBannerBorder: string;
      border: string;
      disabled: string;
      imageBackground: string;
      info: string;
      modalOverlayBackground: string;
      primary: string;
      secondary: string;
      text: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      h1Size: string;
      h2Size: string;
      h3Size: string;
      bodySize: string;
      smallSize: string;
      h1: (fontStyle?: FontStyle) => string;
      h2: (fontStyle?: FontStyle) => string;
      h3: (
        fontWeight?: string,
        fontFamily?: string,
        fontStyle?: FontStyle
      ) => string;
      body: (fontWeight?: string, fontStyle?: FontStyle) => string;
      small: (fontWeight?: string, fontStyle?: FontStyle) => string;
    };
    textDecoration: {
      link: string;
      seeMoreText: string;
    };
    zIndex: {
      info: number;
      footerLogo: number;
    };
    unit: (times?: number) => string;
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      maxWidth: number;
    };
    up: (breakpoint: number) => string;
    down: (breakpoint: number) => string;
  }
}
