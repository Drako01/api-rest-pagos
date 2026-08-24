const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCredentials = ({ email, password }) => {
  const errors = {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = 'Ingresá un email válido.';
  }

  if (typeof password !== 'string' || password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { email: normalizedEmail, password }
  };
};

export const validatePayment = (payload = {}) => {
  const errors = {};
  const amount = Number(payload.monto);
  const recipient = typeof payload.destinatario === 'string' ? payload.destinatario.trim() : '';
  const paymentType = typeof payload.tipoPago === 'string' ? payload.tipoPago.trim() : '';
  const rawDate = payload.fecha;
  const parsedDate = rawDate ? new Date(rawDate) : null;

  if (!Number.isFinite(amount) || amount <= 0 || amount > 99999999.99) {
    errors.monto = 'El monto debe ser mayor a 0 y respetar el límite admitido.';
  }

  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    errors.fecha = 'Ingresá una fecha válida.';
  }

  if (paymentType.length < 2 || paymentType.length > 60) {
    errors.tipoPago = 'El tipo de pago debe tener entre 2 y 60 caracteres.';
  }

  if (recipient.length < 2 || recipient.length > 120) {
    errors.destinatario = 'El destinatario debe tener entre 2 y 120 caracteres.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: {
      monto: amount,
      fecha: parsedDate,
      tipoPago: paymentType,
      destinatario: recipient
    }
  };
};

export const parsePositiveInt = (value, fallback, max = Number.MAX_SAFE_INTEGER) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
};
