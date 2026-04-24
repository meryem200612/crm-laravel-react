import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineUserCircle, HiOutlineKey } from 'react-icons/hi2';

const Technicians = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTech, setNewTech] = useState({ name: '', email: '', password: '', role: 'technicien' });

  const fetchTechs = async () => {
    try {
      const res = await api.get('/users');
      setTechs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', newTech);
      setShowModal(false);
      setNewTech({ name: '', email: '', password: '', role: 'technicien' });
      fetchTechs();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la création');
    }
  };

  const deleteTech = async (id) => {
    if (window.confirm('Supprimer ce technicien ?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchTechs();
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="techs-page">
      <header className="page-header">
        <h1 className="page-title">Équipe Technique</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <HiOutlinePlus /> Ajouter un Technicien
        </button>
      </header>

      <div className="techs-grid">
        {techs.map((tech) => (
          <div key={tech.id} className="card tech-card">
            <div className="tech-avatar">
              <HiOutlineUserCircle />
            </div>
            <div className="tech-info">
              <h3 className="tech-name">{tech.name}</h3>
              <p className="tech-email">{tech.email}</p>
              <span className="tech-count">{tech.interventions_count} interventions</span>
            </div>
            <div className="tech-actions">
              <button className="btn-icon btn-icon-danger" onClick={() => deleteTech(tech.id)} title="Supprimer">
                <HiOutlineTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2 className="modal-title">Nouveau Technicien</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" value={newTech.name} onChange={e => setNewTech({...newTech, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={newTech.email} onChange={e => setNewTech({...newTech, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <div className="input-group">
                  <input type="password" value={newTech.password} onChange={e => setNewTech({...newTech, password: e.target.value})} required minLength="6" />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Créer le compte</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .techs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .tech-card { text-align: center; display: flex; flex-direction: column; align-items: center; padding: 2rem 1.5rem; }
        .tech-avatar { font-size: 4rem; color: var(--primary); margin-bottom: 1rem; }
        .tech-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
        .tech-email { color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem; }
        .tech-count { font-size: 0.75rem; font-weight: 700; color: var(--primary); background: #eef2ff; padding: 4px 12px; border-radius: 99px; }
        .tech-actions { margin-top: 1.5rem; width: 100%; border-top: 1px solid var(--border); padding-top: 1rem; display: flex; justify-content: center; }
      `}} />
    </div>
  );
};

export default Technicians;
