import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-blue-200 p-4 shadow">
        <h1 className="text-lg font-bold">CHALAYO</h1>
        <form className="flex w-full flex-col gap-4">
          <input
            className="w-full rounded-lg bg-white px-4 py-2 shadow"
            type="text"
            placeholder="username"
          />
          <input
            className="w-full rounded-lg bg-white px-4 py-2 shadow"
            type="password"
            placeholder="password"
          />
          <button className="rounded-lg bg-blue-900 px-4 py-2 text-white shadow">
            <Link to="/dashboard">Sign In</Link>
          </button>
        </form>
      </div>
    </section>
  );
}
