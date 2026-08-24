import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import opcionesTipoPago from '../../opcionesTipoPago';
import { api } from '../../services/api';

const emptyPayment = { monto: '', fecha: '', tipoPago: '', destinatario: '' };

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 2
});

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit', month: '2-digit', year: 'numeric'
});

const escapeCsv = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

const Pagos = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ totalAmount: 0, averageAmount: 0, records: 0 });
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0, limit: 10 });
  const [filters, setFilters] = useState({ search: '', tipoPago: '', dateFrom: '', dateTo: '', sortBy: 'fecha', order: 'desc' });
  const [draftSearch, setDraftSearch] = useState('');
  const [form, setForm] = useState(emptyPayment);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadPayments = useCallback(async (page = meta.page) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.payments({ ...filters, page, limit: meta.limit });
      setPayments(response.data || []);
      setSummary(response.summary || { totalAmount: 0, averageAmount: 0, records: 0 });
      setMeta(response.meta || { page: 1, pages: 1, total: 0, limit: 10 });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [filters, meta.limit, meta.page]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setFilters((current) => ({ ...current, search: draftSearch }));
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [draftSearch]);

  useEffect(() => {
    loadPayments(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.tipoPago, filters.dateFrom, filters.dateTo, filters.sortBy, filters.order]);

  const handleFormChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    setError('');
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setNotice('');
    try {
      await api.createPayment(form);
      setForm(emptyPayment);
      setShowCreate(false);
      setNotice('Pago registrado correctamente.');
      await loadPayments(1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (payment) => {
    const confirmed = window.confirm(`¿Eliminar el pago a ${payment.destinatario} por ${currency.format(Number(payment.monto))}?`);
    if (!confirmed) return;

    setError('');
    try {
      await api.deletePayment(payment.id);
      setNotice('Pago eliminado correctamente.');
      await loadPayments(payments.length === 1 && meta.page > 1 ? meta.page - 1 : meta.page);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const resetFilters = () => {
    setDraftSearch('');
    setFilters({ search: '', tipoPago: '', dateFrom: '', dateTo: '', sortBy: 'fecha', order: 'desc' });
  };

  const exportCsv = () => {
    const rows = [
      ['ID', 'Monto', 'Fecha', 'Tipo de pago', 'Destinatario'],
      ...payments.map((payment) => [payment.id, payment.monto, payment.fecha, payment.tipoPago, payment.destinatario])
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(';')).join('\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `pagos-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const activeFilters = useMemo(() => [filters.search, filters.tipoPago, filters.dateFrom, filters.dateTo].filter(Boolean).length, [filters]);

  return (
    <section className="dashboard-page">
      <div className="shell">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">OPERACIONES</span>
            <h1>Dashboard de pagos</h1>
            <p>Administrá movimientos y analizá la operación de forma centralizada.</p>
          </div>
          <div className="dashboard-heading-actions">
            <span className="operator-label">Operador<br /><strong>{userProfile?.email}</strong></span>
            <button className="button button-primary" type="button" onClick={() => setShowCreate((value) => !value)}>
              {showCreate ? 'Cerrar formulario' : '+ Nuevo pago'}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-error" role="alert">{error}</div>}
        {notice && <div className="alert alert-success" role="status">{notice}</div>}

        <div className="kpi-grid">
          <article className="kpi-card"><span>Volumen filtrado</span><strong>{currency.format(summary.totalAmount)}</strong><small>Importe acumulado</small></article>
          <article className="kpi-card"><span>Ticket promedio</span><strong>{currency.format(summary.averageAmount)}</strong><small>Promedio por operación</small></article>
          <article className="kpi-card"><span>Movimientos</span><strong>{summary.records}</strong><small>Registros encontrados</small></article>
          <article className="kpi-card accent"><span>Filtros activos</span><strong>{activeFilters}</strong><small>{activeFilters ? 'Vista segmentada' : 'Vista completa'}</small></article>
        </div>

        {showCreate && (
          <form className="panel payment-form" onSubmit={handleCreate}>
            <div className="panel-heading"><div><span className="eyebrow">NUEVA OPERACIÓN</span><h2>Registrar pago</h2></div><span className="panel-helper">Todos los campos son obligatorios</span></div>
            <div className="form-grid form-grid-four">
              <label className="field"><span>Monto</span><input name="monto" type="number" min="0.01" step="0.01" value={form.monto} onChange={handleFormChange} placeholder="0,00" required /></label>
              <label className="field"><span>Fecha</span><input name="fecha" type="date" value={form.fecha} onChange={handleFormChange} required /></label>
              <label className="field"><span>Tipo de pago</span><select name="tipoPago" value={form.tipoPago} onChange={handleFormChange} required><option value="">Seleccionar</option>{opcionesTipoPago.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="field"><span>Destinatario</span><input name="destinatario" value={form.destinatario} onChange={handleFormChange} maxLength="120" placeholder="Nombre o razón social" required /></label>
            </div>
            <div className="form-actions"><button className="button button-ghost" type="button" onClick={() => { setForm(emptyPayment); setShowCreate(false); }}>Cancelar</button><button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Registrando…' : 'Registrar pago'}</button></div>
          </form>
        )}

        <div className="panel filters-panel">
          <div className="filters-row">
            <label className="search-field"><span aria-hidden="true">⌕</span><input value={draftSearch} onChange={(event) => setDraftSearch(event.target.value)} placeholder="Buscar destinatario o tipo…" aria-label="Buscar pagos" /></label>
            <select value={filters.tipoPago} onChange={(event) => setFilters((current) => ({ ...current, tipoPago: event.target.value }))} aria-label="Filtrar por tipo de pago"><option value="">Todos los tipos</option>{opcionesTipoPago.map((option) => <option key={option}>{option}</option>)}</select>
            <input type="date" value={filters.dateFrom} onChange={(event) => setFilters((current) => ({ ...current, dateFrom: event.target.value }))} aria-label="Fecha desde" />
            <input type="date" value={filters.dateTo} onChange={(event) => setFilters((current) => ({ ...current, dateTo: event.target.value }))} aria-label="Fecha hasta" />
            <button className="button button-ghost button-small" type="button" onClick={resetFilters}>Limpiar</button>
          </div>
          <div className="filters-secondary">
            <span>{meta.total} resultado{meta.total === 1 ? '' : 's'}</span>
            <div>
              <label>Ordenar por <select value={filters.sortBy} onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value }))}><option value="fecha">Fecha</option><option value="monto">Monto</option><option value="destinatario">Destinatario</option><option value="tipoPago">Tipo</option></select></label>
              <button className="sort-button" type="button" onClick={() => setFilters((current) => ({ ...current, order: current.order === 'asc' ? 'desc' : 'asc' }))} aria-label="Cambiar dirección de orden">{filters.order === 'asc' ? '↑' : '↓'}</button>
              <button className="button button-secondary button-small" type="button" onClick={exportCsv} disabled={!payments.length}>Exportar CSV</button>
            </div>
          </div>
        </div>

        <div className="panel payments-panel">
          {loading ? (
            <div className="centered-state"><div className="loader" /><p>Cargando operaciones…</p></div>
          ) : payments.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">₱</div><h3>No encontramos pagos</h3><p>Probá ajustando los filtros o registrá una nueva operación.</p><button className="button button-primary" type="button" onClick={() => setShowCreate(true)}>Registrar pago</button></div>
          ) : (
            <div className="table-scroll">
              <table className="data-table">
                <thead><tr><th>Operación</th><th>Destinatario</th><th>Tipo</th><th>Fecha</th><th className="align-right">Monto</th><th className="align-right">Acciones</th></tr></thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td data-label="Operación"><span className="payment-id">#{String(payment.id).padStart(4, '0')}</span></td>
                      <td data-label="Destinatario"><strong>{payment.destinatario}</strong></td>
                      <td data-label="Tipo"><span className="badge">{payment.tipoPago}</span></td>
                      <td data-label="Fecha">{dateFormatter.format(new Date(payment.fecha))}</td>
                      <td data-label="Monto" className="align-right amount-cell">{currency.format(Number(payment.monto))}</td>
                      <td data-label="Acciones" className="align-right"><div className="row-actions"><button type="button" onClick={() => navigate(`/detalle/${payment.id}`)} aria-label={`Editar pago ${payment.id}`}>Editar</button><button type="button" className="danger-link" onClick={() => handleDelete(payment)} aria-label={`Eliminar pago ${payment.id}`}>Eliminar</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && meta.pages > 1 && (
            <div className="pagination">
              <button type="button" disabled={meta.page <= 1} onClick={() => loadPayments(meta.page - 1)}>← Anterior</button>
              <span>Página <strong>{meta.page}</strong> de {meta.pages}</span>
              <button type="button" disabled={meta.page >= meta.pages} onClick={() => loadPayments(meta.page + 1)}>Siguiente →</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pagos;
