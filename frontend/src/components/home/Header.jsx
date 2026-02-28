import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex h-[72px] items-center bg-blue-200 shadow">
      <div className="mx-auto my-0 flex w-full max-w-[1024px] items-center justify-between">
        <h1 className="font-bold">CHALAYO</h1>
        <nav className="flex gap-4">
          <a>Link</a>
          <a>Link</a>
          <a>Link</a>
          <a>Link</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/auth">sign in</Link>
          <button className="rounded-lg bg-blue-900 px-4 py-2 text-white shadow">
            Start Free Trial
          </button>
        </div>
      </div>
    </header>
  );
}
