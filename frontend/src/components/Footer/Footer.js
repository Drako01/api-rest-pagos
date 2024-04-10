import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
    
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);



    return (      
            
            <section className='Footer'>             
                    <p>
                        &copy; <NavLink className={'LinkToArmoTuSitio'} to={'https://armotusitio.com/'}>ArmoTuSitio.com</NavLink>  | Todos los derechos reservados | Año {currentYear}
                    </p>                             
            </section>        
    )
}

export default Footer;