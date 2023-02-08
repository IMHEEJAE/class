import { useState } from "react";

export default function SignupStatePage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onClickSignup() {
    console.log(email);
    console.log(password);

    //검증하기
    if (email.includes("@") === false) {
      //   alert("이메일이 올바르지 않습니다. @가 없음!!");
      setEmailError("이메일이 올바르지 않습니다. @가 없음!!");
    } else {
      //메시지 알림 이후, Backend 컴퓨터에 있는 API 요청하기

      alert("회원가입을 축하합니다.");
    }
  }

  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      <div>{emailError}</div>
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <button onClick={onClickSignup}>회원가입</button>
    </>
  );
}
