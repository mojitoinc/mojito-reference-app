import Image from "next/image";
import styled from "styled-components";

import { images } from "@constants";

const Container = styled.div(
  ({ theme }) => `
  background: ${theme.colors.modalOverlayBackground};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`
);

const Content = styled.section(
  ({ theme }) => `
  position: fixed;
  background: ${theme.colors.background};
  width: 80%;
  max-height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${theme.borderRadius.medium};
  padding: 45px 61px;
  overflow-y: auto;

  ${theme.down(theme.breakpoints.md)} {
    padding: 45px 15px;
    width: 90%;
  }
`
);

const CloseButton = styled.button(
  ({ theme }) => `
  position: absolute;
  top: 0;
  right: 0;
  margin: 24px;
  background: transparent;
  border: none;
  font-size: 24px;

  ${theme.down(theme.breakpoints.md)} {
    & img {
      width: 15px !important;
    }
  }
`
);

interface ModalProps {
  onClose: () => void;
  width?: string;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children, width }) => (
  <Container>
    <Content style={{ width }}>
      {children}
      <CloseButton type="button" onClick={onClose}>
        <Image
          src={images.CLOSE_ICON?.src}
          alt={images.CLOSE_ICON?.alt}
          width={images.CLOSE_ICON?.width}
          height={images.CLOSE_ICON?.height}
        />
      </CloseButton>
    </Content>
  </Container>
);
