import styled from "@emotion/styled";
import { Logo } from "./components/Logo";
import WalletPage from "./wallet";


export default function Header() {
  return (
    <HeaderElement>
      <Logo />
      <WalletPage />

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
  transition: 0.4s ease-in-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(8.5px); */
  background-color: var(--black);

  & > * {
    /* border: 1px solid white; */
  }
`;
