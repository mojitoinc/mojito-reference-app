import "@mui/material/styles/createPalette";

// TODO: Can this be imported instead?

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    gradients?: {
      stepper?: string;
      stepperReverse?: string;
      action?: string;
      actionReverse?: string;
    };
  }

  interface PaletteOptions {
    gradients?: {
      stepper?: string;
      stepperReverse?: string;
      action?: string;
      actionReverse?: string;
    };
  }
}
