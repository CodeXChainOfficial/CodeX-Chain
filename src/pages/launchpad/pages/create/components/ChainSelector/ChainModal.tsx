import styled from "@emotion/styled";
import ChainItem from "./ChainItem";

type Props = {
  blockchains: string[];
  selectedChain: string;
};

const ChainModal = ({ blockchains, selectedChain }: Props) => {
  return (
    <ModalBox>
      <Group>
        {blockchains.map((item) => (
          <ChainItem key={item} blockchain={item} isSelected={item === selectedChain} net="mainnet" />
        ))}
      </Group>
    </ModalBox>
  );
};

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: var(--black);
  border: 2px solid var(--black);
  box-shadow: 24;
  padding: 4;
`;

const Group = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export default ChainModal;
