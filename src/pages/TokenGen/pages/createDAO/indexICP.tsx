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
import { useLaunchPadForm } from "../../../launchpad/data/useLaunchPad"
import { useNavigate } from "react-router-dom";
import { LaunchPadFormData, LaunchPadFormSchema, LaunchpadRoutes } from '../../../launchpad/constants'
import React, { Key, useEffect, useState } from "react";
import { Container, Grid } from '@mui/material';
import ERC20Item from './card';


 






export default function CreateTokenICP() {



  const [principal, setPrincipal] = useState<string | null>(null);
  const [agent, setAgent] = useState<object | null>(null);
  const [actor, setActor] = useState<object | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const principalParam = url.searchParams.get("principal");
    const agentParam = url.searchParams.get("agent");
    const actorParam = url.searchParams.get("actor");

    if (principalParam) {
      setPrincipal(principalParam);
    }

    if (agentParam) {
      setAgent(JSON.parse(agentParam));
    }

    if (actorParam) {
      setActor(JSON.parse(actorParam));
    }
  }, []);

  const ICP20Contracts = [
    {
      name: 'ICP20 Standard',
      description: 'A standard ICP20 token with basic functionality like transfer, balanceOf, and approve.',
    },
    {
      name: 'ICP20 Advance',
      description: 'Burnable ERC-20: An ERC-20 token with the additional ability to burn (destroy) tokens. This is useful for reducing the total supply Pausable ERC-20: An ERC-20 token that can be paused, preventing any transfers or token operations during a specific period. This can be useful in emergencies or to implement compliance, Mintable ERC-20: In contrast to burnable, this type allows new tokens to be created or "minted" as needed. It can be controlled by the contract owner to add new tokens to the supply.',
    },
    {
      name: 'ICP20 Liquidity',
      description: 'An ICP20 token designed for providing liquidity in decentralized exchanges.',
    },
    {
      name: 'ICP20 Governance',
      description: 'These tokens are used for governance in decentralized autonomous organizations (DAOs) or other voting-based systems. Token holders have voting rights proportional to the number of tokens they hold.',
    },
    {
      name: 'ICP20 Vesting',
      description: 'Tokens that are released to holders over a period of time. This can be used for team tokens, advisors, or any situation where you want to incentivize long-term holding.',
    },
    {
      name: 'ICP20 Airdrop',
      description: 'An ICP20 token used for distributing tokens via airdrops.',
    },
    {
      name: 'ICP20 Wrapped',
      description: 'Tokens that represent assets on another blockchain. For example, wrapped Bitcoin (WBTC) is an ERC-20 token that represents Bitcoin on the Ethereum blockchain.',
    },
    {
      name: 'ICP20 Rebate',
      description: 'Tokens that provide rebates, discounts, or rewards for using a particular service.',
    },
  ];

  const NFTContracts = [
    {
      name: 'ERC721 Standard',
      description: 'The ERC721Base smart contract implements the ERC721 NFT standard, along with the ERC721A optimization to the standard. It allows you to mint NFTs to yourself (or to someone else) and selling those NFTs on a marketplace.',
    
    },
    {
      name: 'ERC721 Collection',
      description: 'Burnable ERC-20: An ERC-20 token with the additional ability to burn (destroy) tokens. This is useful for reducing the total supply Pausable ERC-20: An ERC-20 token that can be paused, preventing any transfers or token operations during a specific period. This can be useful in emergencies or to implement compliance, Mintable ERC-20: In contrast to burnable, this type allows new tokens to be created or "minted" as needed. It can be controlled by the contract owner to add new tokens to the supply.',
    },
    {
      name: 'ERC721 Delayed Reveal',
      description: 'An ICP20 token designed for providing liquidity in decentralized exchanges.',
    },
    {
      name: 'ERC721 Drop',
      description: 'These tokens are used for governance in decentralized autonomous organizations (DAOs) or other voting-based systems. Token holders have voting rights proportional to the number of tokens they hold.',
    },
    {
      name: 'ERC721 Lezy Mint',
      description: 'Tokens that are released to holders over a period of time. This can be used for team tokens, advisors, or any situation where you want to incentivize long-term holding.',
    },
    {
      name: 'ERC721 Signature Mint',
      description: 'An ICP20 token used for distributing tokens via airdrops.',
    },
    {
      name: 'ERC721 Wrapped',
      description: 'Tokens that represent assets on another blockchain. For example, wrapped Bitcoin (WBTC) is an ERC-20 token that represents Bitcoin on the Ethereum blockchain.',
    },
    {
      name: 'ERC721 Rebate',
      description: 'Tokens that provide rebates, discounts, or rewards for using a particular service.',
    },
  ];


  const ICP20List = () => {
    const ICP20Contracts = [
      {
        name: 'ICP20 Standard',
        description: 'A standard ICP20 token with basic functionality like transfer, balanceOf, and approve.',
      },
      {
        name: 'ICP20 Advance',
        description: 'Burnable ERC-20: An ERC-20 token with the additional ability to burn (destroy) tokens. This is useful for reducing the total supply Pausable ERC-20: An ERC-20 token that can be paused, preventing any transfers or token operations during a specific period. This can be useful in emergencies or to implement compliance, Mintable ERC-20: In contrast to burnable, this type allows new tokens to be created or "minted" as needed. It can be controlled by the contract owner to add new tokens to the supply.',
      },
      {
        name: 'ICP20 Liquidity',
        description: 'An ICP20 token designed for providing liquidity in decentralized exchanges.',
      },
      {
        name: 'ICP20 Governance',
        description: 'These tokens are used for governance in decentralized autonomous organizations (DAOs) or other voting-based systems. Token holders have voting rights proportional to the number of tokens they hold.',
      },
      {
        name: 'ICP20 Vesting',
        description: 'Tokens that are released to holders over a period of time. This can be used for team tokens, advisors, or any situation where you want to incentivize long-term holding.',
      },
      {
        name: 'ICP20 Airdrop',
        description: 'An ICP20 token used for distributing tokens via airdrops.',
      },
      {
        name: 'ICP20 Wrapped',
        description: 'Tokens that represent assets on another blockchain. For example, wrapped Bitcoin (WBTC) is an ERC-20 token that represents Bitcoin on the Ethereum blockchain.',
      },
      {
        name: 'ICP20 Rebate',
        description: 'Tokens that provide rebates, discounts, or rewards for using a particular service.',
      },
    ];
  }
  const NFTlist = () => {
    const NFTContracts = [
      {
        name: 'ERC721 Standard',
        description: 'The ERC721Base smart contract implements the ERC721 NFT standard, along with the ERC721A optimization to the standard. It allows you to mint NFTs to yourself (or to someone else) and selling those NFTs on a marketplace.',
      },
      {
        name: 'ERC721 Collection',
        description: 'Burnable ERC-20: An ERC-20 token with the additional ability to burn (destroy) tokens. This is useful for reducing the total supply Pausable ERC-20: An ERC-20 token that can be paused, preventing any transfers or token operations during a specific period. This can be useful in emergencies or to implement compliance, Mintable ERC-20: In contrast to burnable, this type allows new tokens to be created or "minted" as needed. It can be controlled by the contract owner to add new tokens to the supply.',
      },
      {
        name: 'ERC721 Delayed Reveal',
        description: 'An ICP20 token designed for providing liquidity in decentralized exchanges.',
      },
      {
        name: 'ERC721 Drop',
        description: 'These tokens are used for governance in decentralized autonomous organizations (DAOs) or other voting-based systems. Token holders have voting rights proportional to the number of tokens they hold.',
      },
      {
        name: 'ERC721 Lezy Mint',
        description: 'Tokens that are released to holders over a period of time. This can be used for team tokens, advisors, or any situation where you want to incentivize long-term holding.',
      },
      {
        name: 'ERC721 Signature Mint',
        description: 'An ICP20 token used for distributing tokens via airdrops.',
      },
      {
        name: 'ERC721 Wrapped',
        description: 'Tokens that represent assets on another blockchain. For example, wrapped Bitcoin (WBTC) is an ERC-20 token that represents Bitcoin on the Ethereum blockchain.',
      },
      {
        name: 'ERC721 Rebate',
        description: 'Tokens that provide rebates, discounts, or rewards for using a particular service.',
      },
    ];
  }
  
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

    <>

<div>
  <h1>ICP Data</h1>
  <div>
    <strong>Principal:</strong> {principal}
  </div>
  <div>
    <strong>Agent:</strong>
    <pre>{JSON.stringify(agent, null, 2)}</pre>
  </div>
  <div>
    <strong>Actor:</strong>
    <pre>{JSON.stringify(actor, null, 2)}</pre>
  </div>
</div>

    
    <Form onSubmit={handleSubmit(onSubmit)}>


        <Title1>Smart Contract Selection</Title1>

        <Container>
          <Title>ICP20 Smart Contracts</Title>
          <Grid container spacing={3}>
            {ICP20Contracts.map((contract: { name: any; description: any; }, index: Key | null | undefined) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ERC20Item name={contract.name} description={contract.description} />
              </Grid>
            ))}
          </Grid>
        </Container>


        <Container>
          <Title>NFTs Smart Contracts</Title>
          <Grid container spacing={3}>
            {NFTContracts.map((contract: { name: any; description: any; }, index: Key | null | undefined) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ERC20Item name={contract.name} description={contract.description} />
              </Grid>
            ))}
          </Grid>
        </Container>

        <Section>
          <ChainSelector name="blockchain" control={control} />



          <SelectedChains control={control} />


          <Title>Token Configuration</Title>



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
          <Title>My Tokens</Title>

          <FormInput name="Token Data" control={control} placeholder="Token Info" />

        </Section>
      </Form></> 
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
