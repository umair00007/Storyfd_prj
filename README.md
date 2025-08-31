# React Component Development Assignment

This project was built with **React + TypeScript + TailwindCSS + Storybook** using **Vite**.  
It contains two reusable UI components documented in Storybook.

---

## Components

### 1. InputField

A flexible input component with:

- Label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: `filled`, `outlined`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Optional: clear button, password toggle
- Accessible with `aria-*` attributes

**Props:**

```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}
```
