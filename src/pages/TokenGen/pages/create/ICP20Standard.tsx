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
import { FormInputStyle } from "./styles/form";
import React, { useEffect, useState } from "react";





export default function ICP20Standard() {
    const [canisterInfo, setCanisterInfo] = useState('');
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch('/api/scriptInfo')
        .then((response) => response.json())
        .then((data) => {
          setCanisterInfo(data.canisterInfo);
        })
        .catch((error) => {
          console.error('Error fetching script data:', error);
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
  const [fee, setFee] = useState("");

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
console.log ('ok');      } 
else {      const text = await response.text(); // Read the response as text
      console.error('Server returned non-JSON response:', text);
  
      }
    } catch (error) {
      console.error('Error while creating a new token', error);
    }
  }
  
  
    
  
 

  return (

    

   <Form onSubmit={handleSubmit()}>



  
        <Section>
          <ChainSelector name="blockchain" control={control} />

       

          <SelectedChains control={control} />


          <Title>ICP20 Standard</Title>



          <SelectedChains control={control} />

          <div>
        <h1>Token Deployment</h1>
        <input type="text" placeholder="Logo URL" value={logo} onChange={(e: { target: { value: any; }; }) => setLogo(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e: { target: { value: any; }; }) => setName(e.target.value)} />
        <input type="text" placeholder="Symbol" value={symbol} onChange={(e: { target: { value: any; }; }) => setSymbol(e.target.value)} />
        <input type="number" placeholder="Decimals" value={decimals} onChange={(e: { target: { value: any; }; }) => setDecimals(e.target.value)} />
        <input type="number" placeholder="Total Supply" value={totalSupply} onChange={(e: { target: { value: any; }; }) => setTotalSupply(e.target.value)} />
        <input type="number" placeholder="Fee" value={fee} onChange={(e: { target: { value: any; }; }) => setFee(e.target.value)} />
        <Button onClick={deployToken}>Deploy</Button>
      </div>
      <div>
      <h1>Canister Info</h1>
      <pre>{canisterInfo}</pre>
    </div>
 

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



