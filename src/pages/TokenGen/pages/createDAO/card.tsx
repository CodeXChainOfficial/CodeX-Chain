import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--black2);
  padding: 20px;
  gap: 10px;
  min-height: 350px; /* Define the minimum height for the card */

  transition: border-color 0.3s; /* Add a transition effect for smooth color change */

  /* Define the default border color */
  border: 2px solid transparent;

  &:hover {
    /* Define the border color when hovering over the card */
    border-color: var(--blue);
  }
  
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

const Description = styled.p`
  font-size: 16px;
  color: var(--white);
  max-height: 130px; /* Define the maximum height for the description */
  overflow: auto; /* Add a scrollbar if the description overflows */
`;

const DeployButton = styled(Button)`
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  padding: 4px 8px;
  width: max-content;
  border-radius: 4px;
  border: none;
  background: var(--gradient1);
  cursor: pointer;
  margin: 80px 0 0 auto;
`;

export default function ERC20Item({ name, description }) {
    const routeLink = `../${name.replace(" ", "")}`;

  return (
    <Link to={routeLink}>

    <Card>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <DeployButton>Select</DeployButton>
    </Card>
    </Link>
  );
}
