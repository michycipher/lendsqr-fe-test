import type { User } from '../types/index';

// Change this line with YOUR GitHub username:
// const GITHUB_USERNAME = 'your-github-username-here';
// const GITHUB_REPO = 'lendsqr-fe-test';

// const API_BASE_URL = `https://my-json-server.typicode.com/${GITHUB_USERNAME}/${GITHUB_REPO}`;

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-name-lendsqr-api.onrender.com'  // UPDATE THIS AFTER DEPLOYING
  : 'http://localhost:3001';

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const STORAGE_KEYS = {
  USERS: 'lendsqr_users',
  USERS_TIMESTAMP: 'lendsqr_users_timestamp'
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const cachedData = localStorage.getItem(STORAGE_KEYS.USERS);
    const cachedTimestamp = localStorage.getItem(STORAGE_KEYS.USERS_TIMESTAMP);

    if (cachedData && cachedTimestamp) {
      const cacheAge = Date.now() - parseInt(cachedTimestamp);
      if (cacheAge < CACHE_DURATION) {
        // console.log('Using cached data from localStorage');
        return JSON.parse(cachedData);
      }
    }

    // console.log('Fetching users from JSON Server API...');
    // console.log(`API URL: ${API_BASE_URL}/users`);

    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('Invalid API response format');
    }

    // console.log(`Fetched ${users.length} users from JSON Server`);

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.USERS_TIMESTAMP, Date.now().toString());

    return users;

  } catch (error) {
    console.error('Error fetching users:', error);
    
    const cachedData = localStorage.getItem(STORAGE_KEYS.USERS);
    if (cachedData) {
      console.log('Using expired cache as fallback');
      return JSON.parse(cachedData);
    }

    throw new Error('Failed to fetch users and no cache available');
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const cachedUser = localStorage.getItem(`user_${id}`);
    if (cachedUser) {
      // console.log(`Retrieved user ${id} from cache`);
      return JSON.parse(cachedUser);
    }

    // console.log(`Fetching user ${id} from JSON Server...`);
    const response = await fetch(`${API_BASE_URL}/users/${id}`);

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem(`user_${id}`, JSON.stringify(user));
      // console.log(`Fetched and cached user ${id}`);
      return user;
    }

    if (response.status === 404) {
      console.log(`User ${id} not found`);
      return null;
    }

    throw new Error(`API responded with status: ${response.status}`);

  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};

export const getDashboardStats = async () => {
  try {
    const users = await getUsers();

    return {
      totalUsers: users.length,
      activeUsers: users.filter((u: User) => u.status === 'Active').length,
      usersWithLoans: Math.floor(users.length * 0.25),
      usersWithSavings: Math.floor(users.length * 0.4)
    };

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      usersWithLoans: 0,
      usersWithSavings: 0
    };
  }
};

export const clearCache = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.USERS_TIMESTAMP);
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('user_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('All caches cleared!');
};

export const refreshUsers = async (): Promise<User[]> => {
  clearCache();
  return await getUsers();
};