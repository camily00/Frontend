import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUsuarios(res.data))
    .catch(() => {
      alert('Token inválido');
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <ul>
        {usuarios.map((u, i) => (
          <li key={i}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}