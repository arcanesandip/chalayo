import './Container.css';

export default function Container({ children, className = '' }) {
  return <div className={`container-base ${className}`}>{children}</div>;
}
