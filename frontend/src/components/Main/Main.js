import { Routes, Route } from 'react-router-dom';
import Index from '../Index/Index';
import Login from '../Login/Login';
import Users from '../Users/Users';
import Pagos from '../Pagos/Pagos';
import SignUp from '../SignUp/SignUp';

const Main = () => {
    return (
        <main className="App-main">
            <Routes>
                <Route path="/" element={<Index greeting={'Inicio'} />} />
                <Route path="/login" element={<Login greeting={'Ingresar'} />} />
                <Route path="/users" element={<Users greeting={'Usuarios'} />} />
                <Route path="/pagos" element={<Pagos greeting={'Pagos'} />} />
                <Route path="/signup" element={<SignUp greeting={'SignUp'} />} />
            </Routes>
        </main>
    )
}

export default Main;
