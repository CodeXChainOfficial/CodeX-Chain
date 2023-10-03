import styled from "@emotion/styled";
import { FieldLabel, FormInputStyle } from "../styles/form";

const SelectedChains = ({ chains }: { chains: string[] }) => {
  return (
    <Wrapper>
      <FieldLabel>Deploy on:</FieldLabel>
      <ValueLabel>{chains.join("; ")}</ValueLabel>
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
`;

export default SelectedChains;
