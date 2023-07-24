// import { gql, useMutation } from "@apollo/client";
// import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import { WrapAsync } from "../../src/commons/libraries/AsyncFunc";
// import {
//   IMutation,
//   IMutationUploadFileArgs,
// } from "../../src/commons/types/generated/types";
// const UPLOADE_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;
export default function ImageUploadePage() {
  const [imageUrl, setImageUrl] = useState("");
  //   const [uploadFile] = useMutation<
  //     Pick<IMutation, "uploadFile">,
  //     IMutationUploadFileArgs
  //   >(UPLOADE_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file === undefined) return;
    // try {
    //   const result = await uploadFile({
    //     variables: { file },
    //   });
    //   setImageUrl(result.data?.uploadFile.url ?? "");
    // } catch (error) {
    //   if (error instanceof Error) Modal.error({ content: error.message });
    // }

    // 1. 임시 URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
    const result = URL.createObjectURL(file);
    console.log(result);

    // 2. 임시 URL 생성 => (진짜URL - 다른 브라우저에서 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log(event.target?.result);
      if (typeof event.target?.result === "string")
        setImageUrl(event.target?.result);
    };
  };

  return (
    <>
      <input type="file" onChange={WrapAsync(onChangeFile)} />
      <img src={imageUrl} />
    </>
  );
}
