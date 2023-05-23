import { useQuery, gql, useMutation } from "@apollo/client";
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
const DELTETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;
export default function StaticRoutedBoardPage() {
  // 게시판에서는 refetch를 사용함!!!!!!!!!!!!!!!!!!!!!!!
  // 무한스크롤 같은 곳에서 apollo cache를 사용!!!!!!!!!!!
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  const [deleteBoard] = useMutation(DELTETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);
  const onClickDelete = (boardId: string) => () => {
    void deleteBoard({
      variables: {
        boardId,
      },
      // refetchQueries: [{ query: FETCH_BOARDS }],
      // update(cache,  qqq ) {
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              // const deletedId = qqq.data.deleteBoard;  // 구조분해할당 이렇게 해도 됨.
              const deletedId = data.deleteBoard; // 삭제된 ID
              const filterdPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId // el._id가 안되므로, readField를 사용해서 꺼내오기
              );
              return [...filterdPrev]; // 삭제된 ID를 제외한 나머지 9개를 리턴
            },
          },
        });
      },
    });
  };
  const onClickCreate = () => {
    void createBoard({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: " 제목입니다",
          contents: "내용입니다",
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };
  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </div>
      ))}
      <button onClick={onClickCreate}>등록하기</button>
    </>
  );
}
