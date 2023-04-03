import { useQuery, gql } from "@apollo/client";
import { MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import BoardCommentItem from "../../src/components/units/15-board-comment-item";
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
  const [myIndex, setMyIndex] = useState([
    false, // index 0
    false, // index 1
    false, // index 2
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <BoardCommentItem key={el._id} el={el} />
      ))}
    </>
  );
}
