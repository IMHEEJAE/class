import { memo } from "react";
function MemoizationWithChildPage() {
  console.log("자식이 렌더링 됩니다.");
  return (
    <>
      <div>=====================================</div>
      <h1>자식 컴포넌트</h1>
      <div>=====================================</div>
    </>
  );
}
export default memo(MemoizationWithChildPage);
