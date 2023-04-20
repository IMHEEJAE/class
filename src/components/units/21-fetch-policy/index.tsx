import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;
export default function FetchPolicyExample() {
  const { data } = useQuery(FETCH_BOARDS);
  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el}>
          <span>{el.writer}</span>
          <span>{el.title}</span>
        </div>
      ))}
    </>
  );
}
