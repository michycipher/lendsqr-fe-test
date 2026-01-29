/**
 * LocalStorage utility for managing app data
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'lendsqr_auth_token',
  AUTH_USER: 'lendsqr_auth_user',
  USERS: 'lendsqr_users',
  USERS_TIMESTAMP: 'lendsqr_users_timestamp',
} as const;

export class LocalStore {
  /**
   * Get authentication token
   */
  static getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Set authentication token
   */
  static setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  /**
   * Get authentication status
   */
  static getAuthStatus(): boolean {
    return !!this.getToken();
  }

  /**
   * Get authenticated user data
   */
  static getUser(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  }

  /**
   * Set authenticated user data
   */
  static setUser(user: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, user);
  }

  /**
   * Clear all authentication data
   */
  static clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  }

  /**
   * Clear all app data
   */
  static clearAll(): void {
    localStorage.clear();
  }

  /**
   * Get cached users
   */
  static getUsers(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USERS);
  }

  /**
   * Set cached users
   */
  static setUsers(users: string): void {
    localStorage.setItem(STORAGE_KEYS.USERS, users);
    localStorage.setItem(STORAGE_KEYS.USERS_TIMESTAMP, Date.now().toString());
  }

  /**
   * Get users cache timestamp
   */
  static getUsersTimestamp(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USERS_TIMESTAMP);
  }

  /**
   * Check if users cache is valid (less than 24 hours)
   */
  static isUsersCacheValid(): boolean {
    const timestamp = this.getUsersTimestamp();
    if (!timestamp) return false;

    const cacheAge = Date.now() - parseInt(timestamp);
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    return cacheAge < CACHE_DURATION;
  }

  /**
   * Clear users cache
   */
  static clearUsersCache(): void {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.USERS_TIMESTAMP);
  }
}