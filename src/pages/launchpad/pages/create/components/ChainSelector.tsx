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
      <Empty />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  & > * {
    flex-basis: 48%;
    flex-grow: 1;
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

const Empty = styled.div`
  ${media.sm} {
    display: none;
  }
`;

export default ChainSelector;
