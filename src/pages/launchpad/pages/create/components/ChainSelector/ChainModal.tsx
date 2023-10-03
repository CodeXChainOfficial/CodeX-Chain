import styled from "@emotion/styled";
import ChainItem from "./ChainItem";
import { Blockchain } from "../../types";

type Props = {
  mainnetChains: string[];
  testnetChains: string[];
  selectedChain: Blockchain;
  onClose: () => void;
  onSelect: (blockchain: Blockchain) => void;
};

const ChainModal = ({ mainnetChains, testnetChains, selectedChain, onSelect, onClose }: Props) => {
  return (
    <>
      <Title>Select Blockchain</Title>

      <GroupContainer>
        <Group>
          {mainnetChains.map((item) => (
            <ChainItem
              key={item}
              blockchain={item}
              isSelected={item === selectedChain.name && selectedChain.net === "mainnet"}
              net="mainnet"
              onSelect={() => onSelect({ name: item, net: "mainnet" })}
            />
          ))}
        </Group>

        <Title2>Testnet</Title2>

        <Group>
          {testnetChains.map((item) => (
            <ChainItem
              key={item}
              blockchain={item}
              isSelected={item === selectedChain.name && selectedChain.net === "testnet"}
              net="testnet"
              onSelect={() => onSelect({ name: item, net: "testnet" })}
            />
          ))}
        </Group>
      </GroupContainer>
    </>
  );
};

const Title = styled.h3`
  color: var(--blue);
  font-size: 32px;
  font-weight: 600;
  line-height: 44.8px;
  letter-spacing: 1.6px;
  text-transform: capitalize;
  margin-block-end: 20px;
`;

const GroupContainer = styled.div`
  overflow-y: auto;
  max-height: 650px;
  display: grid;
  gap: 20px;
`;

const Group = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Title2 = styled.h4`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
`;

export default ChainModal;
