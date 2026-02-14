import { Link } from 'react-router-dom';

export default function Button({
  children,
  className = '',
  to,
  onClick,
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition';
  const classes = `${base} ${className}`;

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
