import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const Users = () => {
  const { userProfile } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.users()
      .then((response) => setUsers(response.data || []))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="dashboard-page">
      <div className="shell">
        <div className="dashboard-heading">
          <div><span className="eyebrow">ACCESOS</span><h1>Usuarios</h1><p>Vista de cuentas registradas en la plataforma.</p></div>
          <span className="badge">{users.length} usuario{users.length === 1 ? '' : 's'}</span>
        </div>

        {error && <div className="alert alert-error" role="alert">{error}</div>}
        <div className="panel users-panel">
          {loading ? (
            <div className="centered-state"><div className="loader" /><p>Cargando usuarios…</p></div>
          ) : (
            <div className="user-grid">
              {users.map((user) => {
                const current = user.email === userProfile?.email;
                return (
                  <article className={`user-card ${current ? 'is-current' : ''}`} key={user.id}>
                    <div className="avatar">{user.email?.charAt(0).toUpperCase()}</div>
                    <div><strong>{user.email}</strong><span>Usuario #{String(user.id).padStart(3, '0')}</span></div>
                    {current && <span className="badge badge-success">Tu cuenta</span>}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;
