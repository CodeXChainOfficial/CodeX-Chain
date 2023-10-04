import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useController } from "react-hook-form";
import { InputProps } from "../types/form";
import { LaunchPadFormData } from "..";
import { FormInputStyle } from "../styles/form";
import { media } from "@/shared/styles/media";
import useWatchLaunchPadType from "../hooks/useWatchLaunchPadType";

const WalletList = ({ control }: Pick<InputProps, "control">) => {
  const [count, setCount] = useState(1);

  const launchpadType = useWatchLaunchPadType(control);

  const { field } = useController<LaunchPadFormData, "wallets">({
    name: "wallets",
    control,
    defaultValue: [],
  });

  useEffect(() => {
    if (launchpadType !== "centralized") return;

    setCount(1);
    field.onChange({ target: { value: [] } });
  }, [launchpadType]);

  const canAddMore = field.value.length >= count && launchpadType === "decentralized";

  const handleChange = (value: string, index: number) => {
    const wallets = [...field.value];
    wallets[index] = value;
    field.onChange({ target: { value: wallets.filter((w) => w) } });
  };

  const handleClick = () => {
    if (canAddMore) setCount((prev) => ++prev);
  };

  const handleRemove = (index: number) => {
    field.onChange({ target: { value: field.value.filter((_, i) => i !== index) } });
    setCount((prev) => --prev);
  };

  if (launchpadType === "") return <></>;

  return (
    <Wrapper>
      {new Array(count).fill(0).map((item, index) => (
        <Group key={index + item}>
          <Input value={field.value[index] ?? ""} onChange={(e) => handleChange(e.target.value, index)} />

          <div className="button-group">
            <StyledButton onClick={handleClick} className={canAddMore ? "" : "disabled"}>
              Add More
            </StyledButton>

            {index > 0 && <RemoveButton onClick={() => handleRemove(index)}>Remove</RemoveButton>}
          </div>
        </Group>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const Group = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${media.sm} {
    grid-template-columns: 1fr;
  }

  & div.button-group {
    display: flex;
    gap: 20px;
  }
`;

const Input = styled.input`
  ${FormInputStyle}
`;

const StyledButton = styled(Button)`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  border-radius: 8px;
  background-color: var(--blue);
  padding: 8px 32px;
  border: 1px solid transparent;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: var(--blue);
  }
`;

const RemoveButton = styled(StyledButton)`
  background-color: var(--red);

  &:hover {
    background-color: var(--red);
  }
`;

export default WalletList;
