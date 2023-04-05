import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface IPrevState {
  count: number;
}
export default function ClassCounterPage() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log("어느것이든 바꼈을 때 실행.");
  });

  useEffect(() => {
    console.log("처음에 그려지고 나서 실행");
  }, []);

  useEffect(() => {
    return () => {
      console.log("사라질때 실행");
    };
  }, []);

  // 잘못된 사용 예제  (useEffect 안에서 setState 는 사용을 지향.)
  // 1. 무한렌더링  2. 무한루프
  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [count]);

  const onClickCountUp = () => {
    console.log(count);
    setCount((prev) => prev + 1);
  };
  const onClickMove = () => {
    void router.push("/");
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!</button>
      <button onClick={onClickMove}>나가기</button>
    </div>
  );
}
