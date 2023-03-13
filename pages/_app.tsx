import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";

function App({ Component }: AppProps) {
  const client = new ApolloClient({
    uri: "http://practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), //나중에 하기
  });
  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
}

export default App;
