import useSWR from "swr/immutable";
import { LaunchPadFormData } from "../constants";

const useLaunchPadForm = () => {
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
  };

  const { data: _data, mutate } = useSWR<LaunchPadFormData>("launchpadPageForm", { fallbackData });

  return {
    data: _data!,
    setData: (data: LaunchPadFormData) => {
      mutate({ ...data });
    },
  };
};

export default useLaunchPadForm;
