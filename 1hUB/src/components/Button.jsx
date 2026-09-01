import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    default: 'btn-default',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    icon: 'btn-icon'
  };
  const widthClass = fullWidth ? 'btn-full-width' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      type={type}
      aria-busy={loading ? 'true' : undefined}
      aria-disabled={disabled || loading ? 'true' : undefined}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="loading"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
