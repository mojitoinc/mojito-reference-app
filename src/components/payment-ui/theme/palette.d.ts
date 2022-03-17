import "@mui/material/styles/createPalette";

// TODO: Can this be imported instead?

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    paymentUI?: {
      progressBar?: string;
      paymentMethodSelectorBorder?: string;
      paymentMethodSelectorBackground?: string;
      mainButtonBackground?: string;
      mainButtonBorderWidth?: number;
    };
  }

  interface PaletteOptions {
    paymentUI?: {
      progressBar?: string;
      paymentMethodSelectorBorder?: string;
      paymentMethodSelectorBackground?: string;
      mainButtonBackground?: string;
      mainButtonBorderWidth?: number;
    };
  }
}
