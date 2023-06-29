import axios from "axios";
import { useState } from "react";
export default function RestGetPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onClickSync = async () => {
    setIsSubmitting(true);
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data);
    setIsSubmitting(false);
  };

  return (
    <>
      <button onClick={onClickSync} disabled={isSubmitting}>
        REST-API(동기) 요청하기
      </button>
    </>
  );
}
