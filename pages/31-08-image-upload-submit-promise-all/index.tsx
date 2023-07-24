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
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>();

  const [나의함수] = useMutation(CREATE_BOARD);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOADE_FILE);

  const onClickSubmit = async (): Promise<void> => {
    if (files === undefined) return;
    // 1. uploadFile
    // 1-1) 안좋은예제 - await를 매번 기다림 => for문 사용해도 마찬가지 (이유 : i 값에 의존하기 때문에..)
    // const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    // const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    // const url0 = resultFile0.data?.uploadFile.url;
    // const url1 = resultFile1.data?.uploadFile.url;
    // const url2 = resultFile2.data?.uploadFile.url;
    // const reulstUrls = [url0, url1, url2];

    // 1-2) 좋은예제 - Promise.all 사용
    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);
    // console.log(results);

    // const resultUrls = results.map((el) => el.data?.uploadFile.url); // [url0, url1, url2]

    // 1-3) Promise.all 사용 => 리팩토링
    // const files = [File0, File1, File2];
    // files.map((el) => uploadFile({ variables: { file: el } }));
    const results = await Promise.all(
      files.map(async (el) => await uploadFile({ variables: { file: el } }))
    );
    console.log(results);
    const resultUrls = results.map((el) => el.data?.uploadFile.url);

    // 2. createBoard

    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다",
          contents: "내용입니다.",
          images: resultUrls,
        },
      },
    });
    console.log(result);
  };

  const onChangeFile =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
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
      if (files === undefined) return;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        console.log(event.target?.result);
        if (typeof event.target?.result === "string") {
          const tempUrls = [...imageUrls];
          tempUrls[index] = event.target?.result;
          setImageUrls(tempUrls);

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };

  return (
    <>
      <input type="file" onChange={WrapAsync(onChangeFile(1))} />
      <input type="file" onChange={WrapAsync(onChangeFile(2))} />
      <input type="file" onChange={WrapAsync(onChangeFile(3))} />
      <img src={imageUrls[0]} />
      <img src={imageUrls[1]} />
      <img src={imageUrls[2]} />
      <button onClick={WrapAsync(onClickSubmit)}> 게시글 등록</button>
    </>
  );
}
