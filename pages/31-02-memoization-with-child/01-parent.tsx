import { useCallback, useMemo, useState } from "react";
import MemoizationWithChildPage from "./02-child";

export default function MemoizationPage() {
  console.log("부모렌더링");
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // 1. useMemo로 변수 기억
  const aaa = useMemo(() => Math.random(), []);

  // 2.useCallback으로 함수 기억
  const onClickCountLet = useCallback(() => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  // 3.useCallback 사용시 주의사항 => state 사용 주의

  const onClickCountState = useCallback(() => {
    // console.log(countState + 1);
    setCountState((prev) => prev + 1);
  }, []);

  // 4. useMemo 나만의 useCallback 만들어보기
  //   const onClickCountState2 = useMemo(() => {
  //     return () : void => {
  //         console.log(countState + 1);
  //         setCountState(countState +1)
  //     }
  //   }.[])
  return (
    <>
      <div>=====================================</div>
      <h1>부모 컴포넌트</h1>
      <div>카운트(let) :{countLet} </div>
      <button onClick={onClickCountLet}>카운트(let) +1 올리기: </button>

      <div>카운트(state) : {countState}</div>
      <button onClick={onClickCountState}>카운트(state) +1 올리기 : </button>

      <div>=====================================</div>
      <MemoizationWithChildPage />
    </>
  );
}
