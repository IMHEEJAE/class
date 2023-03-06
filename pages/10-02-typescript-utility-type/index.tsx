export default function TypescriptUtilityPage() {
  interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
  }

  // 1.pick타입
  type aaa = Pick<IProfile, "name" | "age">;

  // 2.omit타입(제외)
  type bbb = Omit<IProfile, "school">;

  // 3.partial타입(있어도 되고 없어도 되고)
  type ccc = Partial<IProfile>;

  // 4.required타입(전부 다 필수)
  type ddd = Required<IProfile>;

  // 5.record타입
  type eee = "철수" | "영희" | "훈희"; // Union타입
  let child: eee;
  child = "철수";

  type fff = Record<eee, IProfile>; // record타입

  // ------- (type vs interface) 차이 : 선언병합 ------- //
  interface IProfile {
    candy: number;
  }

  let profile: Partial<IProfile> = {};
  profile.candy = 10;
}
