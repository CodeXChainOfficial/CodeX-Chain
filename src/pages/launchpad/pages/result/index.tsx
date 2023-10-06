import { useEffect } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import DeployLoader from "./components/DeployLoader";
import { ResultLayer } from "./components/ResultLayer";
import { useLaunchPadForm } from "../../data/useLaunchPad";

export default function LaunchpadResult() {
  const [data] = useLaunchPadForm();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const chain = data.blockchain ? `${data.blockchain?.name} ${data.blockchain?.net}` : "";

  return (
    <>
      <Section>
        <Title>Autodeploy Your LaunchPad</Title>
        <Text>Double-check that everything is correct </Text>
      </Section>

      <ResultLayer
        title="launchpad configuration"
        list={[
          { name: "Name", value: data.name },
          { name: "Logo", value: data.logo },
          { name: "Description", value: data.description },
          { name: "Wallet", value: data.wallet },
        ]}
      />

      <ResultLayer
        title="launchpad setting"
        list={[
          { name: "LaunchPad Type", value: data.launchPadType },
          { name: "Wallet Voting Power", value: data.walletVotingPower },
          { name: "Incubation Need?", value: data.incubationNeeded ? "Yes" : "No" },
          { name: "Generate Dashboard?", value: data.generateDashboard ? "Yes" : "No" },
          { name: "Milestone Needed?", value: data.milestoneNeeded ? "Yes" : "No" },
          { name: "Currency", value: data.currency },
          { name: "Selected Deploy", value: "Network" },
          { name: "Deploy Option", value: "Single Chain" },
          { name: "Chain Selection", value: chain },
        ]}
      />

      {/* <DeployLoader /> */}

      <ButtonSection>
        <DeployButton>Autodeploy</DeployButton>
      </ButtonSection>
    </>
  );
}

const Section = styled.section`
  margin-block-end: 30px;
`;

const Title = styled.h3`
  color: var(--white);
  font-size: 32px;
  font-weight: 600;
  line-height: 44.8px;
  letter-spacing: 1.6px;
  text-transform: capitalize;
  margin-block-end: 20px;
`;

const Text = styled.p`
  color: var(--contrast-white-90);
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  letter-spacing: 0.8px;
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const DeployButton = styled(Button)`
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  padding: 8px 16px;
  width: max-content;
  border-radius: 4px;
  border: none;
  background: var(--gradient1);
  cursor: pointer;
  margin: 80px 0 0 auto;
  text-transform: none;
`;
