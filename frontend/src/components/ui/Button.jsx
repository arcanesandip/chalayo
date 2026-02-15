import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  className = '',
  to,
  onClick,
  type = 'button',
}) {
  const classes = `button-base ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
