import styled from "@emotion/styled";
import { useController } from "react-hook-form";
import { InputProps } from "../types/form";
import { media } from "@/shared/styles/media";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const ChainSelector = ({ name, control, rules, required }: InputProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: { required, ...rules },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSelect = () => {};

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const list = ["something", "another", "anotheddkdk"];

  const className = fieldState.isTouched && fieldState.error ? "error" : "";

  return (
    <Wrapper>
      <StyledButton
        {...field}
        className={className}
        aria-controls={open ? "basic-menu-1696310813263" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Select Chain
      </StyledButton>

      <Menu
        id="basic-menu-1696310813263"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {list.map((item, idx) => (
          <MenuItem key={idx} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
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
  margin-block-start: 20px;

  &.error {
    color: var(--red);
  }

  &:hover {
    background-color: var(--blue);
  }
`;

export default ChainSelector;
