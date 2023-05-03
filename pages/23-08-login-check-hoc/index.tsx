import { gql, useMutation } from "@apollo/client";
import { useState, ChangeEvent } from "react";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;
export default function Login() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePaswword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onClickLogin = async () => {
    try {
      // 1. 로그인해서 accessToken받아오기
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      // 토큰을 만들어 준다!!!!
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      // 2. accessToken을 globalState에 저장하기
      if (!accessToken) {
        Modal.error({ content: "로그인에 실패했습니다. 다시 시도해 주세요." });
        return;
      }
      setAccessToken(accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/23-09-login-check-hoc-success");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };
  // const result = localStorage.getItem("accessToken");
  // console.log(result);
  // if (result) setAccessToken(result);

  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      비밀번호 : <input type="password" onChange={onChangePaswword} />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
