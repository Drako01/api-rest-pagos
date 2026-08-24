import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { authenticated, userProfile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);
  const logout = () => {
    signOut();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar shell" aria-label="Navegación principal">
      <NavLink to="/" className="brand" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>PayFlow</strong>
          <small>Payments Console</small>
        </span>
      </NavLink>

      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-panel ${open ? 'is-open' : ''}`}>
        <div className="nav-links">
          <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
          {authenticated && <NavLink to="/pagos" onClick={closeMenu}>Pagos</NavLink>}
          {authenticated && <NavLink to="/users" onClick={closeMenu}>Usuarios</NavLink>}
        </div>

        <div className="nav-actions">
          {authenticated ? (
            <>
              <div className="user-chip" title={userProfile?.email}>
                <span className="status-dot" />
                <span>{userProfile?.email}</span>
              </div>
              <button type="button" className="button button-ghost button-small" onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink className="button button-ghost button-small" to="/login" onClick={closeMenu}>Ingresar</NavLink>
              <NavLink className="button button-primary button-small" to="/signup" onClick={closeMenu}>Crear cuenta</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
