import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import FetchPolicyExample from "../../src/components/units/21-fetch-policy";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;
export default function GlobalStatePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(FETCH_BOARDS);
  const onClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button onClick={onClick}>
        버튼을 클릭하면 새로운 컴포넌트가 나타남
      </button>
      {isOpen && <FetchPolicyExample />}
    </>
  );
}
