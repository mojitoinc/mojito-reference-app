import "@mui/material/styles/createPalette";
import { PalettePaymentUI } from "@mojitoinc/mojito-mixers";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    paymentUI?: PalettePaymentUI;
  }

  interface PaletteOptions {
    paymentUI?: PalettePaymentUI;
  }
}
