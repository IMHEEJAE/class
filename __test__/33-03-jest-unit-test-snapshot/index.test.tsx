import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import JestUnitTestPage1 from "../../pages/33-03-jest-unit-test-snapshot";

it("내가 원하는대로 그려지는지 테스트하기", () => {
  const result = render(<JestUnitTestPage1 />);
  expect(result.container).toMatchSnapshot();
});