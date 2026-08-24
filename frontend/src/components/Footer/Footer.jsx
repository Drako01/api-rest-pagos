const Footer = () => (
  <footer className="app-footer">
    <div className="shell footer-content">
      <div>
        <strong>PayFlow</strong>
        <p>Proyecto educativo de ingeniería de software aplicado a una plataforma de pagos.</p>
      </div>
      <div className="footer-meta">
        <span>React · Node.js · Express · PostgreSQL</span>
        <span>© {new Date().getFullYear()} Alejandro Daniel Di Stefano</span>
      </div>
    </div>
  </footer>
);

export default Footer;
