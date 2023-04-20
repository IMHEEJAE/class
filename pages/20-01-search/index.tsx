import { useQuery, gql } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Button } from "antd";
const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
    }
  }
`;

export default function StaticRoutedBoardPage() {
  const [search, setSearch] = useState("");
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  console.log(data);
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) }); // 검색에서 refetch할 때 사용한 search 검색어가 저장되어 있는 상태이므로 추가로 search를 포함안해도 됨
  };

  const onClickSearch = () => {
    void refetch({ search, page: 1 });
  };
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      검색어 입력 : <input type="text" onChange={onChangeSearch} />
      <Button onClick={onClickSearch}>검색하기</Button>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </span>
        ))}
    </>
  );
}
