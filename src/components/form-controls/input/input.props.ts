export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  name: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  iconPosition?: 'left' | 'right';
  icon?: React.ReactNode | null;
}
