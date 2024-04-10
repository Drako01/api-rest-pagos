import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { authenticated  } = useAuth(); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Error al obtener la lista de usuarios:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            {authenticated ? (
                <>
                    <section className='Titulo'>
                        <h1 className='Titular'>Usuarios</h1>
                    </section>
                    <div className='UserList'>
                        <h2 className='text-xl font-bold mb-4'>Listado de Usuarios</h2>
                        <ul>
                            {users.map(user => (
                                <li key={user.id} className='mb-2'>{user.id} - {user.email}</li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <section className='Titulo'>
                    <h1 className='Titular'>No está autorizado</h1>
                </section>
            )}
        </>
    );
};

export default Users;
