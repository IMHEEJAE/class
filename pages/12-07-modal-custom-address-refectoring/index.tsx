import React, { useState } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  }; 

  const handleComplete = (address: Address) => {
    console.log(address.address);
    onToggleModal();
  };
  return (
    <>
      <button onClick={onToggleModal}>Open Modal</button>

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
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />;
        </Modal>
      )}
    </>
  );
}
