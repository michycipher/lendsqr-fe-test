import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { logout, getCurrentUser } from '../../services/auth';
import { routePaths } from '../../routes/route-paths';
import { 
  GoBell, 
  GoSearch, 
  GoChevronDown 
} from 'react-icons/go';
import { 
  FiUsers, 
  FiShield, 
  FiDollarSign, 
  FiBarChart, 
  FiCreditCard, 
  FiFileText,
  FiStar,
  FiSettings,
  FiLogOut,
  FiMenu 
} from 'react-icons/fi';
import '../../styles/Dashboard.scss';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate(routePaths.auth.login);
  };

  const isActive = (path: string) => 
    location.pathname === path || location.pathname.includes(path);

  // Close sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };
    handleRouteChange();
  }, [location.pathname]);

  return (
    <div className="dashboard-layout">
      <header className="header">
        <div className="header__content">
          <div className="header__left">
            <div className="header__logo">
              <img src="/logo.svg" alt="Lendsqr" />
            </div>
            <div className="header__search">
              <input 
                type="text" 
                placeholder="Search for anything" 
              />
              <button aria-label="Search">
                <GoSearch />
              </button>
            </div>
          </div>
          <div className="header__right">
            <a href="#" className="header__docs">
              Docs
            </a>
            <div className="header__notification">
              <GoBell />
              <span className="notification-badge">3</span>
            </div>
            <div className="header__user">
              <img src="/user-avatar.svg" alt={user?.name || 'User'} />
              <span>{user?.name || 'Adedeji'}</span>
              <GoChevronDown />
            </div>
            <button 
              aria-label="Toggle menu"
              className="header__mobile-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar__content">
          <div className="sidebar__switch">
            <FiSettings />
            <span>Switch Organization</span>
            <GoChevronDown />
          </div>

          <nav className="sidebar__nav">
            <div className="sidebar__section">
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.home}
                  className={isActive(routePaths.dashboard.home) && !isActive('/users') ? 'active' : ''}
                >
                  <FiBarChart />
                  Dashboard
                </Link>
              </div>
            </div>

            <div className="sidebar__section">
              <div className="sidebar__section-title">Customers</div>
              <div className="sidebar__item">
                <Link
                  to={routePaths.dashboard.users}
                  className={isActive(routePaths.dashboard.users) ? 'active' : ''}
                >
                  <FiUsers />
                  Users
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.guarantors}
                  className={isActive(routePaths.dashboard.guarantors) ? 'active' : ''}
                >
                  <FiShield />
                  Guarantors
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.loans}
                  className={isActive(routePaths.dashboard.loans) ? 'active' : ''}
                >
                  <FiDollarSign />
                  Loans
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.decisionModels}
                  className={isActive(routePaths.dashboard.decisionModels) ? 'active' : ''}
                >
                  <FiBarChart />
                  Decision Models
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.savings}
                  className={isActive(routePaths.dashboard.savings) ? 'active' : ''}
                >
                  <FiCreditCard />
                  Savings
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.loanRequests}
                  className={isActive(routePaths.dashboard.loanRequests) ? 'active' : ''}
                >
                  <FiFileText />
                  Loan Requests
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.whitelist}
                  className={isActive(routePaths.dashboard.whitelist) ? 'active' : ''}
                >
                  <FiStar />
                  Whitelist
                </Link>
              </div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.karma}
                  className={isActive(routePaths.dashboard.karma) ? 'active' : ''}
                >
                  <FiStar />
                  Karma
                </Link>
              </div>
            </div>

            <div className="sidebar__divider"></div>

            <div className="sidebar__section">
              <div className="sidebar__section-title">Settings</div>
              <div className="sidebar__item">
                <Link 
                  to={routePaths.dashboard.preferences}
                  className={isActive(routePaths.dashboard.preferences) ? 'active' : ''}
                >
                  <FiSettings />
                  Preferences
                </Link>
              </div>
              <div className="sidebar__item">
                <button onClick={handleLogout}>
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;