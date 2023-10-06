import styled from "@emotion/styled";
import { ResultLayer } from "./components/ResultLayer";
import Button from "@mui/material/Button";
import DeployLoader from "./components/DeployLoader";
import { useEffect } from "react";

export default function LaunchpadResult() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Section>
        <Title>Autodeploy Your LaunchPad</Title>
        <Text>Double-check that everything is correct </Text>
      </Section>

      <ResultLayer />

      {/* <DeployLoader /> */}

      <ResultLayer />

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
