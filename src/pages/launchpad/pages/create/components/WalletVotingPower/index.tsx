import styled from "@emotion/styled";
import { FieldLabel } from "../../styles/form";
import { InputProps } from "../../types/form";
import useWatchLaunchPadType from "../../hooks/useWatchLaunchPadType";
import { useWatch } from "react-hook-form";
import { LaunchPadFormData } from "../..";
import VotingCounter from "./Counter";
import VotingProgress from "./Progress";

const WalletVotingPower = ({ control }: Pick<InputProps, "control">) => {
  const launchpadType = useWatchLaunchPadType({ control });

  const wallets = useWatchWallets({ control });

  // if (launchpadType !== "decentralized" || !wallets.length) return <></>;

  return (
    <Wrapper>
      <FieldLabel>Wallet Voting Power</FieldLabel>

      <Group>
        <VotingCounter />
        <VotingProgress value={50} max={100} />
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
  flex-wrap: wrap;
  justify-content: space-around;
  width: min(800px, 100%);
  margin: auto;
`;

export default WalletVotingPower;

const useWatchWallets = ({ control }: Pick<InputProps, "control">) => {
  return useWatch<LaunchPadFormData, "wallets">({
    name: "wallets",
    control,
    defaultValue: [],
  });
};
