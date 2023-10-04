import { useWatch } from "react-hook-form";
import { LaunchPadFormData } from "..";

const useWatchLaunchPadType = (control: any) => {
  return useWatch<LaunchPadFormData, "launchPadType">({
    name: "launchPadType",
    control,
    defaultValue: "",
  });
};

export default useWatchLaunchPadType;
