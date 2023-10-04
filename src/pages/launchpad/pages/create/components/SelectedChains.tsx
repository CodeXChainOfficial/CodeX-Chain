import styled from "@emotion/styled";
import { FieldLabel, FormInputStyle } from "../styles/form";
import { useWatch } from "react-hook-form";
import { InputProps } from "../types/form";
import { LaunchPadFormData } from "..";

const SelectedChains = ({ control }: Pick<InputProps, "control">) => {
  const blockchain = useWatch<LaunchPadFormData, "blockchain">({
    name: "blockchain",
    control,
    defaultValue: { name: "", net: "" },
  });

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
