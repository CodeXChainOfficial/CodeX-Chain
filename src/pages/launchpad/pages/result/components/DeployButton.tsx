import { useConfirmationCount } from "@/pages/launchpad/data/useLaunchPad";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const DeployButton = () => {
  const [confirmationCount, setConfirmationCount] = useConfirmationCount();

  const handleClick = () => {
    setConfirmationCount(3);
  };

  return (
    <StyledButton disabled={confirmationCount < 2} onClick={handleClick}>
      Autodeploy
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
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
  text-transform: none;
`;

export default DeployButton;
