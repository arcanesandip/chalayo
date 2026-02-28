import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        navigate('/dashboard');
      } else {
        alert(
          'Login failed: ' +
            (data.detail || 'Invalid credentials'),
        );
      }
    } catch (error) {
      console.error('Error:', error);
      alert(
        'Cannot connect to server. Check if your Django server is running!',
      );
    }
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-blue-200 p-4 shadow">
        <h1 className="text-lg font-bold">CHALAYO</h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <input
            className="w-full rounded-lg bg-white px-4 py-2 shadow"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full rounded-lg bg-white px-4 py-2 shadow"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-900 px-4 py-2 text-white shadow"
          >
            <Link to="/dashboard">Sign In</Link>
          </button>
        </form>
      </div>
    </section>
  );
}
