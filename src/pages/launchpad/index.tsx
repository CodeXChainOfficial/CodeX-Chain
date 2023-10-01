import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

export default function Launchpad() {
  return (
    <Main>
      <section>
        <Title>LaunchPad</Title>
      </section>

      <Outlet />
    </Main>
  );
}

const Main = styled.main`
  display: grid;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 600;
  line-height: 67.2px;
  letter-spacing: 2.4px;
`;
