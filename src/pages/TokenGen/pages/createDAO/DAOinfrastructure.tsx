import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextarea";
import ImageInput from "./components/ImageInput";
import RadioInput from "./components/RadioInput";
import ChainSelector from "./components/ChainSelector";
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



interface Account {
  owner: string;
  initialTokenAmount: number;
}

// Define the type for a proposal
interface Proposal {
  canisterId: string;
  methodName: string;
  methodArgs: string;
}

export default function DAOinfrastrucure() {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [systemParams, setSystemParams] = useState({
    transferFee: 0,
    proposalVoteThreshold: 0, // Add this line
    proposalSubmissionDeposit: 0, // Add this line
  });
  const addAccount = () => {
    setAccounts([...accounts, { owner: '', initialTokenAmount: 0 }]);
  };

  const addProposal = () => {
    setProposals([...proposals, { canisterId: '', methodName: '', methodArgs: '' }]);
  };

  const handleAccountChange = (index: number, key: keyof Account, value: string | number) => {
    const updatedAccounts: Account[] = [...accounts];
    updatedAccounts[index][key] = value;
    setAccounts(updatedAccounts);
  };

  const handleProposalChange = (index: number, key: keyof Proposal, value: string) => {
    const updatedProposals: Proposal[] = [...proposals];
    updatedProposals[index][key] = value;
    setProposals(updatedProposals);
  };


  const handleSystemParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemParams({
      ...systemParams,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    // Prepare the data for deployment
    const initData = {
      accounts,
      proposals,
      system_params: systemParams,
    };

    // TODO: Deploy using DFX deploy command with initData
  };
  
  

  return (
    <div>
      {/* Render input fields for accounts, proposals, and system params */}
      {/* Include buttons to add new accounts and proposals */}
      {/* Include input fields for system parameters */}
      {/* Add a submit button to trigger the deployment */}
<Section>
      <Button onClick={addAccount}>Add Account</Button>
      {accounts.map((account, index) => (
        <div key={index}>
          <Input
            type="text"
            placeholder="Owner Principal"
            value={account.owner}
            onChange={(e) => handleAccountChange(index, 'owner', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Initial Token Amount"
            value={account.initialTokenAmount}
            onChange={(e) => handleAccountChange(index, 'initialTokenAmount', e.target.value)}
          />
        </div>
      ))}

      <Button onClick={addProposal}>Add Proposal</Button>
      {proposals.map((proposal, index) => (
        <div key={index}>
          <Input
            type="text"
            placeholder="Canister ID"
            value={proposal.canisterId}
            onChange={(e) => handleProposalChange(index, 'canisterId', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Method Name"
            value={proposal.methodName}
            onChange={(e) => handleProposalChange(index, 'methodName', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Method Args"
            value={proposal.methodArgs}
            onChange={(e) => handleProposalChange(index, 'methodArgs', e.target.value)}
          />
        </div>
      ))}

      <div><Wrapper>
        <label>
        <Title1> Transfer Fee:</Title1> 
          <Input
            type="number"
            name="transferFee"
            value={systemParams.transferFee}
            onChange={handleSystemParamsChange}
          />
        </label>
        <label>
        <Title1>  Proposal Vote Threshold:</Title1>
          <Input
            type="number"
            name="proposalVoteThreshold"
            value={systemParams.proposalVoteThreshold}
            onChange={handleSystemParamsChange}
          />
        </label>

        <label>
         <Title1> Proposal Submission Deposit:</Title1>
          <Input
            type="number"
            name="proposalSubmissionDeposit"
            value={systemParams.proposalSubmissionDeposit}
            onChange={handleSystemParamsChange}
          />
        </label></Wrapper>
        {/* Include similar input fields for other system parameters */}
      </div>

      <Submit onClick={handleSubmit}>Deploy DAO</Submit>
      </Section>
    </div>
  );
};




const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  left: 20px;
`;

const Input = styled.input`
  ${FormInputStyle}'  
  left: 20px;
  

`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  left: 20px;
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
  font-size: 30;
  font-weight: 900;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-start: 10px;
  margin-block-end: 10px;
  gap: 20px;
  left: 20px;
`;

const Title1 = styled.h3`
  color: var(--blue);
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-end: 20px;
  margin-block-start: 20px;
  left: 20px;
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
  right: 50px;
`;



