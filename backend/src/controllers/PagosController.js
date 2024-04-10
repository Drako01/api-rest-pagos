import { Pagos } from '../models/Pagos.js';

class PagosController {
    
    async crearPago(req, res) {
        try {
            const nuevoPago = await Pagos.create(req.body);
            res.status(201).json(nuevoPago);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async obtenerPagos(req, res) {
        try {
            const pagos = await Pagos.findAll();
            res.json(pagos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los pagos' });
        }
    }

    async obtenerPagoPorId(req, res) {
        const id = req.params.id;
        try {
            const pago = await Pagos.findByPk(id);
            if (!pago) {
                return res.status(404).json({ error: 'Pago no encontrado' });
            }
            res.json(pago);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el pago' });
        }
    }

    async actualizarPago(req, res) {
        const id = req.params.id;
        try {
            const [numFilasActualizadas, pagoActualizado] = await Pagos.update(req.body, {
                where: { id },
                returning: true, 
            });
            if (numFilasActualizadas === 0) {
                return res.status(404).json({ error: 'Pago no encontrado' });
            }
            res.json(pagoActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el pago' });
        }
    }

    async eliminarPago(req, res) {
        const id = req.params.id;
        try {
            const numFilasEliminadas = await Pagos.destroy({ where: { id } });
            if (numFilasEliminadas === 0) {
                return res.status(404).json({ error: 'Pago no encontrado' });
            }
            res.json({ mensaje: 'Pago eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el pago' });
        }
    }
}

export default new PagosController();
