import styled from "@emotion/styled";
import { useController } from "react-hook-form";
import { InputProps } from "../../types/form";
import { media } from "@/shared/styles/media";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ChainItem from "./ChainItem";

const ChainSelector = ({ name, control, rules, required }: InputProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: { required, ...rules },
  });

  const [open, setOpen] = useState(false);

  const selected = "codex";

  const setBlockchain = (blockchain: string, net: "mainnet" | "testnet") => {};

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const className = fieldState.isTouched && fieldState.error ? "error" : "";

  return (
    <Wrapper>
      <StyledButton {...field} className={className} onClick={handleOpen}>
        Select Chain
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px 1fr;

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const StyledButton = styled(Button)`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  border-radius: 8px;
  background-color: var(--blue);
  padding: 8px 32px;
  border: 1px solid transparent;
  cursor: pointer;
  margin-block-start: 20px;

  &.error {
    color: var(--red);
  }

  &:hover {
    background-color: var(--blue);
  }
`;

export default ChainSelector;

const mainnet = [
  "codex",
  "tron",
  "ethereum",
  "polygon",
  "arbritrum nova",
  "fantom opera",
  "kava",
  "moonbeam",
  "moonriver",
  "optimism",
  "arbritrum",
  "avalanche",
  "BSC",
  "cello",
  "cronos",
  "fuse",
  "gnosis",
  "harmony",
  "metis",
  "telos EVM",
];

const testnet = [
  "codex",
  "tron",
  "BSC",
  "fantom opera",
  "moonbeam",
  "avalanche",
  "cronos",
  "ethereum",
  "arbritrum nova",
];
