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

test("ON/OFF Button has blue color", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("onOffButton");
  expect(buttonElement).toHaveStyle({ backgroundColor: "blue" });
});

test("ON/OFF Button is pressed plus button disabled", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("onOffButton");
  fireEvent.click(buttonElement); //fireEvent를 통행 접근
  const plusButtonElement = screen.getByTestId("plusButton");
  expect(plusButtonElement).toBeDisabled();
});

test("ON/OFF Button is pressed mius button disabled", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("onOffButton");
  fireEvent.click(buttonElement); //fireEvent를 통행 접근
  const plusButtonElement = screen.getByTestId("minusButton");
  expect(plusButtonElement).toBeDisabled();
});
