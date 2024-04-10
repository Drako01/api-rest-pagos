import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext.js';

const Navbar = () => {
    const { authenticated, signOut } = useAuth();

    // Definir los enlaces de navegación según el estado de autenticación
    const navLinks = authenticated ? [
        { to: '/', text: 'Inicio' },
        { to: '/pagos', text: 'Pagos' },
        { to: '/users', text: 'Usuarios' },
        { to: '/', text: 'Logout' },
    ] : [
        { to: '/', text: 'Inicio' },
        { to: '/login', text: 'Login' }
    ];

    return (
        <section position="sticky" className="appBar">
            <Link to="/" className="logo-navbar">
            </Link>
            <div className="navLinksDesktop">
                {navLinks.map((link, index) => (
                    <Link to={link.to} key={index}>
                        {link.text === 'Logout' ? (
                            <button onClick={signOut}>{link.text}</button>
                        ) : (
                            link.text
                        )}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Navbar;
