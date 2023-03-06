import BoardWriteUI from "./BoardWrite.presenter";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";
import { IBoardWriteProps, IMyvariables } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();
  const [mycolor, setMycolor] = useState(false);
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
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
    router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`);
  };

  const onClickUpdate = async () => {
    const myvariables: IMyvariables = {
      number: Number(router.query.number),
    };
    if (writer) myvariables.writer = writer;
    if (title) myvariables.title = title;
    if (contents) myvariables.contents = contents;
    //1.수정 뮤테이션 날리기
    const result = await updateBoard({
      variables: myvariables,
    });
    //2. 상세페이지로 이동하기
    console.log(result);
    router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value && title && contents) {
      setMycolor(true);
    }
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setMycolor(true);
    }
  };
  const onChagneContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
    if (writer && title && event.target.value) {
      setMycolor(true);
    }
  };

  //html 영역(return 아래)
  return (
    <>
      {BoardWriteUI({
        onClickSubmit: onClickSubmit,
        onClickUpdate: onClickUpdate,
        onChangeWriter: onChangeWriter,
        onChangeTitle: onChangeTitle,
        onChagneContents: onChagneContents,
        mycolor: mycolor,
        isEdit: props.isEdit,
        data: props.data,
      })}
      {/* <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChagneContents={onChagneContents}
        mycolor={mycolor}
        isEdit={props.isEdit}
        data={props.data}
      /> */}
    </>
  );
}
