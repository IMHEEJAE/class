import BoardWriteUI from "./BoardWrite.presenter";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";

export default function BoardWrite(props) {
  const router = useRouter();
  const [mycolor, setMycolor] = useState(false);
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [나의함수] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables 이게 $역할을 해줌.
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    router.push(`/08-05-boards/${result.data.createBoard.number}`);
  };

  const onClickUpdate = async () => {
    //1.수정 뮤테이션 날리기
    const result = await updateBoard({
      variables: {
        number: Number(router.query.number),
        writer,
        title,
        contents,
      },
    });
    //2. 상세페이지로 이동하기
    console.log(result);
    router.push(`/08-05-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (event.target.value && title && contents) {
      setMycolor(true);
    }
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setMycolor(true);
    }
  };
  const onChagneContents = (event) => {
    setContents(event.target.value);
    if (writer && title && event.target.value) {
      setMycolor(true);
    }
  };

  //html 영역(return 아래)
  return (
    <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChagneContents={onChagneContents}
      mycolor={mycolor}
      isEdit={props.isEdit}
    />
  );
}
