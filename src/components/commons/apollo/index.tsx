import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
export default function ApolloSetting(props) {
  const client = new ApolloClient({
    uri: "http://practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), // 나중에 하기
  });

  // prettier-ignore
  return (
    <>
      <ApolloProvider client={client}>
        <div>zzzzAAABBBCCCDDDEEEFFF</div>
        {props.children}
        </ApolloProvider>
    </>
  );
}
