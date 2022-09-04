import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("the counter starts at 0", () => {
  render(<App />);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(0);
});

test("minus button has correct text", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minusButton");
  expect(buttonElement).toHaveTextContent("-");
});

test("When the - button is pressed, the counter changes -1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minusButton");
  fireEvent.click(buttonElement); //fireEvent를 통행 접근
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(-1);
});

test("plus button has correct text", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plusButton");
  expect(buttonElement).toHaveTextContent("+");
});

test("When the + button is pressed, the counter changes 1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plusButton");
  fireEvent.click(buttonElement); //fireEvent를 통행 접근
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(1);
});
