import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import opcionesTipoPago from '../../opcionesTipoPago';
import { api } from '../../services/api';

const DetallePago = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ monto: '', fecha: '', tipoPago: '', destinatario: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.payment(id);
        const payment = response.data;
        setForm({
          monto: payment.monto,
          fecha: String(payment.fecha).slice(0, 10),
          tipoPago: payment.tipoPago,
          destinatario: payment.destinatario
        });
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.updatePayment(id, form);
      navigate('/pagos', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page-shell centered-state"><div className="loader" /><p>Cargando pago…</p></div>;

  return (
    <section className="detail-page">
      <div className="shell detail-shell">
        <Link className="back-link" to="/pagos">← Volver al dashboard</Link>
        <div className="detail-header">
          <div><span className="eyebrow">EDICIÓN DE OPERACIÓN</span><h1>Pago #{String(id).padStart(4, '0')}</h1><p>Modificá los datos y guardá los cambios sobre el recurso existente.</p></div>
          <span className="badge badge-success">Registro activo</span>
        </div>

        <form className="panel detail-card" onSubmit={handleSubmit}>
          {error && <div className="alert alert-error" role="alert">{error}</div>}
          <div className="form-grid form-grid-two">
            <label className="field"><span>Monto</span><input type="number" min="0.01" step="0.01" name="monto" value={form.monto} onChange={handleChange} required /></label>
            <label className="field"><span>Fecha</span><input type="date" name="fecha" value={form.fecha} onChange={handleChange} required /></label>
            <label className="field"><span>Tipo de pago</span><select name="tipoPago" value={form.tipoPago} onChange={handleChange} required><option value="">Seleccionar</option>{opcionesTipoPago.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="field"><span>Destinatario</span><input name="destinatario" value={form.destinatario} onChange={handleChange} maxLength="120" required /></label>
          </div>
          <div className="form-actions detail-actions"><Link className="button button-ghost" to="/pagos">Cancelar</Link><button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</button></div>
        </form>
      </div>
    </section>
  );
};

export default DetallePago;
