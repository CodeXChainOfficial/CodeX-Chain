import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useWatch } from "react-hook-form";
import { FieldLabel } from "../../styles/form";
import { InputProps } from "../../types/form";
import useWatchLaunchPadType from "../../hooks/useWatchLaunchPadType";
import { LaunchPadFormData } from "../..";
import VotingCounter from "./Counter";
import VotingProgress from "./Progress";

const WalletVotingPower = ({ control }: Pick<InputProps, "control">) => {
  const walletCount = useWatchWallets({ control }).length;

  const [votingPower, setVotingPower] = useState(1);

  const launchpadType = useWatchLaunchPadType({ control });

  useEffect(() => {
    setVotingPower(walletCount);
  }, [walletCount]);

  if (launchpadType !== "decentralized" || !walletCount) return <></>;

  const handleIncrement = () => {
    setVotingPower((prev) => ++prev);
  };

  const handleDecrement = () => {
    setVotingPower((prev) => --prev);
  };

  return (
    <Wrapper>
      <FieldLabel>Wallet Voting Power</FieldLabel>

      <Group>
        <VotingCounter
          value={votingPower}
          minValue={Math.round(walletCount / 2)}
          maxValue={walletCount}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />

        <VotingProgress value={votingPower} max={walletCount} />
      </Group>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  width: min(800px, 100%);
  margin: auto;
  border: 1px solid white;
`;

export default WalletVotingPower;

const useWatchWallets = ({ control }: Pick<InputProps, "control">) => {
  return useWatch<LaunchPadFormData, "wallets">({
    name: "wallets",
    control,
    defaultValue: [],
  });
};
