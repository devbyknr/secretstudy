import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); //learn react 라는 텍스트가 APP컴포넌트에 있는지 없는지 테스트하는 부분
  expect(linkElement).toBeInTheDocument();

  const lintTest = screen.getByRole("button", {
    name: "lintTest",
  });

  expect(lintTest.textContent).toBe("lintTest");
  //getBy ... 둘 이상의 일치여부가 발생되면 에러
  //queryBY ... 요소가 없다면 null을 반환함. 둘이상의 일치여부 발생시에는 에러
  //findBy ... Promise를 반환한다... 둘 이상의 일치여부가 발생시에는 Promise가 거부됨 (waitFor : 일정기간동안 기다려야 할때 사용.)
});
