import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # 변수의 타입 적는 곳
    createBoard(writer: $writer, title: $title, contents: $contents) {
      #실제 우리가 전달할 변수 적는 곳
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationInputPage() {
  const router = useRouter();
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [나의함수] = useMutation(CREATE_BOARD);
  const onClickSubmit = async () => {
    try {
      const result = await 나의함수({
        variables: {
          // variables 이게 $역할을 해줌.
          writer: writer,
          title: title,
          contents: contents,
        },
      });
      console.log(result);
      console.log(result.data.createBoard.number);
      // router.push("05-10-dynamic-routed-board-mutation/" + result.data.createBoard.number);
      router.push(
        `05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}`
      );
    } catch (error) {
      // try에 있는 내용을 시도하다가 실패하면 아랫줄 모두 무시 하고 catch가 실행됨.
      console.log(error.message);
      alert(error.message);
    }
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChagneContents = (event) => {
    setContents(event.target.value);
  };
  return (
    <>
      작성자 : <input type="text" onChange={onChangeWriter} />
      <br />
      제목 : <input type="text" onChange={onChangeTitle} />
      <br />
      내용 : <input type="text" onChange={onChagneContents} />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
