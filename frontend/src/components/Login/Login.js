import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await api.login(form);
      signIn(response);
      navigate(location.state?.from?.pathname || '/pagos', { replace: true });
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
          <span className="eyebrow">ACCESO SEGURO</span>
          <h1>Volvé a tu operación de pagos.</h1>
          <p>Ingresá para consultar movimientos, métricas y administrar transacciones desde el dashboard.</p>
          <ul className="check-list">
            <li>Sesiones JWT con expiración</li>
            <li>API protegida por Bearer token</li>
            <li>Contratos y errores normalizados</li>
          </ul>
        </div>

        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card-heading">
            <span className="auth-icon" aria-hidden="true">↗</span>
            <div><h2>Iniciar sesión</h2><p>Usá tus credenciales para continuar.</p></div>
          </div>

          {error && <div className="alert alert-error" role="alert">{error}</div>}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nombre@empresa.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              autoComplete="current-password"
              minLength="8"
              required
            />
          </label>

          <button className="button button-primary button-full" type="submit" disabled={submitting}>
            {submitting ? 'Ingresando…' : 'Ingresar al dashboard'}
          </button>

          <p className="auth-switch">¿Todavía no tenés cuenta? <Link to="/signup">Crear cuenta</Link></p>
        </form>
      </div>
    </section>
  );
};

export default Login;
