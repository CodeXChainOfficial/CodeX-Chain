import styled from "@emotion/styled";
import { FieldLabel, FormInputStyle } from "../styles/form";
import useSelectedChain from "../hooks/useSelectedChain";

const SelectedChains = () => {
  const { blockchain } = useSelectedChain();

  return (
    <Wrapper>
      <FieldLabel>Deploy on:</FieldLabel>
      <ValueLabel>
        <span>{blockchain.name || "Select chain ☝️"}</span> <span>{blockchain.net}</span>
      </ValueLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ValueLabel = styled.div`
  ${FormInputStyle}

  span {
    display: inline-block;
    text-transform: capitalize;
  }
`;

export default SelectedChains;
