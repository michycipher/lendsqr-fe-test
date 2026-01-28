import { DEFAULT_CREDENTIALS, STORAGE_KEYS } from '../utils/constants';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (
    credentials.email === DEFAULT_CREDENTIALS.email &&
    credentials.password === DEFAULT_CREDENTIALS.password
  ) {
    const user: AuthUser = {
      email: credentials.email,
      name: 'Adedeji'
    };

    const token = btoa(`${credentials.email}:${Date.now()}`);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));

    console.log('Login successful');
    return user;
  }

  throw new Error('Invalid email or password');
};


export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  console.log('Logout successful');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getCurrentUser = (): AuthUser | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};