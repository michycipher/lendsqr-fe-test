import { useState, useEffect, useCallback } from 'react';
import { getUsers, getDashboardStats } from '../services/api';
import type { User, DashboardStats } from '../types';

interface Filters {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: string;
  date: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterOpen, setFilterOpen] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    organization: '',
    username: '',
    email: '',
    phoneNumber: '',
    status: '',
    date: '',
  });

  const loadData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const applyFilters = useCallback(() => {
    let filtered = [...users];

    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization.toLowerCase().includes(filters.organization.toLowerCase())
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
        (user) => user.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.date) {
      filtered = filtered.filter((user) => user.dateJoined.startsWith(filters.date));
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const resetFilters = useCallback(() => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      phoneNumber: '',
      status: '',
      date: '',
    });
    setFilterOpen(null);
  }, []);

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFilterClick = useCallback((column: string) => {
    setFilterOpen((prev) => (prev === column ? null : column));
  }, []);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  return {
    users: paginatedUsers,
    allUsers: users,
    filteredUsers,
    stats,
    loading,
    

    currentPage,
    totalPages,
    perPage,
    setCurrentPage,
    setPerPage: (items: number) => {
      setPerPage(items);
      setCurrentPage(1);
    },
    
    filters,
    filterOpen,
    setFilterOpen,
    handleFilterClick,
    updateFilter,
    resetFilters,
    
    actionMenuOpen,
    setActionMenuOpen,
  };
};