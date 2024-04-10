import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import opcionesTipoPago from '../../opcionesTipoPago';
import './DetallePago.css'

const DetallePago = () => {
    const { id } = useParams();
    const [, setPago] = useState({});
    const [monto, setMonto] = useState("");
    const [fecha, setFecha] = useState("");
    const [tipoPago, setTipoPago] = useState("");
    const [destinatario, setDestinatario] = useState("");
    const [error, setError] = useState(null);   

    useEffect(() => {
        const obtenerPago = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pagos/${id}`);
                if (!response.ok) {
                    throw new Error("No se pudo obtener el pago.");
                }
                const data = await response.json();
                setPago(data);
                setMonto(data.monto);
                setFecha(data.fecha);
                setTipoPago(data.tipoPago);
                setDestinatario(data.destinatario);
            } catch (error) {
                setError(error.message);
            }
        };

        obtenerPago();
    }, [id]);

    const handleActualizarPago = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/pagos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ monto, fecha, tipoPago, destinatario })
            });

            if (!monto || !fecha || !tipoPago || !destinatario) {
                setError("Todos los campos son obligatorios.");
                return;
            }

            if (!response.ok) {
                throw new Error("No se pudo actualizar el pago.");
            }

            window.location.href = '/pagos';
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md Detalles">
            <h2 className="text-2xl font-bold ">Detalle del Pago</h2>
            <div className="Info-Carga">
                <label className="block text-gray-700 text-sm font-bold mb-2">Monto:</label>
                <input type="number" className="form-input w-full" value={monto} onChange={(e) => setMonto(e.target.value)} required/>
            </div>
            <div className="Info-Carga">
                <label className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
                <input type="date" className="form-input w-full" value={fecha} onChange={(e) => setFecha(e.target.value)} required/>
            </div>
            <div className="Info-Carga">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Pago:</label>
                <select
                    value={tipoPago}
                    onChange={(e) => setTipoPago(e.target.value)}
                    className="form-select w-full"
                    required
                >
                    <option value="">Seleccione el tipo de pago</option>
                    {opcionesTipoPago.map((opcion, index) => (
                        <option key={index} value={opcion}>{opcion}</option>
                    ))}
                </select>
            </div>
            <div className="Info-Carga">
                <label className="block text-gray-700 text-sm font-bold mb-2">Destinatario:</label>
                <input type="text" className="form-input w-full" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} required/>
            </div>
            <button onClick={handleActualizarPago} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Actualizar Pago
            </button>
        </div>
    );
};

export default DetallePago;
