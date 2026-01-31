import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { login, logout, isAuthenticated, getCurrentUser } from '../services/auth';
import type { LoginCredentials } from '../services/auth';
import { DEFAULT_CREDENTIALS, STORAGE_KEYS } from '../utils/constants';

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // POSITIVE SCENARIOS
  describe('Positive Scenarios', () => {
    it('should successfully login with valid credentials', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      const user = await login(credentials);

      expect(user).toBeDefined();
      expect(user!.email).toBe(DEFAULT_CREDENTIALS.email);
      expect(user!.name).toBe('Adedeji');
      expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).not.toBeNull();
      expect(localStorage.getItem(STORAGE_KEYS.AUTH_USER)).not.toBeNull();
    });

    it('should store auth token in localStorage after login', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      await login(credentials);

      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      expect(token).not.toBeNull();
      expect(token).toBeTruthy();
    });

    it('should store user data in localStorage after login', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      await login(credentials);

      const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      expect(userStr).not.toBeNull();
      
      const user = JSON.parse(userStr!);
      expect(user.email).toBe(DEFAULT_CREDENTIALS.email);
      expect(user.name).toBe('Adedeji');
    });

    it('should return true when user is authenticated', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      await login(credentials);

      expect(isAuthenticated()).toBe(true);
    });

    it('should get current user data after login', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      await login(credentials);

      const user = getCurrentUser();
      expect(user).not.toBeNull();
      expect(user!.email).toBe(DEFAULT_CREDENTIALS.email);
      expect(user!.name).toBe('Adedeji');
    });

    it('should successfully logout and clear all auth data', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      await login(credentials);
      expect(isAuthenticated()).toBe(true);

      logout();

      expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBeNull();
      expect(localStorage.getItem(STORAGE_KEYS.AUTH_USER)).toBeNull();
      expect(isAuthenticated()).toBe(false);
    });

    it('should create unique tokens for different login sessions', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: DEFAULT_CREDENTIALS.password,
      };

      await login(credentials);
      const token1 = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)!;

      logout();
      
      // Wait a bit to ensure different timestamp
      await vi.waitFor(() => {}, { timeout: 10 });
      
      await login(credentials);
      const token2 = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)!;

      expect(token1).not.toBe(token2);
    });
  });

  // NEGATIVE SCENARIOS
  describe('Negative Scenarios', () => {
    it('should throw error with invalid email', async () => {
      const credentials: LoginCredentials = {
        email: 'wrong@email.com',
        password: DEFAULT_CREDENTIALS.password,
      };

      await expect(login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with invalid password', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: 'wrongpassword',
      };

      await expect(login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with both invalid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'wrong@email.com',
        password: 'wrongpassword',
      };

      await expect(login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with empty email', async () => {
      const credentials: LoginCredentials = {
        email: '',
        password: DEFAULT_CREDENTIALS.password,
      };

      await expect(login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with empty password', async () => {
      const credentials: LoginCredentials = {
        email: DEFAULT_CREDENTIALS.email,
        password: '',
      };

      await expect(login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should return false when user is not authenticated', () => {
      expect(isAuthenticated()).toBe(false);
    });

    it('should return null when getting current user with no login', () => {
      const user = getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return null when user data is corrupted in localStorage', () => {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, 'invalid-json-data');

      const user = getCurrentUser();
      expect(user).toBeNull();
    });

    it('should not store any data when login fails', async () => {
      const credentials: LoginCredentials = {
        email: 'wrong@email.com',
        password: 'wrongpassword',
      };

      await expect(login(credentials)).rejects.toThrow('Invalid email or password');

      expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBeNull();
      expect(localStorage.getItem(STORAGE_KEYS.AUTH_USER)).toBeNull();
    });

    it('should handle logout when user is not logged in', () => {
      expect(() => logout()).not.toThrow();
      expect(isAuthenticated()).toBe(false);
    });
  });
});
