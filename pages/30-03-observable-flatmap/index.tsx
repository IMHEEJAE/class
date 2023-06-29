// import { Observable } from "@apollo/client";
import { from } from "zen-observable";

export default function ObservableFlatmapPage() {
  const onClickBtn = () => {
    // new Promise((resolve, reject) => {});
    // new Observable((observer) => {});
    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"])
      .flatMap((el) => from([`${el} 결과에 qqq 적용`, `${el} 결과에 zzz 적용`]))
      .subscribe((el) => {
        console.log(el);
      });
  };
  return (
    <>
      <button onClick={onClickBtn}>버튼</button>
    </>
  );
}
