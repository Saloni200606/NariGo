import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, TrendingUp, History } from 'lucide-react';
import '../rsldc/rsldc-pages.css';

const Earnings = () => {
  const navigate = useNavigate();

  return (
    <div className="rsldc-page-container page-padding">
      <div className="rsldc-page-header">
        <button 
          className="secondary-btn" 
          style={{ width: 'fit-content', padding: '0 20px', marginBottom: '20px', height: '44px' }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Back
        </button>
        <h1 className="text-heading">My Earnings</h1>
      </div>

      <div className="rsldc-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Total Earnings Card */}
        <div className="rsldc-item-card glass-card" style={{ background: 'linear-gradient(135deg, rgba(244, 63, 117, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Wallet color="var(--color-primary)" size={24} />
            <h2 className="text-subheading">Total Balance</h2>
          </div>
          <h1 className="text-heading" style={{ fontSize: '42px', color: 'var(--color-dark-rose)' }}>₹ 4,500</h1>
          <p className="text-body" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent-green)' }}>
            <TrendingUp size={16} /> +12% this month
          </p>
          <div className="rsldc-action-row" style={{ marginTop: '20px' }}>
            <button className="primary-btn" style={{ width: '100%' }}>Withdraw Funds</button>
          </div>
        </div>

        {/* Transactions */}
        <h3 className="text-subheading" style={{ marginTop: '16px' }}>Recent Transactions</h3>
        <div className="rsldc-item-card glass-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <div className="rsldc-icon-circle" style={{ width: '48px', height: '48px', marginBottom: 0, flexShrink: 0 }}>
            <History size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="rsldc-title" style={{ fontSize: '16px' }}>Tailoring Order</h3>
            <p className="text-body" style={{ fontSize: '14px', marginTop: '4px' }}>Received via Bank Transfer</p>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-accent-green)' }}>+ ₹ 1,200</span>
        </div>

      </div>
    </div>
  );
};

export default Earnings;
