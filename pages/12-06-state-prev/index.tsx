import { useState } from "react";

export default function CounterState() {
  const [count, setCount] = useState(0);

  function onClickCountUp() {
    setCount((prevState) => prevState + 1);
    setCount((prevState) => prevState + 1);
    setCount((prevState) => prevState + 1);
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
    </>
  );
}
