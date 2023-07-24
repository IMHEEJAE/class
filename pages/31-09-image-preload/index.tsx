import { useRouter } from "next/router";
import { useEffect } from "react";

const qqq = [];
export default function ImagePreloadPage() {
  const router = useRouter();
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://postfiles.pstatic.net/MjAxOTEwMTFfNjEg/MDAxNTcwNzg1ODM3Nzc0.zxDXm20VlPdQv8GQi9LWOdPwkqoBdiEmf8aBTWTsPF8g.FqMQTiF6ufydkQxrLBgET3kNYAyyKGJTWTyi1qd1-_Ag.PNG.kkson50/sample_images_01.png?type=w773";
    img.onload = () => {
      qqq.push(img);
    };
  }, []);
  const onClickMove = () => {
    void router.push("./31-09-image-preload-moved");
  };
  return (
    <>
      <button onClick={onClickMove}></button>
    </>
  );
}
