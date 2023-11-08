import styled from "@emotion/styled";
import FormInput from "./components/FormInput";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { FormInputStyle } from "./styles/form";
import axios from "axios"; // Import Axios for making HTTP requests
import { Actor, HttpAgent } from "@dfinity/agent";
import { IIConnection } from "@dfinity/auth-client";


const canisterId = "6zqe7-uuaaa-aaaaa-qacia-cai"; // Replace with your actual canister ID
const endpoint = "http://localhost:8000"; // Replace with your actual endpoint
const iiConnection = new IIConnection();

const agent = new HttpAgent({ host: endpoint });
const canister = Actor.createActor(canisterId, tokenInterface, { agent });






export default function ICP20Standard() {
    const [canisterInfo, setCanisterInfo] = useState('');
  

    const authenticateUser = async () => {
      const user = await iiConnection.authenticate();
      const userPrincipal = user.getPrincipal().toText();
      
      // Now you can use the userPrincipal in your canister interactions
      console.log("User Principal:", userPrincipal);
    };

    const user = Actor.createActor(userPrincipal, tokenInterface, { agent });
    


    const tokenInfo = {
      logo: "your_logo",
      name: "your_name",
      symbol: "your_symbol",
      decimals: "your_decimals",
      totalSupply: "your_total_supply",
      owner: "your_owner_principal",
      fee: "your_fee",
    };
    
    const deployTokenICP = async () => {
      try {
        const result = await canister.deployToken(
          tokenInfo.logo,
          tokenInfo.name,
          tokenInfo.symbol,
          tokenInfo.decimals,
          tokenInfo.totalSupply,
          tokenInfo.owner,
          tokenInfo.fee
        );
    
        console.log("Token deployed successfully:", result);
      } catch (error) {
        console.error("Error deploying token:", error);
      }
    };
    
    // Call the deployToken function when needed
    

  
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
    


 
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [totalsupply, setTotalSupply] = useState("");
const fee = '5';

  async function deployToken() {

    try {
    const tokenData = {
      logo,
      name,
      symbol,
      decimals,
      totalsupply,
      fee,
    };




    axios.post('http://localhost:5004/api/createToken', { deployedTokens: [tokenData] })
    .then(response => {
      console.log('Token deployment successful');
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  console.log('TokenData',tokenData);

        setTimeout(() => {
          fetchData();
        }, 20000); // 60,000 milliseconds = 60 seconds
      } catch (error) {
      console.error('Error while creating a new token', error);
    }
  
  


  }
  const handleFetchDataClick = () => {
    fetchData(); // Call fetchData when the button is clicked
  };
    
  
  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };


  return (

  <>
        <Section>
        
          <Title>DIP20 Standard</Title>

          <div>
        <Title1>Token Deployment</Title1>
        <Wrapper>
        <Input type="text" placeholder="Logo" value={logo}   onChange={(e) => handleInputChange(e, setLogo)}/>
        <Input type="text" placeholder="Name" value={name}   onChange={(e) => handleInputChange(e, setName)}/>
        <Input type="text" placeholder="symbol" value={symbol}   onChange={(e) => handleInputChange(e, setSymbol)}/>
        <Input type="number" placeholder="decimals" value={decimals}   onChange={(e) => handleInputChange(e, setDecimals)}/>
        <Input type="number" placeholder="Total Supply" value={totalsupply}   onChange={(e) => handleInputChange(e, setTotalSupply)}/>
        <Submit onClick={deployToken}>Deploy</Submit></Wrapper>
      </div>
      <div>
      <Title>Deployed Token</Title>
      <div dangerouslySetInnerHTML={{ __html: canisterInfo }} />
    </div>  
 
        </Section>

        <Section>
          <Title1>Functionality</Title1>


        </Section>
      </>
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



