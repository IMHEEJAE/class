import { gql, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import { IQuery } from "../../src/commons/types/generated/types";
const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LoginSuccess() {
  // 1. 페이지 접속하면 자동으로 data에 받아지고(data는 그로벌스테이트 저장), 리렌더링됨
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // 2. 버튼 클릭시 data에 받아지고(data는 글로벌스테이트 저장), 리렌더링됨
  // cosnt[(나의함수, { data })] = useLazyQuery(FETCH_USER_LOGGED_IN);

  // 3. axios처럼 사용하는 방법(data는 글로벌스테이트에 저장)
  // const client = useApolloClient()
  // client.query() <==> axios.get()

  const client = useApolloClient();
  const onClickBtn = async (): Promise<void> => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
    console.log(result);
  };

  return <button onClick={onClickBtn}>클릭하세요</button>;
  // return <>{data?.fetchUserLoggedIn.name}님 환영합니다.</>;
}
