import { useQuery, gql } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { ChangeEvent, MouseEvent, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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
  const [keyword, setKeyword] = useState("");
  // const [search, setSearch] = useState("");
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  console.log(data);
  const onClickPage = (value: any, event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  // const onClickSearch = () => {
  //   void refetch({ search, page: 1 });
  // };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
    setKeyword(value);
  }, 500);
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // setSearch(event.target.value);
    getDebounce(event.target.value);
  };
  return (
    <>
      검색어 입력 : <input type="text" onChange={onChangeSearch} />
      {/* <Button onClick={onClickSearch}>검색하기</Button> */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>
            {el.title
              .replaceAll(keyword, `#$%${keyword}#$%`)
              .split("#$%")
              .map((el) => (
                <span
                  key={uuidv4()}
                  style={{ color: el === keyword ? "red" : "black" }}
                >
                  {el}
                </span>
              ))}
          </span>
        </div>
      ))}
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <span
            key={index + 1}
            id={String(index + 1)}
            onClick={onClickPage}
            style={{ margin: "10px" }}
          >
            {index + 1}
          </span>
        ))}
    </>
  );
}
