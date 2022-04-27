import "@mui/material/styles/createPalette";
import { PalettePaymentUI } from "@mojitonft/mojito-mixers";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    paymentUI?: PalettePaymentUI;
  }

  interface PaletteOptions {
    paymentUI?: PalettePaymentUI;
  }
}
