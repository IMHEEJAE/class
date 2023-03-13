import styled from "@emotion/styled";
import { Rate } from "antd";
import { useState } from "react";
const MyStar = styled(Rate)``;

export default function LibraryIconPage() {
  const [value, setValue] = useState(3);
  const qqq = (aa: number) => {
    setValue(aa);
  };
  return (
    <>
      <MyStar onChange={qqq} />
    </>
  );
}
