import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  HiOutlineUsers, 
  HiOutlineWrenchScrewdriver, 
  HiOutlineCheckBadge, 
  HiOutlineClock 
} from 'react-icons/hi2';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Chargement...</div>;

  const cards = [
    { label: 'Total Clients', value: stats.total_clients, icon: <HiOutlineUsers />, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Interventions', value: stats.total_interventions, icon: <HiOutlineWrenchScrewdriver />, color: '#10b981', bg: '#ecfdf5' },
    { label: 'En Attente', value: stats.en_attente, icon: <HiOutlineClock />, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Terminées', value: stats.terminees, icon: <HiOutlineCheckBadge />, color: '#3b82f6', bg: '#eff6ff' },
  ];

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
      </header>

      <div className="stats-grid">
        {cards.map((card, i) => (
          <div key={i} className="card stat-card">
            <div className="stat-icon" style={{ backgroundColor: card.bg, color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{card.label}</span>
              <span className="stat-value">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Interventions Récentes</h2>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Description</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_interventions.map((int) => (
                  <tr key={int.id}>
                    <td><strong>{int.client?.nom}</strong></td>
                    <td>{int.description.substring(0, 50)}...</td>
                    <td>
                      <span className={`badge badge-${int.statut}`}>
                        {int.statut.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{new Date(int.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-responsive { overflow-x: auto; margin-top: 1rem; }
        .table { width: 100%; border-collapse: collapse; }
        .table th { text-align: left; padding: 1rem; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); }
        .table td { padding: 1rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
        .badge { padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; }
        .badge-en_attente { background: #fff7ed; color: #9a3412; }
        .badge-en_cours { background: #eff6ff; color: #1e40af; }
        .badge-terminé { background: #f0fdf4; color: #166534; }
        .card-header { margin-bottom: 1rem; }
        .card-title { font-size: 1.125rem; font-weight: 700; }
      `}} />
    </div>
  );
};

export default Dashboard;
