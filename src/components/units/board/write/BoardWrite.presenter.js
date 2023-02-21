import { BlueButton, RedInput } from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  return (
    <>
      작성자 : <RedInput type="text" onChange={props.onChangeWriter} />
      <br />
      제목 : <input type="text" onChange={props.onChangeTitle} />
      <br />
      내용 : <input type="text" onChange={props.onChagneContents} />
      <br />
      <BlueButton onClick={props.onClickSubmit}>
        GRAPHQL-API(동기) 요청하기
      </BlueButton>
    </>
  );
}
