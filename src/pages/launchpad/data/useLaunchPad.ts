import useSWR from "swr/immutable";
import { LaunchPadFormData } from "../constants";

export const useLaunchPadForm = () => {
  const fallbackData: LaunchPadFormData = {
    name: "",
    wallet: "",
    description: "",
    logo: "",
    launchPadType: "",
    incubationNeeded: false,
    milestoneNeeded: false,
    generateDashboard: false,
    currency: "",
    wallets: [],
    walletVotingPower: 0,
  };

  const { data, mutate } = useSWR<LaunchPadFormData>("lp-form-data", { fallbackData });

  return [data, mutate] as [LaunchPadFormData, typeof mutate];
};

export const useConfirmationCount = () => {
  const { data, mutate } = useSWR<number>("lp-deploy-confirmation", { fallbackData: 0 });

  return [data, mutate] as [number, typeof mutate];
};
