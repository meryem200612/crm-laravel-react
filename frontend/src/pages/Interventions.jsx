import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineUser, HiOutlineCalendarDays } from 'react-icons/hi2';

const Interventions = () => {
  const [interventions, setInterventions] = useState([]);
  const [clients, setClients] = useState([]);
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInt, setCurrentInt] = useState({ 
    client_id: '', 
    user_id: '', 
    description: '', 
    statut: 'en_attente', 
    date: new Date().toISOString().split('T')[0] 
  });

  const fetchData = async () => {
    try {
      const [intRes, clientRes, techRes] = await Promise.all([
        api.get('/interventions'),
        api.get('/clients'),
        api.get('/users')
      ]);
      setInterventions(intRes.data);
      setClients(clientRes.data);
      setTechs(techRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/interventions/${currentInt.id}`, currentInt);
      } else {
        await api.post('/interventions', currentInt);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const deleteInt = async (id) => {
    if (window.confirm('Voulez-vous supprimer cette intervention ?')) {
      try {
        await api.delete(`/interventions/${id}`);
        fetchData();
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const openEdit = (int) => {
    setCurrentInt({
      ...int,
      client_id: int.client_id,
      user_id: int.user_id || '',
      date: int.date
    });
    setIsEditing(true);
    setShowModal(true);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="interventions-page">
      <header className="page-header">
        <h1 className="page-title">Interventions</h1>
        <button className="btn btn-primary" onClick={() => { setIsEditing(false); setCurrentInt({ client_id: '', user_id: '', description: '', statut: 'en_attente', date: new Date().toISOString().split('T')[0] }); setShowModal(true); }}>
          <HiOutlinePlus /> Nouvelle Intervention
        </button>
      </header>

      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Description</th>
                <th>Technicien</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interventions.map((int) => (
                <tr key={int.id}>
                  <td>
                    <div className="date-cell">
                      <HiOutlineCalendarDays /> {new Date(int.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td><strong>{int.client?.nom}</strong></td>
                  <td><p className="desc-text" title={int.description}>{int.description}</p></td>
                  <td>
                    <div className="tech-cell">
                      <HiOutlineUser /> {int.technicien?.name || 'Non assigné'}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${int.statut}`}>
                      {int.statut.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-icon" onClick={() => openEdit(int)}><HiOutlinePencil /></button>
                      <button className="btn-icon btn-icon-danger" onClick={() => deleteInt(int.id)}><HiOutlineTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2 className="modal-title">{isEditing ? 'Modifier Intervention' : 'Nouvelle Intervention'}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Client *</label>
                <select value={currentInt.client_id} onChange={e => setCurrentInt({...currentInt, client_id: e.target.value})} required>
                  <option value="">Sélectionner un client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Technicien</label>
                <select value={currentInt.user_id} onChange={e => setCurrentInt({...currentInt, user_id: e.target.value})}>
                  <option value="">Non assigné</option>
                  {techs.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" value={currentInt.date} onChange={e => setCurrentInt({...currentInt, date: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea value={currentInt.description} onChange={e => setCurrentInt({...currentInt, description: e.target.value})} rows="3" required />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select value={currentInt.statut} onChange={e => setCurrentInt({...currentInt, statut: e.target.value})}>
                  <option value="en_attente">En Attente</option>
                  <option value="en_cours">En Cours</option>
                  <option value="terminé">Terminé</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .date-cell, .tech-cell { display: flex; align-items: center; gap: 8px; font-weight: 500; }
        .date-cell svg, .tech-cell svg { color: var(--primary); }
        .desc-text { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
        .actions-cell { display: flex; gap: 8px; }
        .modal-form select { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; background: white; }
        .table th, .table td { padding: 12px 20px; }
        .table th { letter-spacing: 0.05em; }
      `}} />
    </div>
  );
};

export default Interventions;
