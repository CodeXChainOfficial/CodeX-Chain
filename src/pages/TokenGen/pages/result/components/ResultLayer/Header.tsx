import { LaunchpadRoutes } from "@/pages/launchpad/constants";
import { useConfirmationCount } from "@/pages/launchpad/data/useLaunchPad";
import EditSvg from "@/shared/assets/EditSvg";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResultLayerHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const [_, setConfirmationCount] = useConfirmationCount();

  const handleClick = () => {
    navigate(LaunchpadRoutes.rootPath);
    setConfirmationCount(0);
  };

  return (
    <Wrapper>
      <Title>{title}</Title>

      <Button onClick={handleClick} style={{ padding: 0, minWidth: "auto", width: 30, height: 30 }}>
        <EditSvg />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block-end: 20px;
`;

const Title = styled.h4`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
`;

export default ResultLayerHeader;
