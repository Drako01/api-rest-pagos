import { Op } from 'sequelize';
import { Pagos } from '../models/Pagos.js';
import { parsePositiveInt, validatePayment } from '../utils/validation.js';

const SORTABLE_FIELDS = new Set(['fecha', 'monto', 'destinatario', 'tipoPago', 'createdAt']);

const buildWhere = (query) => {
  const where = {};
  const search = typeof query.search === 'string' ? query.search.trim() : '';

  if (search) {
    where[Op.or] = [
      { destinatario: { [Op.iLike]: `%${search}%` } },
      { tipoPago: { [Op.iLike]: `%${search}%` } }
    ];
  }

  if (query.tipoPago) {
    where.tipoPago = query.tipoPago;
  }

  if (query.dateFrom || query.dateTo) {
    where.fecha = {};
    if (query.dateFrom) where.fecha[Op.gte] = new Date(query.dateFrom);
    if (query.dateTo) {
      const end = new Date(query.dateTo);
      end.setHours(23, 59, 59, 999);
      where.fecha[Op.lte] = end;
    }
  }

  if (query.minAmount || query.maxAmount) {
    where.monto = {};
    if (query.minAmount) where.monto[Op.gte] = Number(query.minAmount);
    if (query.maxAmount) where.monto[Op.lte] = Number(query.maxAmount);
  }

  return where;
};

class PagosController {
  async crearPago(req, res, next) {
    try {
      const validation = validatePayment(req.body);
      if (!validation.valid) {
        return res.status(422).json({
          error: { code: 'VALIDATION_ERROR', message: 'El pago contiene datos inválidos.', fields: validation.errors }
        });
      }

      const payment = await Pagos.create(validation.value);
      return res.status(201).json({ data: payment });
    } catch (error) {
      return next(error);
    }
  }

  async obtenerPagos(req, res, next) {
    try {
      const page = parsePositiveInt(req.query.page, 1);
      const limit = parsePositiveInt(req.query.limit, 10, 100);
      const offset = (page - 1) * limit;
      const sortBy = SORTABLE_FIELDS.has(req.query.sortBy) ? req.query.sortBy : 'fecha';
      const order = String(req.query.order || 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      const where = buildWhere(req.query);

      const [{ rows, count }, totalAmount] = await Promise.all([
        Pagos.findAndCountAll({ where, limit, offset, order: [[sortBy, order]] }),
        Pagos.sum('monto', { where })
      ]);

      const pages = Math.max(1, Math.ceil(count / limit));
      return res.json({
        data: rows,
        meta: { page, limit, total: count, pages, sortBy, order: order.toLowerCase() },
        summary: {
          totalAmount: Number(totalAmount || 0),
          averageAmount: count ? Number(totalAmount || 0) / count : 0,
          records: count
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  async obtenerPagoPorId(req, res, next) {
    try {
      const payment = await Pagos.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: { code: 'PAYMENT_NOT_FOUND', message: 'Pago no encontrado.' } });
      }
      return res.json({ data: payment });
    } catch (error) {
      return next(error);
    }
  }

  async actualizarPago(req, res, next) {
    try {
      const validation = validatePayment(req.body);
      if (!validation.valid) {
        return res.status(422).json({
          error: { code: 'VALIDATION_ERROR', message: 'El pago contiene datos inválidos.', fields: validation.errors }
        });
      }

      const payment = await Pagos.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: { code: 'PAYMENT_NOT_FOUND', message: 'Pago no encontrado.' } });
      }

      await payment.update(validation.value);
      return res.json({ data: payment });
    } catch (error) {
      return next(error);
    }
  }

  async eliminarPago(req, res, next) {
    try {
      const payment = await Pagos.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: { code: 'PAYMENT_NOT_FOUND', message: 'Pago no encontrado.' } });
      }

      await payment.destroy();
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

export default new PagosController();
