import React, { useState } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleComplete = (address: Address) => {
    console.log(address.address);
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>Open Modal</button>

      {/* 모달 종료 방식 - 1. 모달 숨기는 방법 */}
      {/* <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DaumPostcodeEmbed onComplete={handleComplete} />;
      </Modal> */}

      {/* 모달 종료 방식 - 2. 모달 삭제 방법 */}
      {isOpen && (
        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />;
        </Modal>
      )}
    </>
  );
}
