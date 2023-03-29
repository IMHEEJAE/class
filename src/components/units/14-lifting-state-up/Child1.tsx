export default function Child1(props: any) {
  // 부모의 state 조작 방법 2
  const onClick = () => {
    props.setCount((prev: any) => prev + 1);
  };
  return (
    <>
      <div>자식1의 카운트 : {props.count}</div>
      <button onClick={onClick}>카운트올리기</button>
    </>
  );
}
