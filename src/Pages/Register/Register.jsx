import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !senha) {
      alert('Preencha email e senha.');
      return;
    }

    setLoading(true);
    const payload = { email, password: senha };
    console.log('Enviando para /register:', payload);

    try {
      const res = await api.post('/register', payload);
      console.log('Resposta do backend:', res.data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      alert('Registrado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro no registro:', err.response?.data || err.message);
      alert('Erro no registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
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
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </div>
  );
}