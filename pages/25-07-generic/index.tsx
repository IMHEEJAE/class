// 1. 문자/숫자/불린 (primitive) 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입 => 그냥 자바스크립트랑 같음
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  console.log(arg1 + 1000); // any는 아무거나 다 됨
  return [arg3, arg2, arg1];
};
const result = getPrimitive("철수", 123, true);

//
//
// 3. unknown 타입
const getUnkown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  if (typeof arg1 === "number") console.log(arg1 + 1000); // unknown 은 사용할 때, 타입을 가정하여 사용해야 함
  return [arg3, arg2, arg1];
};
const result = getPrimitive("철수", 123, true);

//
//
// 4. generic 타입 - 1
const getGeneric<Mytype1,Mytype2,Mytype3>(arg1: Mytype1, arg2: Mytype2, arg3: Mytype3): [Mytype3, Mytype2, Mytype1] => {
  return [arg3, arg2, arg1];
};
const result = getPrimitive("철수", 123, true);

//
//
// 4. generic 타입 - 2
const getGeneric<Mytype1,Mytype2,Mytype3>(arg1: Mytype1, arg2: Mytype2, arg3: Mytype3): [Mytype3, Mytype2, Mytype1] => {
    return [arg3, arg2, arg1];
  };
  const result = getPrimitive("철수", 123, true);
  