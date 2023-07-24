import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";
import { WrapAsync } from "../../src/commons/libraries/AsyncFunc";
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOADE_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
export default function ImageUploadePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();
  const [나의함수] = useMutation(CREATE_BOARD);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOADE_FILE);

  const onClickSubmit = async () => {
    // 1. uploadFile
    const resultFile = await uploadFile({ variables: { file } });
    const url = resultFile.data?.uploadFile.url;

    // 2. createBoard

    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다",
          contents: "내용입니다.",
          images: [url],
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file === undefined) return;
    console.log(file);
    // try {
    //   const result = await uploadFile({
    //     variables: { file },
    //   });
    //   setImageUrl(result.data?.uploadFile.url ?? "");
    // } catch (error) {
    //   if (error instanceof Error) Modal.error({ content: error.message });
    // }

    // 1. 임시 URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
    // const result = URL.createObjectURL(file);
    // console.log(result);

    // 2. 임시 URL 생성 => (진짜URL - 다른 브라우저에서 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log(event.target?.result);
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result);
        setFile(file);
      }
    };
  };

  return (
    <>
      <input type="file" onChange={WrapAsync(onChangeFile)} />
      <img src={imageUrl} />
      <button onClick={WrapAsync(onClickSubmit)}> 게시글 등록</button>
    </>
  );
}
