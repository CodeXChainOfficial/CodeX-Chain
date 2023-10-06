import styled from "@emotion/styled";
import { media } from "@/shared/styles/media";
import ResultLayerHeader from "./Header";

type Props = {
  title: string;
};

export const ResultLayer = () => {
  return (
    <Section>
      <ResultLayerHeader title="Title" />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 32px;
  background: var(--black2);
  height: 200px;
  margin-block-end: 20px;
  border-radius: 8px;

  ${media.sm} {
    padding-inline: 10px;
  }
`;

const Stack = styled.div``;
