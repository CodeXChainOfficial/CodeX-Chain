import { useState } from "react";
import styled from "@emotion/styled";
import { useController } from "react-hook-form";
import { InputProps } from "../../types/form";
import { media } from "@/shared/styles/media";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ChainModal from "./ChainModal";
import { FieldError } from "../../styles/form";
import { Blockchain } from "../../types";

const ChainSelector = ({ name, control, required }: InputProps) => {
  const { field, fieldState } = useController({ name, control, rules: { required } });

  const [open, setOpen] = useState(false);

  const value = field.value ?? { name: "", net: "" };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSelect = (blockchain: Blockchain) => {
    field.onChange({ target: { value: blockchain } });
    handleClose();
  };

  return (
    <Wrapper>
      <Input {...field} value={value.name} onChange={(e) => {}} />

      <ButtonContainer>
        <StyledButton onClick={handleOpen}>Select Chain</StyledButton>
      </ButtonContainer>

      {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <ChainModal
            mainnetChains={mainnet}
            testnetChains={testnet}
            selectedChain={value}
            onSelect={handleSelect}
            onClose={handleClose}
          />
        </ModalBox>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-block: 10px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px 1fr;
  /* max-height: 30px; */

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const ModalBox = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(600px, 100%);
  background-color: var(--black);
  border: 2px solid var(--black);
  box-shadow: 24;
  padding: 10px;
  max-height: 98vh;
`;

const Input = styled.input`
  position: absolute;
  z-index: -1;
  top: 0;
  opacity: 0;
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
