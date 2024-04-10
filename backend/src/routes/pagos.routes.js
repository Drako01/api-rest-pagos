import express from 'express';
import PagosController from '../controllers/PagosController.js';

const router = express.Router();

router.post('/', PagosController.crearPago);

router.get('/', PagosController.obtenerPagos);

router.get('/:id', PagosController.obtenerPagoPorId);

router.put('/:id', PagosController.actualizarPago);

router.delete('/:id', PagosController.eliminarPago);

export default router;
