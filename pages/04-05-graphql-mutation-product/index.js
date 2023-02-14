import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    # 변수의 타입 적는 곳
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      #실제 우리가 전달할 변수 적는 곳
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationProductPage() {
  const [seller, setSeller] = useState();
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState("");
  const [나의함수] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables 이게 $역할을 해줌.
        seller: seller,
        createProductInput: {
          name: name,
          detail: detail,
          price: Number(price),
        },
      },
    });
    console.log(result);
    alert(result.data.createProduct.message);
  };

  const onChangeSeller = (event) => {
    setSeller(event.target.value);
  };
  const onChangenName = (event) => {
    setName(event.target.value);
  };
  const onChangeDetail = (event) => {
    setDetail(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  return (
    <>
      SELLER : <input type="text" onChange={onChangeSeller} />
      <br />
      NAME :<input type="text" onChange={onChangenName} />
      <br />
      DETAIL :<input type="text" onChange={onChangeDetail} />
      <br />
      PRICE : <input type="number" onChange={onChangePrice} />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
