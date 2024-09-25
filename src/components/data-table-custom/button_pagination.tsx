import { MouseEventHandler, ReactNode } from "react";



interface ButtonPaginationProps {
  children: ReactNode,
  onClick: MouseEventHandler<HTMLButtonElement>,
  start?: boolean,
  end?: boolean,
  disabled?: boolean
}

export default function ButtonPagination({ children, onClick, start, end, disabled }: ButtonPaginationProps) {

  var csComplemento = start || end ? (start ? 'rounded-s' : 'rounded-e') : '';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    bg-zinc-50 
      text-secondary-foreground 
      shadow 
      ${disabled ? '' : 'hover:bg-purple-600'}
      ${disabled ? '' : 'hover:text-white '}
      p-2 ${csComplemento}`}>
      {children}
    </button>
  );
}