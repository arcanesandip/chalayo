// import Home from './pages/Home';
// import { Routes, Route } from 'react-router';
// import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Dashboard />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}
    </div>
  );
}
