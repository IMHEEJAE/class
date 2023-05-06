import { useForm } from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  boardAddress: {
    addressDetail: string;
  };
}
export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm<IFormData>();
  const onClickSubmit = (data: IFormData) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자 : <input type="text" {...register("writer")} />
        제목 : <input type="text" {...register("title")} />
        내용 : <input type="text" {...register("contents")} />
        주소 : <input type="text" {...register("boardAddress.addressDetail")} />
        <button>등록하기</button>
      </form>
    </>
  );
}
