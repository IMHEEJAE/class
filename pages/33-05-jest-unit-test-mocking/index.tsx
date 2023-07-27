import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;
export default function StaticRoutedBoardPage() {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [createBoard] = useMutation(CREATE_BOARD);
  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        // variables 이게 $역할을 해줌.
        createBoardInput: {
          _id: "qqq",
          writer,
          title,
          contents,
          password: "1234",
        },
      },
    });
    console.log(result);
    const boardId = result.data.createBoard._id;
    void router.push(`/boards/${boardId}`);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>): void => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const onChagneContents = (event: ChangeEvent<HTMLInputElement>): void => {
    setContents(event.target.value);
  };
  return (
    <>
      <>
        작성자 :{" "}
        <input role="input-writer" type="text" onChange={onChangeWriter} />
        <br />
        제목 : <input role="input-title" type="text" onChange={onChangeTitle} />
        <br />
        내용 :{" "}
        <input role="input-contents" type="text" onChange={onChagneContents} />
        <br />
        <button role="submit-button" onClick={onClickSubmit}>
          GRAPHQL-API(동기) 요청하기
        </button>
      </>
    </>
  );
}
