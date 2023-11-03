import { useWatch } from "react-hook-form";
import { LaunchPadFormData } from "@/pages/launchpad/constants";
import { InputProps } from "../types/form";

const useWatchLaunchPadType = ({ control }: Pick<InputProps, "control">) => {
  return useWatch<LaunchPadFormData, "launchPadType">({
    name: "launchPadType",
    control,
    defaultValue: "",
  });
};

export default useWatchLaunchPadType;
