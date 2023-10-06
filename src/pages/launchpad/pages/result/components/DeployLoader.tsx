import styled from "@emotion/styled";
import Modal from "@/shared/components/Modal";
import LoaderSvg from "@/shared/assets/LoaderSvg";
import { useConfirmationCount } from "@/pages/launchpad/data/useLaunchPad";
import CloseSvg from "@/shared/assets/CloseSvg";
import Button from "@mui/material/Button";

const DeployLoader = () => {
  const [confirmationCount, setConfirmationCount] = useConfirmationCount();

  const open = confirmationCount > 2;

  const handleClose = () => {
    setConfirmationCount(2);
  };

  return (
    <Modal open={open}>
      <Wrapper>
        <Header>
          <Title>Loading</Title>

          <Button onClick={handleClose} style={{ padding: "4px", minWidth: "auto", color: "var(--white)" }}>
            <CloseSvg />
          </Button>
        </Header>

        <Text>Wait for Automated Deployment on Vercel Server</Text>

        <StyledLoader />
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 680px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 16px;
  background: var(--black2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  color: var(--white);
  font-size: 24px;
  font-weight: 600;
  line-height: 38.4px;
  letter-spacing: 1.2px;
`;

const Text = styled.p`
  color: var(--contrast-white-90);
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 38.4px;
  letter-spacing: 1.2px;
  max-width: 350px;
  margin: 30px auto;
`;

const StyledLoader = styled(LoaderSvg)`
  margin-inline: auto;
`;

export default DeployLoader;
