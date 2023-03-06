import { ChangeEvent } from "react";
export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any;
}

export interface IBoardWriteUIProps {
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChagneContents: (event: ChangeEvent<HTMLInputElement>) => void;
  mycolor: boolean;
  isEdit: boolean;
  data: any;
}

export interface IBlueButtonProps {
  zzz: boolean;
}

export interface IMyvariables {
  number: number;
  writer?: string;
  title?: string;
  contents?: string;
}
