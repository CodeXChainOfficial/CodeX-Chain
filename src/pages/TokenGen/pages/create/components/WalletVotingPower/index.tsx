import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useWatch } from "react-hook-form";
import { FieldLabel } from "../../styles/form";
import { InputProps } from "../../types/form";
import useWatchLaunchPadType from "../../hooks/useWatchLaunchPadType";
import VotingCounter from "./Counter";
import VotingProgress from "./Progress";
import { media } from "@/shared/styles/media";
import { LaunchPadFormData } from "@/pages/launchpad/constants";

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
  padding: 20px 10px;
  border-radius: 8px;

  ${media.md} {
    background: var(--black);
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
  border: 1px solid var(--contrast-white-10, rgba(255, 255, 255, 0.1));
  border-right: none;
  border-left: none;
  padding-block: 20px;
`;

export default WalletVotingPower;

const useWatchWallets = ({ control }: Pick<InputProps, "control">) => {
  return useWatch<LaunchPadFormData, "wallets">({
    name: "wallets",
    control,
    defaultValue: [],
  });
};
