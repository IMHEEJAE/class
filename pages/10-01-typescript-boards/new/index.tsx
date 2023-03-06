import BoardWrite from "../../../src/components/units/board/10-write/BoardWrite.container";

export default function GraphqlMutationInputPage() {
  return (
    <>
      <BoardWrite isEdit={false} />
      {/* {BoardWrite({ isEdit: false })} */}
    </>
  );
}
