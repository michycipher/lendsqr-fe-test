import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/api';
import type { DashboardStats } from '../../types';
import '../../styles/DashboardHome.scss';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const statsData = await getDashboardStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-page__title">Dashboard</h1>

      <div className="dashboard-page__stats">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--users">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M14 18C17.3137 18 20 15.3137 20 12C20 8.68629 17.3137 6 14 6C10.6863 6 8 8.68629 8 12C8 15.3137 10.6863 18 14 18Z" stroke="#DF18FF" strokeWidth="2" />
              <path d="M2 34C2 28.4772 6.47715 24 12 24H16C21.5228 24 26 28.4772 26 34V36H2V34Z" stroke="#DF18FF" strokeWidth="2" />
              <path d="M28 18C30.7614 18 33 15.7614 33 13C33 10.2386 30.7614 8 28 8" stroke="#DF18FF" strokeWidth="2" strokeLinecap="round" />
              <path d="M34 36V34C34 30.134 31.2091 26.9174 27.5 26.17" stroke="#DF18FF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="stat-card__label">Users</div>
          <div className="stat-card__value">{stats?.totalUsers.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--active">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" stroke="#5718FF" strokeWidth="2" />
              <path d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V34H10V32Z" stroke="#5718FF" strokeWidth="2" />
            </svg>
          </div>
          <div className="stat-card__label">Active Users</div>
          <div className="stat-card__value">{stats?.activeUsers.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--loans">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M8 16H32M8 16V30C8 31.1046 8.89543 32 10 32H30C31.1046 32 32 31.1046 32 30V16M8 16L11.5 8H28.5L32 16M16 22V26M24 22V26" stroke="#F55F44" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="stat-card__label">Users with Loans</div>
          <div className="stat-card__value">{stats?.usersWithLoans.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--savings">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10Z" stroke="#FF3366" strokeWidth="2" />
              <path d="M20 14V20L24 24" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="stat-card__label">Users with Savings</div>
          <div className="stat-card__value">{stats?.usersWithSavings.toLocaleString()}</div>
        </div>
      </div>

      <div className="dashboard-page__welcome">
        <h2>Welcome to Lendsqr Admin Dashboard</h2>
        <p>Manage your users, view statistics, and monitor activities all in one place.</p>
      </div>
    </div>
  );
};

export default Dashboard;