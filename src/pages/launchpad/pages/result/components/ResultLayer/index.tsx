import styled from "@emotion/styled";
import { media } from "@/shared/styles/media";
import ResultLayerHeader from "./Header";

type ResultItem = {
  name: string;
  value: string;
  type?: "logo";
};

type Props = {
  title: string;
  list: ResultItem[];
};

export const ResultLayer = ({ title, list }: Props) => {
  return (
    <Section>
      <ResultLayerHeader title="Title" />

      <Stack>
        {list.map((item) => (
          <>
            <Item>{item.name}</Item>
            <Item>{item.value}</Item>
          </>
        ))}
      </Stack>
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

const Stack = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

const Item = styled.div`
  color: var(--contrast-white-90);
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  text-transform: capitalize;
`;
