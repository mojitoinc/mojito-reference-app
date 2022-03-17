import { Theme, ThemeOptions, SxProps } from "@mui/material/styles";
import { REFERENCE_APP_COMPONENTS_OPTIONS } from "./paymentModalThemeComponents";
import { REFERENCE_APP_PALETTE_OPTIONS } from "./paymentModalThemePalette";
import { REFERENCE_APP_TYPOGRAPHY_OPTIONS } from "./paymentModalThemeTypography";

export const REFERENCE_APP_THEME_OPTIONS: ThemeOptions = {
  palette: REFERENCE_APP_PALETTE_OPTIONS,
  typography: REFERENCE_APP_TYPOGRAPHY_OPTIONS,
  components: REFERENCE_APP_COMPONENTS_OPTIONS,
};

export const REFERENCE_APP_LOGO_SX: SxProps<Theme> = {
  width: "100%",
  transform: { xs: "translate(0, 3px)", sm: "translate(0, 2px)" },
};
