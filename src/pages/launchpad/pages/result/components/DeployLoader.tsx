import { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@/shared/components/Modal";

const DeployLoader = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {};

  return (
    <Modal open={open}>
      <Wrapper>
        <Title>Loading</Title>

        <Text>Wait for Automated Deployment on Vercel Server</Text>
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
  border-radius: 16px;
  background: var(--black2);
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

export default DeployLoader;
