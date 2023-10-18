import styled from "@emotion/styled";
import { media } from "@/shared/styles/media";
import ResultLayerHeader from "./Header";
import ConfirmButton from "./ConfirmButton";

type ResultItem = {
  name?: string;
  value?: string | number;
  type?: "logo";
};

type Props = {
  title: string;
  list: ResultItem[];
};

export const ResultLayer = ({ title, list }: Props) => {
  return (
    <Section>
      <ResultLayerHeader title={title} />

      {list.map((item, idx) => (
        <Group key={idx + 1}>
          <Item>{item.name || "Item"}</Item>
          <Item>{item.value || "Not set"}</Item>
        </Group>
      ))}

      <ConfirmButton />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 30px 32px;
  background: var(--black2);
  /* height: 200px; */
  margin-block-end: 20px;
  border-radius: 8px;
  /* border: 1px solid white; */

  ${media.sm} {
    padding-inline: 10px;
  }
`;

const Group = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Item = styled.div`
  color: var(--contrast-white-90);
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  text-transform: capitalize;
`;
