import useSWR from "swr/immutable";
import { Blockchain } from "../types";

const useSelectedChain = () => {
  const result = useSWR<Blockchain>("selectedBlockchain");

  return {
    blockchain: result.data ?? { name: "", net: "" },
    setBlockchain: result.mutate,
  };
};

export default useSelectedChain;
