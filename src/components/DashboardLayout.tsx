import { type ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../services/auth";
import { GoBell, GoSearch } from "react-icons/go";
import "../styles/Dashboard.scss";
import { FiMenu } from "react-icons/fi";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="dashboard-layout">
      <header className="header">
        <div className="header__content">
          <div className="header__left">
            <div className="header__logo">
              <img src="/logo.svg" alt="Lendsqr" />
            </div>
            <div className="header__search">
              <input type="text" placeholder="Search for anything" />
              <button aria-label="Search" className="text-white">
                <GoSearch style={{ color: "white" }} />
              </button>
            </div>
          </div>
          <div className="header__right">
            <a href="#" className="header__docs">
              Docs
            </a>
            <div className="header__notification">
              <GoBell />
            </div>
            <div className="header__user">
              <img src="/user-avatar.svg" alt={user?.name || "User"} />
              <span>{user?.name || "Adedeji"}</span>
            </div>
            <button aria-label="Toggle menu"
              className="header__mobile-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
            <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar__content">
          <div className="sidebar__switch">
            <span>Switch Organization</span>
          </div>

          <nav className="sidebar__nav">
            <div className="sidebar__section">
              <div className="sidebar__item">
                <Link to="/dashboard">Dashboard</Link>
              </div>
            </div>

            <div className="sidebar__section">
              <div className="sidebar__section-title">Customers</div>
              <div className="sidebar__item">
                <Link
                  to="/dashboard/users"
                  className={
                    isActive("/dashboard/users") ||
                    location.pathname.includes("/dashboard/users/")
                      ? "active"
                      : ""
                  }
                >
                  Users
                </Link>
              </div>
              <div className="sidebar__item">
                <a href="#">Guarantors</a>
              </div>
              <div className="sidebar__item">
                <a href="#">Loans</a>
              </div>
              <div className="sidebar__item">
                <a href="#">Decision Models</a>
              </div>
              <div className="sidebar__item">
                <a href="#">Savings</a>
              </div>
              <div className="sidebar__item">
                <a href="#">Loan Requests</a>
              </div>
              <div className="sidebar__item">
                <a href="#">Whitelist</a>
              </div>
              <div className="sidebar__item">
                <a href="#">Karma</a>
              </div>
            </div>

            <div className="sidebar__divider"></div>

            <div className="sidebar__section">
              <div className="sidebar__section-title">Settings</div>
              <div className="sidebar__item">
                <a href="#">Preferences</a>
              </div>
              <div className="sidebar__item">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
