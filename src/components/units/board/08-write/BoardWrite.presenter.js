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
      <BlueButton zzz={props.mycolor} onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}>
        {props.isEdit ? "수정하기" : "등록하기"}
      </BlueButton>
    </>
  );
}
