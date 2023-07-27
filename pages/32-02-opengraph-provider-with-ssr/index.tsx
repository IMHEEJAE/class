// 제공자일때 => 네이버, 다음, 쿠팡

import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";
import { IQuery } from "../../src/commons/types/generated/types";
const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;

export default function OpengraphProviderPage(props: any) {
  console.log("========");
  console.log(props);
  console.log("========");

  return (
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0]} />
      </Head>
      <div>
        중고마켓에 오신 것을 환영합니다!(여기는 body이므로, 미리보기 상관없음!!)
      </div>
    </>
  );
}

// 1. getServerSideProps는 존재하는 단어이므로 변경이 불가능합니다.
// 2. getServerSideProps는 프론트엔드 서버에서만 실행됩니다.(Webpack 프론트엔드 서버프로그램)
export const getServerSideProps = async (): Promise<any> => {
  console.log("여기는 서버입니다!");

  // 1. 여기서 API 요청 - 아폴로 세딩이 되어있지 않아 grqphql-request를 이용해야 합니다.
  const graphQLClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql"
  );
  const result = await graphQLClient.request<Pick<IQuery, "fetchUseditem">>(
    FETCH_USEDITEM,
    {
      useditemId: "64b0f1c25d6eaa0029f77482",
    }
  );

  // 2. 받은 결과를 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};
