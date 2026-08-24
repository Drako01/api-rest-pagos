import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const features = [
  ['Operación centralizada', 'Alta, edición, eliminación, búsqueda y consulta de pagos desde un único tablero.'],
  ['API protegida', 'JWT, validación de contratos, CORS configurable y respuestas de error normalizadas.'],
  ['Métricas operativas', 'Totales, ticket promedio, cantidad de movimientos y filtros combinables.'],
  ['Experiencia responsive', 'Diseño usable desde escritorio, tablet o celular sin perder capacidad operativa.']
];

const Index = () => {
  const { authenticated, userProfile } = useAuth();

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">PAYMENTS MANAGEMENT PLATFORM</span>
            <h1>Una consola de pagos pensada como un producto real.</h1>
            <p className="hero-lead">
              Gestioná movimientos, analizá volumen y mantené trazabilidad desde una interfaz clara,
              segura y preparada para crecer.
            </p>

            {authenticated && (
              <div className="welcome-chip">Sesión activa: <strong>{userProfile?.email}</strong></div>
            )}

            <div className="hero-actions">
              <Link className="button button-primary" to={authenticated ? '/pagos' : '/login'}>
                {authenticated ? 'Abrir dashboard' : 'Ingresar a la plataforma'}
              </Link>
              {!authenticated && <Link className="button button-secondary" to="/signup">Crear cuenta</Link>}
            </div>

            <div className="trust-row" aria-label="Tecnologías principales">
              <span>React 18</span><span>Node.js</span><span>Express</span><span>PostgreSQL</span><span>JWT</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="mock-window">
              <div className="mock-toolbar"><span /><span /><span /></div>
              <div className="mock-content">
                <div className="mock-kpi"><small>Volumen procesado</small><strong>$ 1.284.920</strong><span>+18,4% mensual</span></div>
                <div className="mock-chart">
                  {[38, 62, 47, 78, 56, 88, 70, 94].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                </div>
                <div className="mock-list">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <span className="eyebrow">CAPACIDADES</span>
          <h2>Mucho más que un CRUD.</h2>
          <p>El proyecto conserva el objetivo original, pero lo resuelve con criterios de producto, seguridad y mantenibilidad.</p>
        </div>
        <div className="feature-grid">
          {features.map(([title, description], index) => (
            <article className="feature-card" key={title}>
              <span className="feature-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell architecture-grid">
          <div>
            <span className="eyebrow">ARQUITECTURA</span>
            <h2>Frontend y API desacoplados.</h2>
          </div>
          <div className="architecture-flow">
            <div><strong>React UI</strong><span>Estado, routing y UX</span></div>
            <b>→</b>
            <div><strong>REST API v1</strong><span>Auth, validación y contratos</span></div>
            <b>→</b>
            <div><strong>PostgreSQL</strong><span>Persistencia con Sequelize</span></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
