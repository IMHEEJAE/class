import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

const FETCH_BOARD = gql`
  query fetchBoards {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;
const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  width: 25%;
`;
export default function StaticRoutedBoardPage() {
  const { data } = useQuery(FETCH_BOARD);
  console.log(data?.fetchBoards);
  return (
    <>
      {data?.fetchBoards.map((el) => {
        return (
          <Row>
            <Column>
              <input type="checkbox" />
            </Column>
            <Column>{el.number}</Column>
            <Column>{el.title}</Column>
            <Column>{el.contents}</Column>
          </Row>
        );
      })}
    </>
  );
}
