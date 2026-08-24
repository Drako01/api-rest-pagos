import { Navigate, Route, Routes } from 'react-router-dom';
import Index from '../Index/Index';
import Login from '../Login/Login';
import Users from '../Users/Users';
import Pagos from '../Pagos/Pagos';
import SignUp from '../SignUp/SignUp';
import DetallePago from '../DetallePago/DetallePago';
import ProtectedRoute from '../ProtectedRoute';

const Main = () => (
  <main className="app-main">
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pagos" element={<ProtectedRoute><Pagos /></ProtectedRoute>} />
      <Route path="/detalle/:id" element={<ProtectedRoute><DetallePago /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </main>
);

export default Main;
