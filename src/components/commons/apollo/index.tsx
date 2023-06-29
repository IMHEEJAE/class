import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  gql,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../commons/store";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}
export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  //   1. 프리렌더링 예제 - process.browser 방법
  //   if (process.browser) {
  //     console.log("지금은 브라우저다!!!");
  //     const result = localStorage.getItem("accessToken");
  //     console.log(result);
  //     if (result) setAccessToken(result);
  //   } else {
  //     console.log("지금은 프론트엔드 서버(yarn dev 서버)");
  //     const result = localStorage.getItem("accessToken");
  //     console.log(result);
  //     if (result) setAccessToken(result);
  //   }

  //   2. 프리렌더링 예제 - typeof windeow 방법
  //   if (typeof window !== "undefined") {
  //     console.log("지금은 브라우저다!!!");
  //     const result = localStorage.getItem("accessToken");
  //     console.log(result);
  //     if (result) setAccessToken(result);
  //   } else {
  //     console.log("지금은 프론트엔드 서버(yarn dev 서버)");
  //     const result = localStorage.getItem("accessToken");
  //     console.log(result);
  //     if (result) setAccessToken(result);
  //   }

  // 3. 프리렌더링 무시 - useEffect 방법
  useEffect(() => {
    // 1. 기존방식(refreshToken 이전)
    // const result = localStorage.getItem("accessToken");
    // if (result) setAccessToken(result);

    // 2. 새로운방식(refreshToken 이후)
    void aaa.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  // const result = localStorage.getItem("accessToken");
  // console.log(result);
  // if (result) setAccessToken(result);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, //  Authorization: `Bearer ${accessToken}`  => 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken}`, // 3-2 토큰만 새걸로 바꿔치기
                },
              });
              // 3-3. 방금 수정한 쿼리 재요청하기
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    // uri: "http://practice.codebootcamp.co.kr/graphql",
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE, // 페이지 전환(_APP.tsx리랜더) 되어도 , 캐시 유지
  });

  // prettier-ignore
  return (
    <>
      <ApolloProvider client={client}>
        {props.children}
        </ApolloProvider>
    </>
  );
}
