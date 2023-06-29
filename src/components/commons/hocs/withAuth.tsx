import { useRouter } from "next/router";
import { useEffect } from "react";
import { restoreAccessTokenLoadable } from "../../../commons/store";
import { useRecoilValueLoadable } from "recoil";

export const withAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  // 1. 로그인 체크 withAuth(refreshToken 이전)
  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     alert("로그인후 이용 가능");
  //     void router.push("/23-03-login-check");
  //   }
  // }, []);

  // 2. 로그인 체크 (refreshToken 이후) => 안좋음. : _app.tsx에 이어서 총 2번 요청하게됨
  // useEffect(() => {
  //   void getAccessToken().then((newAccessToken) => {
  //     if (newAccessToken === undefined) {
  //       alert("로그인후 이용 가능");
  //       void router.push("/23-03-login-check");
  //     }
  //   });
  // }, []);

  // 3. 로그인 체크 (refreshToken 이후) => 좋음. : 함수를 공유하므로 _app.tsx에 이어서 총 1번만 요청하게 됨
  useEffect(() => {
    void aaa.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인후 이용 가능");
        void router.push("/23-03-login-check");
      }
    });
  }, []);
  return <Component {...props} />;
};
