import express from 'express';
import PagosController from '../controllers/PagosController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);
router.get('/', PagosController.obtenerPagos);
router.post('/', PagosController.crearPago);
router.get('/:id', PagosController.obtenerPagoPorId);
router.put('/:id', PagosController.actualizarPago);
router.delete('/:id', PagosController.eliminarPago);

export default router;
