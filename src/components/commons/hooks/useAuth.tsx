import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuth() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인후 이용 가능");
      void router.push("/23-03-login-check");
    }
  }, []);
}
