import styled from "@emotion/styled";
import { useEffect } from "react";
import gsap from "gsap";

type Props = {
  value: number;
  max: number;
};

const VotingProgress = ({ value, max }: Props) => {
  const classes = {
    progress: "progress-container",
    value: "progress-value",
  };

  value = max > 0 ? value * Math.ceil(100 / max) : 100;

  value = value > 100 ? 100 : value < 0 ? 0 : value;

  const animateToNewValue = () => {
    const progValue = "." + classes.value;

    const x = (100 - value) * -1;
    gsap.to(progValue, { xPercent: x, duration: 1, transformOrigin: "left center", ease: "power1.out" });
  };

  useEffect(() => {
    animateToNewValue();
  }, [value]);

  return (
    <Wrapper>
      <span>{value}%</span>

      <div>
        <Progress className={classes.value} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: min(400px, 100%);
  height: 16px;

  span {
    position: absolute;
    top: -10px;
    left: 50%;
    translate: 0 -50%;
  }

  & > div {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #d9d9d9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    border-radius: 8px;
  }
`;

const Progress = styled.div`
  position: absolute;
  /* bottom: 0; */
  left: 0;
  background-color: var(--blue);
  border-radius: inherit;
  height: inherit;
  width: 100%;
  /* transform: translateX(-100%); */
`;

export default VotingProgress;
