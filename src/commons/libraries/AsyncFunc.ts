import { ChangeEvent, FormEvent } from "react";

// export const WrapAsync =
//   (asyncFunc: (event: ChangeEvent<HTMLInputElement>) => Promise<void>) =>
//   (event: ChangeEvent<HTMLInputElement>) => {
//     void asyncFunc(event);
//   };

export const WrapAsync =
  <E>(asyncFunc: (event: E) => Promise<void>) =>
  (event: E) => {
    void asyncFunc(event);
  };

export const wrapFormAsync =
  (asyncFunc: () => Promise<void>) =>
  (event: FormEvent<HTMLFormElement>) =>
  () => {
    event.preventDefault();
    void asyncFunc();
  };
