import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StaticRoutedBoardPage from "../../pages/33-05-jest-unit-test-mocking";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

it("게시글이 잘 등록되는지 테스트하자!", async () => {
  const client = new ApolloClient({
    // uri : "http://mock.com/graphql"
    link: new HttpLink({
      uri: "http://mock.com/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
  render(
    <ApolloProvider client={client}>
      <StaticRoutedBoardPage />
    </ApolloProvider>
  );
  fireEvent.change(screen.getByRole("input-writer"), {
    target: {
      value: "맹구",
    },
  });

  fireEvent.change(screen.getByRole("input-title"), {
    target: {
      value: " 안녕하세요",
    },
  });

  fireEvent.change(screen.getByRole("input-contents"), {
    target: {
      value: "반갑습니다.",
    },
  });
  fireEvent.click(screen.getByRole("submit-button"));

  await waitFor(() => {
    // expect("라우터푸쉬의 결과").toEqual("/boards/qqq");
    expect(mockRouter.asPath).toEqual("/boards/qqq");
  });
});

// 1. 렌더링
// 2. 작성자,제목,내용 인풋창에 값 입력
// 3. 등록하기 버튼 클릭
// 4. 뮤테이션 날리기
// 5. 등록된 페이지로 이동
// yarn add cross-fetch --dev
// yarn add msw
