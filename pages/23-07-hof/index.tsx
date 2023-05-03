import { useQuery, gql } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { MouseEvent } from "react";
const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`;

export default function StaticRoutedBoardPage() {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  console.log(data);
  const onClickPage =
    (boardId: number) => (event: MouseEvent<HTMLSpanElement>) => {
      void refetch({ page: boardId });
    };
  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <span key={index + 1} onClick={onClickPage(index + 1)}>
            {index + 1}
          </span>
        ))}
    </>
  );
}
// onClickPage(index+1)(event)
