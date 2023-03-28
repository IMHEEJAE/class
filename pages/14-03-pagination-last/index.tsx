import { useQuery, gql } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { MouseEvent, useState } from "react";
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
  const [startPage, setStartPage] = useState(1);
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  console.log(data);
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };
  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    // setStartPage((prev) => prev + 10);
    if(startPage + 10 <= 마지막페이지)
    setStartPage(startPage + 10);
    void refetch({ page: startPage + 10 });
  };
  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
      <span onClick={onClickPrevPage}>이전페이지</span>
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <span
            key={index + startPage}
            id={String(index + startPage)}
            onClick={onClickPage}
            style={{ margin: "10px" }}
          >
            {index + startPage}
          </span>
        ))}
      <span onClick={onClickNextPage}>다음페이지</span>
    </>
  );
}
