import { graphql } from "msw";

const gql = graphql.link("http://mock.com/graphql");

export const apis = [
  gql.mutation("createBoard", (req, res, ctx) => {
    const { writer, title, contents } = req.variables.createBoardInput;

    return res(
      ctx.data({
        createBoardInput: {
          _id: "qqq",
          writer,
          title,
          contents,
          __typename: "Board",
        },
      })
    );
  }),
  //   gql.query("fetchBoards", () => {})
];
