import Header from '../components/home/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  return (
    <>
      <Header />
    </>
  );
}
