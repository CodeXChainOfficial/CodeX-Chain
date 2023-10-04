import styled from "@emotion/styled";

type Props = {
  value: number;
  max: number;
};

const VotingProgress = ({ value }: Props) => {
  return (
    <Wrapper>
      <Progress />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 400px;
  height: 16px;
  border-radius: 8px;
  background-color: #d9d9d9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--blue);
  border-radius: inherit;
  height: inherit;
`;

export default VotingProgress;
