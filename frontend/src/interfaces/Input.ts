export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: any) => void;
}
