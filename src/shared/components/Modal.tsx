import styled from "@emotion/styled";
import MuiModal from "@mui/material/Modal";

type Props = {
  open: boolean;
  children: JSX.Element;
  className?: string;
  onClose?: () => void;
};

const Modal = ({ children, className, ...props }: Props) => {
  return (
    <MuiModal {...props}>
      <Wrapper className={className}>{children}</Wrapper>
    </MuiModal>
  );
};

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  backdrop-filter: blur(5px);
`;

export default Modal;
