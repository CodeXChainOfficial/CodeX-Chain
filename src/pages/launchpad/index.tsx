import styled from "@emotion/styled";
import CreateLaunchpad from "./pages/create";
import LaunchpadResult from "./pages/result";
import useLaunchPadPage from "./data/useLaunchPadPage";

export default function Launchpad() {
  const { page } = useLaunchPadPage();

  return (
    <Main>
      <section>
        <Title>LaunchPad</Title>
      </section>

      {page === "create" ? <CreateLaunchpad /> : <LaunchpadResult />}
      {/* <LaunchpadResult /> */}
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
