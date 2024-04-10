import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { Titulo, Titular, UserList } from './StyledComponents'; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const { authenticated, userProfile } = useAuth(); 

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
            <Titulo>
                <Titular authenticated={authenticated}>Usuarios</Titular>
            </Titulo>
            <UserList>
                <h2>Listado de Usuarios</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id} className={user.email === userProfile?.email ? 'green' : ''}>
                            {user.id} - {user.email}
                        </li>
                    ))}
                </ul>
            </UserList>
        </>
    );
};

export default Users;
