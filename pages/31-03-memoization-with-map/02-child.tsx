import { memo } from "react";

interface IWordProps {
  el: string;
}
function Word(props: IWordProps) {
  console.log("자식렌더링", props.el);
  return (
    <>
      <span>{props.el}</span>
    </>
  );
}
export default memo(Word);
