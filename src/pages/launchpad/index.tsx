import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

export default function Launchpad() {
  return (
    <main>
      <Title>Launchpad</Title>

      <Outlet />
    </main>
  );
}

const Title = styled.h2`
  font-family: Raleway;
  font-size: 48px;
  font-weight: 600;
  line-height: 67.2px;
  letter-spacing: 2.4px;
`;
