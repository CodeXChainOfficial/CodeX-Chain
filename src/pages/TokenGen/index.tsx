import styled from "@emotion/styled";
import CreateLaunchpad from "./pages/create";
import LaunchpadResult from "./pages/result";
import { Route, Routes } from "react-router-dom";
import { LaunchpadRoutes } from "./constants";
import CreateToken from "./pages/create/index";

export default function Launchpad() {
  return (
    <Main>
      <section>
        <Title>Token Generator</Title>
      </section>

      <Routes>
      <Route path="/" element={<CreateToken />} />
      <Route path={tokenRoutes.result} element={<LaunchpadResult />} />

        <Route path="*" element={<div>Error: page not found!</div>} />
      </Routes>
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
