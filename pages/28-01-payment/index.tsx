declare const window: typeof globalThis & {
  IMP: any;
};
export default function PaymentPage(): JSX.Element {
  const onClickPayment = (): void => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp07023202"); // 예: imp00000000a

    IMP.request_pay(
      {
        // param
        pg: "kakaopay",
        pay_method: "card",
        // 주문번호
        // merchant_uid: "ORD20180131-0000011",
        name: "의자",
        amount: 100,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url:"http://localhost:3000/28-01-payment" // 모바일 결제 시 페이지 주소가 바뀜. 결제 끝나고 돌아 갈 주소
      },
      (rsp: any) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직, 
          console.log("성공", rsp);
          // 백엔드에 결제관련 데이터 넘겨주기 => 즉, 뮤테이션 실행하기기
          // createPointTransactionOfLoading => 돈을주고 포인트를 사는 api
          // createPointTransactionOfBuyingAndSelling => 충전된 포인트로 상품 거래 api
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };
  return (
    <>
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}
