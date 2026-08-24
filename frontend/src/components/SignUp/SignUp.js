import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.signup({ email: form.email, password: form.password });
      signIn(response);
      navigate('/pagos', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="shell auth-grid">
        <div className="auth-aside">
          <span className="eyebrow">ALTA DE USUARIO</span>
          <h1>Creá tu espacio de operación.</h1>
          <p>La cuenta te permite operar sobre recursos protegidos de la API y acceder al dashboard privado.</p>
          <ul className="check-list">
            <li>Contraseña mínima de 8 caracteres</li>
            <li>Hash bcrypt antes de persistir</li>
            <li>Token emitido al completar el registro</li>
          </ul>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card-heading">
            <span className="auth-icon" aria-hidden="true">+</span>
            <div><h2>Crear cuenta</h2><p>Completá los datos para comenzar.</p></div>
          </div>

          {error && <div className="alert alert-error" role="alert">{error}</div>}

          <label className="field">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" placeholder="nombre@empresa.com" required />
          </label>
          <label className="field">
            <span>Contraseña</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} minLength="8" autoComplete="new-password" placeholder="Mínimo 8 caracteres" required />
          </label>
          <label className="field">
            <span>Confirmar contraseña</span>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} minLength="8" autoComplete="new-password" placeholder="Repetí la contraseña" required />
          </label>

          <button className="button button-primary button-full" type="submit" disabled={submitting}>
            {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
          <p className="auth-switch">¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
