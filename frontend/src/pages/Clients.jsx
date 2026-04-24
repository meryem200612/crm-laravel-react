import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState({ nom: '', email: '', telephone: '', adresse: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients');
      setClients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/clients/${currentClient.id}`, currentClient);
      } else {
        await api.post('/clients', currentClient);
      }
      setShowModal(false);
      setCurrentClient({ nom: '', email: '', telephone: '', adresse: '' });
      fetchClients();
    } catch (err) {
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce client ?')) {
      try {
        await api.delete(`/clients/${id}`);
        fetchClients();
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const openEdit = (client) => {
    setCurrentClient(client);
    setIsEditing(true);
    setShowModal(true);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="clients-page">
      <header className="page-header">
        <h1 className="page-title">Gestion des Clients</h1>
        <button className="btn btn-primary" onClick={() => { setIsEditing(false); setCurrentClient({ nom: '', email: '', telephone: '', adresse: '' }); setShowModal(true); }}>
          <HiOutlinePlus /> Nouveau Client
        </button>
      </header>

      <div className="clients-grid">
        {clients.map((client) => (
          <div key={client.id} className="card client-card">
            <div className="client-header">
              <div className="client-avatar-large">{client.nom.charAt(0)}</div>
              <div className="client-main-info">
                <h3 className="client-name">{client.nom}</h3>
                <span className="client-interventions">{client.interventions_count} interventions</span>
              </div>
            </div>
            <div className="client-details">
              <p><HiOutlineEnvelope /> {client.email || 'Pas d\'email'}</p>
              <p><HiOutlinePhone /> {client.telephone || 'Pas de téléphone'}</p>
            </div>
            <div className="client-actions">
              <button className="btn-icon" onClick={() => openEdit(client)}><HiOutlinePencil /></button>
              <button className="btn-icon btn-icon-danger" onClick={() => deleteClient(client.id)}><HiOutlineTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2 className="modal-title">{isEditing ? 'Modifier Client' : 'Ajouter un Client'}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nom complet *</label>
                <input type="text" value={currentClient.nom} onChange={e => setCurrentClient({ ...currentClient, nom: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={currentClient.email} onChange={e => setCurrentClient({ ...currentClient, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input type="text" value={currentClient.telephone} onChange={e => setCurrentClient({ ...currentClient, telephone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <textarea value={currentClient.adresse} onChange={e => setCurrentClient({ ...currentClient, adresse: e.target.value })} rows="2" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .client-card { display: flex; flex-direction: column; gap: 1rem; }
        .client-header { display: flex; align-items: center; gap: 1rem; }
        .client-avatar-large { width: 50px; height: 50px; background: #eef2ff; color: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; }
        .client-name { font-size: 1.125rem; font-weight: 700; margin: 0; }
        .client-interventions { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .client-details { font-size: 0.875rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.5rem; }
        .client-details p { display: flex; align-items: center; gap: 8px; margin: 0; }
        .client-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border); }
        .btn-icon { background: none; border: 1px solid var(--border); padding: 8px; border-radius: 8px; color: var(--text-muted); display: flex; }
        .btn-icon:hover { background: #f1f5f9; color: var(--primary); border-color: var(--primary); }
        .btn-icon-danger:hover { background: #fee2e2; color: var(--danger); border-color: var(--danger); }
        
        /* Modal Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .modal-content { width: 100%; max-width: 500px; padding: 2rem; }
        .modal-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; }
        .modal-form input, .modal-form textarea { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; }
        .btn-secondary { background: #e2e8f0; color: var(--text); }
      `}} />
    </div>
  );
};

export default Clients;
