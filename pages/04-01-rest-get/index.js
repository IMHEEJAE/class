import axios from "axios";
import { useState } from "react";
export default function RestGetPage() {
  const [title, setTitle] = useState("");
  const onCLickAsynce = () => {
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log(result);
  };
  const onClickSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data);
    setTitle(result.data.title);
  };
  //   async function onClickSync() {
  //     const result = await axios.get("https://koreanjson.com/posts/1");
  //     console.log(result);
  //     console.log(result.data);
  //     setTitle(result.data.title);
  //   }
  return (
    <>
      <button onClick={onCLickAsynce}>REST-API(비동기) 요청하기</button>
      <button onClick={onClickSync}>REST-API(동기) 요청하기</button>
      <div>{title}</div>
    </>
  );
}
