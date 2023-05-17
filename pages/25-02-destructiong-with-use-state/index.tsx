import { useState } from "react";

export default function CounterState() {
  const result = useState(0);

  function onClickCountUp() {
    // setCount(1);
    // setCount(2);
    // setCount(3);
    // setCount(4);
    // setCount(5);
    result[1](6);
  }
  return (
    <>
      <div>{result[0]}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
    </>
  );
}
