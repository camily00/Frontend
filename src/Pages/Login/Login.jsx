import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    setEmail('');
    setSenha('');
  }, []);

  const handleLogin = async () => {
    const payload = { email, password: senha };
    console.log('Enviando para /login:', payload);
    try {
      const res = await api.post('/login', payload);
      console.log('Resposta do backend:', res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro no login:', err.response?.data || err.message);
      alert('Login inválido.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => navigate('/register')}>Cadastrar</button>
    </div>
  );
}