export default function Qqq() {
  //타입추론
  let aaa = "안녕하세요";
  aaa = 3;

  //타입명시
  let bbb: string = "반갑습니다";

  //문자타입(선언과 할당 분리)
  let ccc: string;
  ccc = "반가워요";
  ccc = 3;

  //숫자타입
  let ddd: number = 10;
  ddd = "철수";

  //블린타입
  let eee: boolean = true;
  eee = false;
  eee = "false"; //true로 작동함

  //배열타입
  let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
  let ggg: string[] = ["철수", "영희", "훈희", 10];
  let hhh: (string | number)[] = ["철수", "영희", 10]; //

  //객체타입
  interface IProfile {
    name: string;
    age: number | string;
    school: string;
  }
  const profile: IProfile = {
    name: "철수",
    age: 8,
    school: "가나초등학교",
  };
  profile.age = "8살";

  //함수타입 => 어디서든 호출 가능하므로, 타입추론 할 수 없음(반드시, 타입명시 필요)
  const add = (number1: number, number2: number, unit: string): string => {
    return number1 + number2 + unit;
  };
  const result = add(1000, 2000, "원");//결과의 리턴 타입도 예측 가능

  //any타입
  let qqq : any = "철수" //자바스크립트와 동일
  qqq = 123
  qqq = true

  return <></>;
}
