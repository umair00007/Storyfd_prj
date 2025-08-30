import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "./InputField";

const meta = {
  title: "Components/InputField",
  component: InputField,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helperText: "We’ll never share your email.",
    variant: "outlined",
    size: "md",
  },
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <div className="w-[320px]">
        <InputField
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          clearable
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    invalid: true,
    errorMessage: "This username is taken.",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    passwordToggle: true,
    variant: "filled",
  },
};

export const LoadingDisabled: Story = {
  args: {
    label: "Loading field",
    loading: true,
    disabled: true,
    value: "Fetching…",
  },
};
