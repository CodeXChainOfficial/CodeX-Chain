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
import useLaunchPadForm from "../../data/useLaunchPadForm";
import { useNavigate } from "react-router-dom";
import { LaunchPadFormData, LaunchPadFormSchema, LaunchpadRoutes } from "../../constants";

export default function CreateLaunchpad() {
  const navigate = useNavigate();
  const { data, setData } = useLaunchPadForm();

  const { control, handleSubmit } = useForm<LaunchPadFormData>({
    defaultValues: data,
    resolver: zodResolver(LaunchPadFormSchema),
  });

  const onSubmit = (data: LaunchPadFormData) => {
    setData(data);
    navigate(LaunchpadRoutes.resultPath);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <Title>LaunchPad Configurations</Title>

        <FormInput name="name" control={control} placeholder="Name" />
        <ImageInput
          name="logo"
          control={control}
          placeholder="JPG, PNG, GIF, or SVG of no more than 3MB. We recommend 1024x1024px."
        />
        <FormTextarea name="description" control={control} placeholder="Description" />
        <FormInput name="wallet" control={control} placeholder="Connect / Link your wallet" />
      </Section>

      <Section>
        <Title>Select LaunchPad Settings</Title>

        <ChainSelector name="blockchain" control={control} />

        <RadioInput
          name="launchPadType"
          label="Select LaunchPad Type"
          control={control}
          radio={[
            { value: "centralized", label: "Centralized" },
            { value: "decentralized", label: "Decentralized" },
          ]}
        />

        <CreateDAO control={control} />

        <WalletList control={control} />

        <WalletVotingPower control={control} />

        <RadioInput
          name="incubationNeeded"
          label="Incubation Needed?"
          control={control}
          radio={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
        <RadioInput
          name="generateDashboard"
          label="Generate Dashboard?"
          control={control}
          radio={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
        <RadioInput
          name="milestoneNeeded"
          label="Milestone Needed?"
          control={control}
          radio={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
        <RadioInput
          name="currency"
          label="Choose Currency"
          control={control}
          radio={[
            { value: "usdt", label: "USDT" },
            { value: "usdc", label: "USDC" },
          ]}
        />

        <SelectedChains control={control} />
      </Section>

      <Submit type="submit">Next</Submit>
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
