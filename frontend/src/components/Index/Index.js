import React from 'react';
import pago from '../assets/img/pagos.png'
import { useAuth } from '../../context/AuthContext.js';
import './Index.css';

const Index = () => {
    const { authenticated, userProfile } = useAuth();

    return (
        <>
            <section className='Titulo'>
                {authenticated ? ( 
                    <>
                        <h1 variant="h1" className='Titular'>Bienvenido, {userProfile?.email}</h1>
                        <section className='Logotipo'>
                            <img src={pago} alt='Pagos' className='logotipo' />
                        </section>
                    </>
                ) : (
                    <>
                        <h1 variant="h1" className='Titular'>¡Bienvenido!</h1>
                        <section className='Logotipo'>
                            <img src={pago} alt='Pagos' className='logotipo' />
                        </section>
                    </>
                )}
            </section>
        </>
    );
};

export default Index;
