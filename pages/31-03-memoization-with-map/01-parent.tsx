import { useState } from "react";
import Word from "./02-child";
import { v4 as uuidv4 } from "uuid";

export default function MemoizationWithMapParentPage() {
  const [data, setDate] = useState("철수는 오늘 점심을 맛잇게 먹었다.");
  const onClickChange = () => {
    setDate("영희는 오늘 저녁을 맛없게 먹었다.");
  };
  return (
    <>
      {/* {data.split(" ").map((el, index) => (
        <Word key={index} el={el} /> // 1.memo시, key또는 el이 변경된 부분만 리렌더링 됨 (즉, "오늘", " 먹었다"는 제외)
      ))} */}
      {data.split(" ").map((el, index) => (
        <Word key={uuidv4} el={el} /> // 2. memo를 해도, key 자체가 변경되어 props로 넘어가기 때문에 5개 모두 리렌더링 됨.
      ))}
      <button onClick={onClickChange}>체인지</button>
    </>
  );
}
