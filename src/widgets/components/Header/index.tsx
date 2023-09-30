import styled from "@emotion/styled";
import { Logo } from "./components/Logo";

export default function Header() {
  return (
    <HeaderElement>
      <Logo />
    </HeaderElement>
  );
}

const HeaderElement = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(8.5px);
  transition: 0.4s ease-in-out;
  /* perspective: 800px; */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  & > * {
    /* border: 1px solid white; */
  }
`;
