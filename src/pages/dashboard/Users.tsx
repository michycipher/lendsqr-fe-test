import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getDashboardStats } from '../../services/api';
import type { User, DashboardStats } from '../../types';
// import { routePaths } from '../../routes/route-paths';
import '../../styles/User.scss';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterOpen, setFilterOpen] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    phoneNumber: '',
    status: '',
    date: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        getUsers(),
        getDashboardStats(),
      ]);
      setUsers(usersData);
      setFilteredUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }

    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.phoneNumber) {
      filtered = filtered.filter((user) =>
        user.phoneNumber.includes(filters.phoneNumber)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (user) =>
          user.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.date) {
      filtered = filtered.filter((user) =>
        user.dateJoined.startsWith(filters.date)
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      phoneNumber: '',
      status: '',
      date: '',
    });
    setFilterOpen(null);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleFilterClick = (column: string) => {
    setFilterOpen(filterOpen === column ? null : column);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.users-table__header-cell') &&
        !target.closest('.filter-dropdown')
      ) {
        setFilterOpen(null);
      }
      if (!target.closest('.users-table__actions')) {
        setActionMenuOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-page">
      <h1 className="users-page__title">Users</h1>

      <div className="users-page__stats">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--users">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M14 18C17.3137 18 20 15.3137 20 12C20 8.68629 17.3137 6 14 6C10.6863 6 8 8.68629 8 12C8 15.3137 10.6863 18 14 18Z"
                stroke="#DF18FF"
                strokeWidth="2"
              />
              <path
                d="M2 34C2 28.4772 6.47715 24 12 24H16C21.5228 24 26 28.4772 26 34V36H2V34Z"
                stroke="#DF18FF"
                strokeWidth="2"
              />
              <path
                d="M28 18C30.7614 18 33 15.7614 33 13C33 10.2386 30.7614 8 28 8"
                stroke="#DF18FF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M34 36V34C34 30.134 31.2091 26.9174 27.5 26.17"
                stroke="#DF18FF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="stat-card__label">Users</div>
          <div className="stat-card__value">
            {stats?.totalUsers.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--active">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
                stroke="#5718FF"
                strokeWidth="2"
              />
              <path
                d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V34H10V32Z"
                stroke="#5718FF"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="stat-card__label">Active Users</div>
          <div className="stat-card__value">
            {stats?.activeUsers.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--loans">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M8 16H32M8 16V30C8 31.1046 8.89543 32 10 32H30C31.1046 32 32 31.1046 32 30V16M8 16L11.5 8H28.5L32 16M16 22V26M24 22V26"
                stroke="#F55F44"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="stat-card__label">Users with Loans</div>
          <div className="stat-card__value">
            {stats?.usersWithLoans.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--savings">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10Z"
                stroke="#FF3366"
                strokeWidth="2"
              />
              <path
                d="M20 14V20L24 24"
                stroke="#FF3366"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="stat-card__label">Users with Savings</div>
          <div className="stat-card__value">
            {stats?.usersWithSavings.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="users-table">
        <div className="users-table__wrapper">
          <div className="users-table__header">
            <div
              className="users-table__header-cell"
              onClick={() => handleFilterClick('organization')}
            >
              <span>Organization</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {filterOpen === 'organization' && (
                <div
                  className="filter-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="filter-dropdown__group">
                    <label className="filter-dropdown__label">
                      Organization
                    </label>
                    <select
                      className="filter-dropdown__select"
                      value={filters.organization}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          organization: e.target.value,
                        })
                      }
                      title="Organization filter"
                    >
                      <option value="">Select</option>
                      <option value="Lendsqr">Lendsqr</option>
                      <option value="Irorun">Irorun</option>
                      <option value="Lendstar">Lendstar</option>
                    </select>
                  </div>
                  <div className="filter-dropdown__actions">
                    <button
                      className="filter-dropdown__reset"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      className="filter-dropdown__filter"
                      onClick={() => setFilterOpen(null)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="users-table__header-cell"
              onClick={() => handleFilterClick('username')}
            >
              <span>Username</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {filterOpen === 'username' && (
                <div
                  className="filter-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="filter-dropdown__group">
                    <label className="filter-dropdown__label">Username</label>
                    <input
                      className="filter-dropdown__input"
                      type="text"
                      placeholder="User"
                      value={filters.username}
                      onChange={(e) =>
                        setFilters({ ...filters, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="filter-dropdown__actions">
                    <button
                      className="filter-dropdown__reset"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      className="filter-dropdown__filter"
                      onClick={() => setFilterOpen(null)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="users-table__header-cell"
              onClick={() => handleFilterClick('email')}
            >
              <span>Email</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {filterOpen === 'email' && (
                <div
                  className="filter-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="filter-dropdown__group">
                    <label className="filter-dropdown__label">Email</label>
                    <input
                      className="filter-dropdown__input"
                      type="email"
                      placeholder="Email"
                      value={filters.email}
                      onChange={(e) =>
                        setFilters({ ...filters, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="filter-dropdown__actions">
                    <button
                      className="filter-dropdown__reset"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      className="filter-dropdown__filter"
                      onClick={() => setFilterOpen(null)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="users-table__header-cell"
              onClick={() => handleFilterClick('phone')}
            >
              <span>Phone Number</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {filterOpen === 'phone' && (
                <div
                  className="filter-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="filter-dropdown__group">
                    <label className="filter-dropdown__label">
                      Phone Number
                    </label>
                    <input
                      className="filter-dropdown__input"
                      type="text"
                      placeholder="Phone Number"
                      value={filters.phoneNumber}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="filter-dropdown__actions">
                    <button
                      className="filter-dropdown__reset"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      className="filter-dropdown__filter"
                      onClick={() => setFilterOpen(null)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="users-table__header-cell"
              onClick={() => handleFilterClick('date')}
            >
              <span>Date Joined</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {filterOpen === 'date' && (
                <div
                  className="filter-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="filter-dropdown__group">
                    <label className="filter-dropdown__label">Date</label>
                    <input
                      className="filter-dropdown__input"
                      type="date"
                      value={filters.date}
                      onChange={(e) =>
                        setFilters({ ...filters, date: e.target.value })
                      }
                      title="date filter"
                    />
                  </div>
                  <div className="filter-dropdown__actions">
                    <button
                      className="filter-dropdown__reset"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      className="filter-dropdown__filter"
                      onClick={() => setFilterOpen(null)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="users-table__header-cell"
              onClick={() => handleFilterClick('status')}
            >
              <span>Status</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {filterOpen === 'status' && (
                <div
                  className="filter-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="filter-dropdown__group">
                    <label className="filter-dropdown__label">Status</label>
                    <select
                      className="filter-dropdown__select"
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      title="Status filter"
                    >
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                      <option value="Blacklisted">Blacklisted</option>
                    </select>
                  </div>
                  <div className="filter-dropdown__actions">
                    <button
                      className="filter-dropdown__reset"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      className="filter-dropdown__filter"
                      onClick={() => setFilterOpen(null)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="users-table__header-cell" />
          </div>

          <div className="users-table__body">
            {paginatedUsers.map((user) => (
              <div key={user.id} className="users-table__row">
                <div className="users-table__cell">{user.organization}</div>
                <div className="users-table__cell">{user.username}</div>
                <div className="users-table__cell">{user.email}</div>
                <div className="users-table__cell">{user.phoneNumber}</div>
                <div className="users-table__cell">
                  {formatDate(user.dateJoined)}
                </div>
                <div className="users-table__cell">
                  <span
                    className={`users-table__status users-table__status--${user.status.toLowerCase()}`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="users-table__cell users-table__cell--actions">
                  <div className="users-table__actions">
                    <button
                      className="users-table__menu-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMenuOpen(
                          actionMenuOpen === user.id ? null : user.id
                        );
                      }}
                      aria-label="User actions menu"
                    >
                      <svg
                        width="4"
                        height="18"
                        viewBox="0 0 4 18"
                        fill="none"
                      >
                        <circle cx="2" cy="2" r="2" fill="currentColor" />
                        <circle cx="2" cy="9" r="2" fill="currentColor" />
                        <circle cx="2" cy="16" r="2" fill="currentColor" />
                      </svg>
                    </button>
                    {actionMenuOpen === user.id && (
                      <div className="users-table__menu">
                        <Link
                          to={`/dashboard/users/${user.id}`}
                          onClick={() => setActionMenuOpen(null)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 3C4.5 3 1.5 8 1.5 8C1.5 8 4.5 13 8 13C11.5 13 14.5 8 14.5 8C14.5 8 11.5 3 8 3Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <circle
                              cx="8"
                              cy="8"
                              r="2"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                          View Details
                        </Link>
                        <button onClick={() => setActionMenuOpen(null)}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 1V15M1 8H15"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                          Blacklist User
                        </button>
                        <button onClick={() => setActionMenuOpen(null)}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3 8L7 12L13 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                          Activate User
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="users-table__pagination">
            <div className="users-table__page-info">
              <span>Showing</span>
              <select
                aria-label="Items per page"
                title="Items per page"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>out of {filteredUsers.length}</span>
            </div>

            <div className="users-table__page-buttons">
              <button
                onClick={() =>
                  setCurrentPage(Math.max(1, currentPage - 1))
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    d="M6 1L1 6L6 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? 'active' : ''}
                    aria-label={`Page ${pageNum}`}
                    aria-current={
                      currentPage === pageNum ? 'page' : undefined
                    }
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && <span>...</span>}
              {totalPages > 5 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={currentPage === totalPages ? 'active' : ''}
                  aria-label={`Page ${totalPages}`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    d="M1 1L6 6L1 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
