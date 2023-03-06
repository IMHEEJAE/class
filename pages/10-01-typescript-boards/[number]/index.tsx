import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;
export default function StaticRoutePage() {
  const router = useRouter();
  console.log(router);
  console.log(router.query.number);
  const { data } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number) },
  });
  const onClickMoveToEdit = () => {
    router.push(`/10-01-typescript-boards/${router.query.number}/edit`);
  };
  return (
    <>
      <div>{router.query.number}번 게시글로 이동이 완료되었습니다.</div>
      <div>작성자 : {data ? data.fetchBoard.writer : "로딩중입니다.."}</div>
      <div>제목 : {data && data.fetchBoard.title}</div>
      <div>내용 : {data?.fetchBoard.contents}</div>
      <button onClick={onClickMoveToEdit}>수정하러가기</button>
    </>
  );
}
