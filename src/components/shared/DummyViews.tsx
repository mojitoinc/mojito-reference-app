import styled from "styled-components";

import { UNIT } from "@theme/theme";

const DummyView = styled.div(
  ({ theme }) => `
  width: ${theme.unit(36)};
  margin: 0 ${theme.unit()};
`
);

export const DummyViews = () => (
  <>
    {[...Array(Math.round(24 / UNIT))].map((_, index) => (
      <DummyView key={index} />
    ))}
  </>
);
