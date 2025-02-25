import cn from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'delete' | 'default';
}

export function Button({
  children,
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles['button'], className, {
        [styles['default']]: variant === 'default',
        [styles['delete']]: variant === 'delete'
      })}
      {...props}
    >
      {children}
    </button>
  );
}
