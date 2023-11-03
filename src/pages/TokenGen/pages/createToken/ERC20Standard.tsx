import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextarea";
import ImageInput from "./components/ImageInput";
import RadioInput from "./components/RadioInput";
import ChainSelector from "./components/ChainSelector";
import { media } from "@/shared/styles/media";
import { Button } from "@mui/material";
import SelectedChains from "./components/SelectedChains";
import WalletList from "./components/WalletList";
import WalletVotingPower from "./components/WalletVotingPower";
import CreateDAO from "./components/CreateDAO";
import { useLaunchPadForm } from "../../data/useLaunchPad";
import { useNavigate } from "react-router-dom";
import { LaunchPadFormData, LaunchPadFormSchema, LaunchpadRoutes } from "../../constants";
import React, { Key, useEffect } from "react";



const infuraRpcUrl =
"https://mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b";

declare global {
interface Window {
  ethereum?: any; // Replace 'any' with the appropriate type if known
}
}

const networkOptions = {
    mainnet: {
      label: "Mainnet",
      options: [
        {
          label: "Ethereum",
          chainId: "0x1", // Ethereum Mainnet
          rpcUrl:
            "https://mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Linea",
          chainId: "0xe708", // Ethereum Mainnet
          rpcUrl:
            "https://linea-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Polygon",
          chainId: "0x89", // Ethereum Mainnet
          rpcUrl:
            "https://polygon-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Optimism",
          chainId: "0x12c", // Ethereum Mainnet
          rpcUrl:
            "https://optimism-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Arbitrum",
          chainId: "0xa4b1", // Ethereum Mainnet
          rpcUrl:
            "https://arbitrum-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },

        {
          label: "Avalanche",
          chainId: "0xa86a", // Ethereum Mainnet
          rpcUrl:
            "https://avalanche-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Near",
          chainId: "0x4e454152", // Ethereum Mainnet
          rpcUrl:
            "https://near-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Aurora",
          chainId: "0x4e454152", // Ethereum Mainnet
          rpcUrl:
            "https://aurora-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },

        {
          label: "Celo",
          chainId: "0xa4ec", // Ethereum Mainnet
          rpcUrl:
            "https://celo-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
      ],
    },
    testnet: {
      label: "Testnet",
      options: [
        {
          label: "ICP-Testnet",
          chainId: "0x5", // Goerli Testnet

          rpcUrl:
            "https://testnet.bitfinity.network",
        },
        {
          label: "Eth-Goerli",
          chainId: "0x5", // Goerli Testnet

          rpcUrl:
            "https://goerli.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Arthera-TestNet",
          chainId: "0x2803", // Ethereum Mainnet
          rpcUrl: "https://rpc-test.arthera.net",
        },
        {
          label: "Eth-Sepolia",
          chainId: "0xaa36a7", // Ethereum Mainnet
          rpcUrl:
            "https://sepolia.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Poly-Mumbai",
          chainId: "0x13881", // Ethereum Mainnet
          rpcUrl:
            "https://polygon-mumbai.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Opt-Goerli",
          chainId: "0x1a4", // Ethereum Mainnet
          rpcUrl:
            "https://optimism-goerli.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Arb-Goerli",
          chainId: "0x6f70", // Ethereum Mainnet
          rpcUrl:
            "https://arbitrum-goerli.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Avax-Fuji",
          chainId: "0xa869", // Ethereum Mainnet
          rpcUrl:
            "https://avalanche-fuji.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Near-Testnet",
          chainId: "0x4e454153", // Ethereum Mainnet
          rpcUrl:
            "https://near-testnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Aurora-Testnet",
          chainId: "0x4e454153", // Ethereum Mainnet
          rpcUrl:
            "https://aurora-testnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
        {
          label: "Celo-Alfajores",
          chainId: "0xaef3", // Ethereum Mainnet

          rpcUrl:
            "https://celo-alfajores.infura.io/v3/5f3224c8075b407fa38911977320235b",
        },
      ],
    },
  };

export default function ERC20Standard() {

   

  const navigate = useNavigate();
  const [formData, setFormData] = useLaunchPadForm();

  const { control, handleSubmit } = useForm<LaunchPadFormData>({
    defaultValues: formData,
    resolver: zodResolver(LaunchPadFormSchema),
  });

  const onSubmit = (data: LaunchPadFormData) => {
    setFormData(data);
    navigate(LaunchpadRoutes.resultPath);
  };

  return (

    

   <Form onSubmit={handleSubmit(onSubmit)}>



  
        <Section>
          <ChainSelector name="blockchain" control={control} />

       

          <SelectedChains control={control} />


          <Title>ERC20 Standard</Title>



          <SelectedChains control={control} />


          <FormInput name="name" control={control} placeholder="Name" />
          <FormInput name="Token Symbol" control={control} placeholder="Token Symbol" />

          <FormInput name="Token Supply" control={control} placeholder="Token Supply" />

          <FormInput name="Token Decimal" control={control} placeholder="Token Supply" />
          <ImageInput
            name="logo"
            control={control}
            placeholder="JPG, PNG, GIF, or SVG of no more than 3MB. We recommend 1024x1024px." />

          <Submit type="submit">Deploy</Submit>
        </Section>


        <Section>
          <Title>Functionality</Title>

          <FormInput name="Token Data" control={control} placeholder="Token Info" />

        </Section>
      </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 32px;
  background: var(--black2);

  ${media.sm} {
    padding-inline: 10px;
  }
`;

const Title = styled.h3`
  color: var(--blue);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-end: 10px;
  gap: 20px;
`;

const Title1 = styled.h3`
  color: var(--blue);
  font-size: 35px;
  font-weight: 900;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-end: 10px;
`;

const Submit = styled(Button)`
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  padding: 8px 16px;
  width: max-content;
  border-radius: 4px;
  border: none;
  background: var(--gradient1);
  cursor: pointer;
  margin: 80px 0 0 auto;
`;
function useState(arg0: boolean): [any, any] {
    throw new Error("Function not implemented.");
}

