import styled from "@emotion/styled";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextarea";
import ImageInput from "./components/ImageInput";
import RadioInput from "./components/RadioInput";
import ChainSelector from "./components/ChainSelector";

const Schema = z.object({
  // name: z.string().min(3, "Name must contain at least 3 characters"),
  name: z.string().optional(),
  logo: z.string().optional(), // will be set to the path of the file.
  description: z.string().optional(),
  wallet: z.string().optional(),
  launchPadType: z.string().optional(),
  incubationNeeded: z.boolean().optional(),
  milestoneNeeded: z.boolean().optional(),
  deployType: z.string().optional(),
  blockchain: z.string().optional(),
});

type FormData = z.infer<typeof Schema>;

export default function CreateLaunchpad() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      wallet: "",
      description: "",
      logo: "",
      launchPadType: "",
      incubationNeeded: false,
      milestoneNeeded: false,
      deployType: "",
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
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

        <RadioInput
          name="launchPadType"
          label="Select LaunchPad Type"
          control={control}
          radio={[
            { value: "centralized", label: "Centralized" },
            { value: "decentralized", label: "Decentralized" },
          ]}
        />
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
          name="milestoneNeeded"
          label="Milestone Needed?"
          control={control}
          radio={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
        <RadioInput
          name="deployType"
          label="Deploy Option"
          control={control}
          radio={[
            { value: "single-chain", label: "Single-chain" },
            { value: "multi-chain", label: "Multi-chain" },
          ]}
        />

        <ChainSelector name="blockchain" control={control} />
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
  gap: 15px;
  padding: 30px 32px;
  background: var(--black2);
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

const Submit = styled.button`
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
