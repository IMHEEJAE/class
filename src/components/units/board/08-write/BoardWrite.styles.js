import styled from "@emotion/styled";

export const RedInput = styled.input`
  border-color: red;
`;
export const BlueButton = styled.button`
  font-size: ${(props) => props.rrr};
  background-color: ${(props) => (props.zzz ? "blue" : "yellow")};
`;
