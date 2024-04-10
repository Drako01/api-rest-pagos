import '../Login/Login.css'
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
                        
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {               
                navigate('/login');
            } else {
                setError(data.error || "Error al crear el usuario");
            }
        } catch (error) {
            setError("Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignUp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
                <h1 className="text-2xl mb-6">Crear Cuenta</h1>
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
                            Crear Cuenta
                        </button>
                        <Link to={'/login'}>Iniciar Sesión?</Link>
                    </div>
                </section>
            </form>
        </div >
    );
};

export default SignUp;
