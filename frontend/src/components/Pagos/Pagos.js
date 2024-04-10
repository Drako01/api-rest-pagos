import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import './Pagos.css';

const Pagos = () => {
    const { authenticated, userProfile } = useAuth();
    const [monto, setMonto] = useState("");
    const [fecha, setFecha] = useState("");
    const [tipoPago, setTipoPago] = useState("");
    const [destinatario, setDestinatario] = useState("");
    const [, setError] = useState("");
    const [pagos, setPagos] = useState([]);

    const handleMontoChange = (event) => setMonto(event.target.value);
    const handleFechaChange = (event) => setFecha(event.target.value);
    const handleTipoPagoChange = (event) => setTipoPago(event.target.value);
    const handleDestinatarioChange = (event) => setDestinatario(event.target.value);

    const handleCrearPago = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/pagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ monto, fecha, tipoPago, destinatario })
            });

            const nuevoPago = await response.json();
            nuevoPago.fecha = formatFecha(nuevoPago.fecha);

            setPagos([...pagos, nuevoPago]);

            setMonto("");
            setFecha("");
            setTipoPago("");
            setDestinatario("");

        } catch (error) {
            setError("Error al crear el pago. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const response = await fetch('http://localhost:8080/pagos');
                const data = await response.json();
                setPagos(data.map(pago => ({ ...pago, fecha: formatFecha(pago.fecha) })));
            } catch (error) {
                console.error('Error al obtener la lista de pagos:', error);
            }
        };

        fetchPagos();
    }, []);

    const formatFecha = (fechaString) => {
        const date = new Date(fechaString);
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const año = date.getFullYear();
        const horas = date.getHours().toString().padStart(2, '0');
        const minutos = date.getMinutes().toString().padStart(2, '0');
        return `${dia}-${mes}-${año} | ${horas}:${minutos} hs`;
    };

    const handleEliminarPago = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/pagos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setPagos(pagos.filter(pago => pago.id !== id));
            } else {
                setError("Error al eliminar el pago.");
            }
        } catch (error) {
            setError("Error al eliminar el pago. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    return (
        <>
            <section className='Titulo'>
                {authenticated ? (
                    <>
                        <h1 variant="h1" className='Titular'>Bienvenido, {userProfile?.email}</h1>
                        <h2>Generación de Pagos</h2>
                        <form onSubmit={handleCrearPago} className="crear-pago-form">
                            <input
                                type="number"
                                placeholder="Monto"
                                value={monto}
                                name='monto'
                                onChange={handleMontoChange}
                            />
                            <input
                                type="date"
                                placeholder="Fecha"
                                value={fecha}
                                name='fecha'
                                onChange={handleFechaChange}
                            />
                            <input
                                type="text"
                                placeholder="Tipo de Pago"
                                name='tipoPago'
                                value={tipoPago}
                                onChange={handleTipoPagoChange}
                            />
                            <input
                                type="text"
                                placeholder="Destinatario"
                                value={destinatario}
                                name='destinatario'
                                onChange={handleDestinatarioChange}
                            />
                            <button type="submit" className='Boton-Pago'>Crear Pago</button>
                        </form>
                        <div className="lista-pagos">
                            <h2>Lista de Pagos</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                        <th>Tipo de Pago</th>
                                        <th>Destinatario</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagos.map((pago, index) => (
                                        <tr key={index}>
                                            <td>{pago.monto}</td>
                                            <td>{pago.fecha}</td>
                                            <td>{pago.tipoPago}</td>
                                            <td>{pago.destinatario}</td>
                                            <td>
                                                <button onClick={() => handleEliminarPago(pago.id)} className='Eliminar-Boton'>X</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 variant="h1" className='Titular'>No está Autorizado</h1>
                    </>
                )}
            </section>
        </>
    );
};

export default Pagos;
