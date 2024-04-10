import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn } = useAuth(); 

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {    
            const userData = {
                email: email,               
            };
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            
    
            if (data.token) {
                const token = data.token;
                localStorage.setItem("token", token);
                signIn(userData); 
                navigate('/');
            } else {
                setError("Token no proporcionado");
            }
        } catch (error) {
            setError("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen ">
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
                <h1 className="text-2xl mb-6">Iniciar Sesión</h1>
                {error && <p className="text-red-500 text-xs italic mb-4 center">{error}</p>}
                <section className="login-container">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            name="password"
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between Login-Div">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Iniciar sesión
                        </button>

                        <Link to={'/signup'}>Crear cuenta?</Link>
                    </div>
                </section>
            </form>
        </div >
    );
};

export default Login;
