import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const VotingCounter = () => {
  return (
    <Wrapper>
      <StyledButton>-</StyledButton>

      <Value>1</Value>

      <StyledButton>+</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 200px;
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
  width: auto;
  margin: 0;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: var(--blue);
  }
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  text-transform: capitalize;
  display: grid;
  place-items: center;
`;

export default VotingCounter;
