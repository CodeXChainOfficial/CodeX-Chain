import styled from "@emotion/styled";
import { useController } from "react-hook-form";
import { InputProps } from "../types/form";
import { media } from "@/shared/styles/media";

const ChainSelector = ({ name, control, rules, required }: InputProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: { required, ...rules },
  });

  const handleSelect = () => {};

  const handleClick = () => {};

  const className = fieldState.isTouched && fieldState.error ? "error" : "";

  return (
    <Wrapper>
      <Button {...field} className={className} onClick={handleClick}>
        Select Chain
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px 1fr;

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  border-radius: 8px;
  background: var(--blue);
  padding: 8px 32px;
  border: 1px solid transparent;
  cursor: pointer;
  margin-block-start: 20px;

  &.error {
    color: var(--red);
  }
`;

export default ChainSelector;
