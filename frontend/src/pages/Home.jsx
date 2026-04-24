import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineCpuChip, HiOutlineUserGroup } from 'react-icons/hi2';

const Home = () => {
  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="logo-container">
          <div className="logo-icon">MJ</div>
          <span className="logo-text">MJ Informatique</span>
        </div>
        <Link to="/login" className="btn btn-primary">
          Espace Professionnel <HiOutlineArrowRight />
        </Link>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Solutions IT Intelligentes pour <span className="text-gradient">MJ Informatique</span>
          </h1>
          <p className="hero-subtitle">
            Simplifiez la gestion de vos clients, suivez vos interventions en temps réel et optimisez la productivité de vos techniciens avec notre CRM sur mesure.
          </p>
          <div className="hero-btns">
            <Link to="/login" className="btn btn-primary btn-lg">
              Commencer maintenant
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              En savoir plus
            </a>
          </div>
        </div>
        <div className="hero-visual">
            <div className="abstract-shape"></div>
            <div className="dashboard-preview card glass">
                <div className="preview-header">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>
                <div className="preview-body">
                    <div className="preview-line long"></div>
                    <div className="preview-line medium"></div>
                    <div className="preview-grid">
                        <div className="preview-box"></div>
                        <div className="preview-box"></div>
                        <div className="preview-box"></div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Nos Services CRM</h2>
          <p className="section-subtitle">Une plateforme complète pour piloter votre activité informatique.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon"><HiOutlineUserGroup /></div>
            <h3>Gestion Clients</h3>
            <p>Centralisez toutes les informations de vos clients et accédez à leur historique en un clic.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon"><HiOutlineCpuChip /></div>
            <h3>Suivi Interventions</h3>
            <p>Gérez vos demandes de maintenance, de la panne à la résolution finale.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon"><HiOutlineShieldCheck /></div>
            <h3>Sécurité & Rôles</h3>
            <p>Un accès sécurisé pour vos techniciens et une interface de contrôle pour les administrateurs.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2026 MJ Informatique. Tous droits réservés.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-page { background: #fdfdfd; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .home-nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 5%; max-width: 1400px; margin: 0 auto; }
        
        .hero-section { display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 4rem 5%; max-width: 1400px; margin: 0 auto; gap: 4rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: #0f172a; }
        .text-gradient { background: linear-gradient(135deg, var(--primary), #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.25rem; color: #64748b; margin-bottom: 2.5rem; line-height: 1.6; max-width: 600px; }
        .hero-btns { display: flex; gap: 1rem; }
        .btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
        
        .hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
        .abstract-shape { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%); border-radius: 50%; filter: blur(40px); z-index: -1; }
        .dashboard-preview { width: 100%; max-width: 500px; height: 320px; border-radius: 16px; padding: 0; overflow: hidden; transform: perspective(1000px) rotateY(-15deg) rotateX(10deg); transition: transform 0.5s ease; box-shadow: 0 30px 60px rgba(0,0,0,0.12); }
        .dashboard-preview:hover { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
        .preview-header { background: #f1f5f9; padding: 10px; display: flex; gap: 6px; border-bottom: 1px solid #e2e8f0; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.red { background: #ff5f56; } .dot.yellow { background: #ffbd2e; } .dot.green { background: #27c93f; }
        .preview-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .preview-line { height: 10px; background: #e2e8f0; border-radius: 5px; }
        .preview-line.long { width: 80%; } .preview-line.medium { width: 50%; }
        .preview-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 1rem; }
        .preview-box { height: 60px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }

        .features-section { padding: 6rem 5%; max-width: 1400px; margin: 0 auto; text-align: center; }
        .section-header { margin-bottom: 4rem; }
        .section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
        .section-subtitle { color: #64748b; font-size: 1.1rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature-card { padding: 3rem 2rem; transition: transform 0.3s ease; }
        .feature-card:hover { transform: translateY(-10px); border-color: var(--primary); }
        .feature-icon { font-size: 3rem; color: var(--primary); margin-bottom: 1.5rem; }
        .feature-card h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
        .feature-card p { color: #64748b; line-height: 1.6; }

        .home-footer { padding: 4rem 5%; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 0.9rem; }

        @media (max-width: 968px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .hero-title { font-size: 2.5rem; }
          .dashboard-preview { transform: none; margin-top: 2rem; }
        }
      `}} />
    </div>
  );
};

export default Home;
