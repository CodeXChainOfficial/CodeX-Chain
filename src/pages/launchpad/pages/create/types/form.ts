import { UseControllerProps } from "react-hook-form";

export type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
} & UseControllerProps<any>;
