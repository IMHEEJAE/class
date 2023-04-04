import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationInputPage() {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });
  const [나의함수] = useMutation(CREATE_BOARD);
  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: { ...inputs },
    });
    console.log(result);
  };

  const onChangeInputs = (event) => {
    setInputs({
      // writer: inputs.writer,
      // title: inputs.title,
      // contents: inputs.contents,
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      작성자 : <input id="writer" type="text" onChange={onChangeInputs} />
      <br />
      제목 : <input id="title" type="text" onChange={onChangeInputs} />
      <br />
      내용 : <input id="contents" type="text" onChange={onChangeInputs} />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
