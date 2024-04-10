import React from 'react';
import { useAuth } from '../../context/AuthContext.js';
import './Pagos.css';

const Pagos = () => {
    const { authenticated, userProfile } = useAuth();

    return (
        <>
            <section className='Titulo'>
                {authenticated ? (
                    <>
                        <h1 variant="h1" className='Titular'>Bienvenido, {userProfile?.email}</h1>
                    </>
                ) : (
                    <>
                        <h1 variant="h1" className='Titular'>No esta Autorizado</h1>
                    </>
                )}
            </section>
        </>
    );
};

export default Pagos;
