export default function Child2(props: any) {
  return (
    <>
      <div>자식2의 카운트 : {props.count}</div>
      <button onClick={props.onClickCountUp}>카운트올리기</button>
    </>
  );
}
