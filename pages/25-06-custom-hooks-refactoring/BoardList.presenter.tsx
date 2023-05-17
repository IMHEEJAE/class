import { getDate } from "../../../../commons/utils/utils";
import Paginations01Container from "../../../commons/paginations/01/Paginations01.container";
import Search01Container from "../../../commons/search/01/Search01.container";
import * as S from "./BoardList.styles";
import { IBoardListPresenterProps } from "./BoardList.types";
import { v4 as uuidv4 } from "uuid";

export default function BoardListPresenter(props: IBoardListPresenterProps) {
  return (
    <>
      <S.Wrapper>
        <S.Card>
          <S.Header>graphql-api 게시판</S.Header>
          <Search01Container
            refetch={props.refetch}
            refetchBoardsCount={props.refetchBoardsCount}
            onChangeKeyword={props.onChangeKeyword}
          />
          <S.BoardList>
            <S.BoardTable>
              <S.Thead>
                <S.Tr>
                  <S.ThHeaderNum>번호</S.ThHeaderNum>
                  <S.ThHeaderTitle>제목</S.ThHeaderTitle>
                  <S.ThHeaderWriter>작성자</S.ThHeaderWriter>
                  <S.ThHeaderDate>날짜</S.ThHeaderDate>
                </S.Tr>
              </S.Thead>
              {props.data?.fetchBoards.map((el: any, index: any) => (
                <S.TBody key={el._id}>
                  <S.Tr>
                    <S.Th>{String(el._id).slice(-4)}</S.Th>
                    <S.ThTitle
                      id={el._id}
                      onClick={props.onClickMoveToPage(`/boards/${el._id}`)}
                    >
                      {el.title
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        .replaceAll(props.keyword, `!@#$%${props.keyword}!@#$%`)
                        .split("!@#$%")
                        .map((el: any) => (
                          <S.StrongText
                            key={uuidv4()}
                            isMatched={props.keyword === el}
                          >
                            {el}
                          </S.StrongText>
                        ))}
                    </S.ThTitle>
                    <S.Th>{el.writer}</S.Th>
                    <S.Th>{getDate(el.createdAt)}</S.Th>
                  </S.Tr>
                </S.TBody>
              ))}
            </S.BoardTable>
          </S.BoardList>
          <S.BoardFooter>
            <Paginations01Container
              refetch={props.refetch}
              count={props.count}
            />
            <S.EditBtn onClick={props.onClickMoveToPage(`./boards/new`)}>
              <S.EditIcon src="/images/icon/icon_edit.svg" /> 게시물 등록하기
            </S.EditBtn>
          </S.BoardFooter>
        </S.Card>
      </S.Wrapper>
    </>
  );
}
