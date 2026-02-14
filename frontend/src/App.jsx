import Home from './pages/Home';
import { Routes, Route } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/facts" element={<Facts />} /> */}
      </Routes>
    </div>
  );
}
