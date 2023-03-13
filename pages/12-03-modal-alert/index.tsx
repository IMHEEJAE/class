import { Modal } from "antd";

const success = () => {
  Modal.success({
    content: "성공성공성공",
  });
};

const error = () => {
  Modal.error({
    content: "비밀번호가 틀렸습니다",
  });
};

export default function App() {
  return (
    <>
      <button onClick={success}>Success</button>
      <button onClick={error}>Error</button>
    </>
  );
}
