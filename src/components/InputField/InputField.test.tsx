import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

it("renders label and updates value", () => {
  const onChange = vi.fn();
  render(
    <InputField
      label="Email"
      value="a"
      onChange={onChange}
      placeholder="type"
    />
  );
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  const input = screen.getByPlaceholderText("type") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "b" } });
  expect(onChange).toHaveBeenCalled();
});
