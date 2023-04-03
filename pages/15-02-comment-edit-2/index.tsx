import { useQuery, gql } from "@apollo/client";
import { MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
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

  const onClickEdit = (event: MouseEvent<HTMLButtonElement>) => {
    const qqq = [...myIndex];
    qqq[Number(event.currentTarget.id)] = true;
    setMyIndex(qqq);
    console.log(qqq);
  };

  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <div key={el._id}>
          {myIndex[index] === false && (
            <div>
              <span style={{ margin: "10px" }}>{el.writer}</span>
              <span style={{ margin: "10px" }}>{el.title}</span>
              <button id={String(index)} onClick={onClickEdit}>
                수정하기
              </button>
            </div>
          )}
          {myIndex[index] === true && (
            <div>
              수정할내용
              <input type="text" />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
