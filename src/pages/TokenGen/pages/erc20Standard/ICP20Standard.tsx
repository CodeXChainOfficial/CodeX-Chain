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
import { FormInputStyle } from "./styles/form";






export default function ICP20Standard() {
    const [canisterInfo, setCanisterInfo] = useState('');
  
 
  
    const fetchData = () => {
      fetch('http://localhost:5004/api/scriptInfo')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const canisterIdMatch = data.storedCanisterInfo.match(/Canister ID: ([^\s,]+)/);
          const canisterId = canisterIdMatch ? canisterIdMatch[1] : "";
          const baseUrl = "http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=";
          const generatedLink = baseUrl + canisterId;
  
          // Create a clickable link
          const clickableLink = `<a href="${generatedLink}" target="_blank">${data.storedCanisterInfo}</a>`;
  
          setCanisterInfo(clickableLink);
        })
        .catch((error) => {
          console.error('Error fetching storedCanisterInfo:', error);
        });
    };
    

  const navigate = useNavigate();
  const [formData, setFormData] = useLaunchPadForm();

  const { control, handleSubmit } = useForm<LaunchPadFormData>({
    defaultValues: formData,
    resolver: zodResolver(LaunchPadFormSchema),
  });

  const onSubmit = (data: LaunchPadFormData) => {
    setFormData(data);
  };
 
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
const fee = '5';

  async function deployToken() {
    const tokenData = {
      logo,
      name,
      symbol,
      decimals,
      totalSupply,
      fee,
    };
  console.log('TokenData',tokenData);
    try {
      const response = await fetch('http://localhost:5004/api/createToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify(tokenData),
      });
  
      if (response.ok) {
        console.log('Token deployment successful');
        
        // Wait for 60 seconds before fetching data
        setTimeout(() => {
          fetchData();
        }, 20000); // 60,000 milliseconds = 60 seconds
      } else {
        const text = await response.text();
        console.error('Token deployment failed. Server response:', text);
      }
    } catch (error) {
      console.error('Error while creating a new token', error);
    }
  }
  
  const handleFetchDataClick = () => {
    fetchData(); // Call fetchData when the button is clicked
  };
    
  
 

  return (

    

    <Form onSubmit={handleSubmit(onSubmit)}>



  
        <Section>
        


          <Title>DIP20 Standard</Title>




          <div>
        <Title1>Token Deployment</Title1>
        <Wrapper>
        <Input type="text" placeholder="Logo URL" value={logo} onChange={(e: { target: { value: any; }; }) => setLogo(e.target.value)} />
        <Input type="text" placeholder="Name" value={name} onChange={(e: { target: { value: any; }; }) => setName(e.target.value)} />
        <Input type="text" placeholder="Symbol" value={symbol} onChange={(e: { target: { value: any; }; }) => setSymbol(e.target.value)} />
        <Input type="number" placeholder="Decimals" value={decimals} onChange={(e: { target: { value: any; }; }) => setDecimals(e.target.value)} />
        <Input type="number" placeholder="Total Supply" value={totalSupply} onChange={(e: { target: { value: any; }; }) => setTotalSupply(e.target.value)} />
        <Submit onClick={deployToken}>Deploy</Submit></Wrapper>
      </div>
      <div>
      <Title>Deployed Token</Title>
      <div dangerouslySetInnerHTML={{ __html: canisterInfo }} />
    </div>  
 

        
        </Section>


        <Section>
          <Title1>Functionality</Title1>

          <FormInput name="Token Data" control={control} placeholder="Token Info" />

        </Section>
      </Form>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  ${FormInputStyle}
`;


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

const Title = styled.h1`
  color: var(--white);
  font-size: 20px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-end: 30px;
  gap: 30px;
`;

const Title1 = styled.h3`
  color: var(--blue);
  font-size: 20px;
  font-weight: 600;
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
  margin: 30px 0 0 auto;
`;



