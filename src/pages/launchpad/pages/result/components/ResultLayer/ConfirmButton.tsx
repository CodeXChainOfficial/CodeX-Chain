import styled from "@emotion/styled";
import { useState } from "react";
import { useConfirmationCount } from "@/pages/launchpad/data/useLaunchPad";
import { Button } from "@mui/material";

const ConfirmButton = () => {
  const [isCorrect, setIsCorrect] = useState(false);

  const [confirmationCount, setConfirmationCount] = useConfirmationCount();

  const handleClick = () => {
    if (isCorrect) return;

    setConfirmationCount(confirmationCount + 1);
    setIsCorrect(true);
  };

  const text = isCorrect ? "These Values Are correct" : "Are these values correct?";

  return (
    <StyledButton onClick={handleClick} className={isCorrect ? "button-clicked" : ""}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  color: var(--contrast-white-90);
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 19.2px;
  letter-spacing: 0.6px;
  text-transform: capitalize;
  background-color: var(--blue);
  border-radius: 8px;
  margin-block-start: 40px;
  max-width: max-content;
  transition: background-color 1s ease-in-out;

  &.button-clicked {
    background-color: var(--allert-green-50);
  }
`;

export default ConfirmButton;
