interface ButtonProps {
  className: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode | null;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
}

export interface FormButtonProps extends ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
}
