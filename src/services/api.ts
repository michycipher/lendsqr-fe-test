import type { User } from '../types/index';
import { LocalStore } from '../utils/storage';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://michelle-utomi-lendsqr-fe-test.onrender.com' 
  : 'http://localhost:3001';

// const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const getUsers = async (): Promise<User[]> => {
  try {
    // Check cache first
    if (LocalStore.isUsersCacheValid()) {
      const cachedData = LocalStore.getUsers();
      if (cachedData) {
        console.log('Using cached data from localStorage');
        return JSON.parse(cachedData);
      }
    }

    console.log('📡 Fetching users from JSON Server API...');
    console.log(`🔗 API URL: ${API_BASE_URL}/users`);

    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('Invalid API response format');
    }

    console.log(`Fetched ${users.length} users from JSON Server`);

    // Cache the response
    LocalStore.setUsers(JSON.stringify(users));

    return users;

  } catch (error) {
    console.error('Error fetching users:', error);
    
    // Fallback to expired cache
    const cachedData = LocalStore.getUsers();
    if (cachedData) {
      console.log('Using expired cache as fallback');
      return JSON.parse(cachedData);
    }

    throw new Error('Failed to fetch users and no cache available');
  }
};

/**
 * Fetch single user by ID
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const cachedUser = localStorage.getItem(`user_${id}`);
    if (cachedUser) {
      console.log(`Retrieved user ${id} from cache`);
      return JSON.parse(cachedUser);
    }

    console.log(`📡 Fetching user ${id} from JSON Server...`);
    const response = await fetch(`${API_BASE_URL}/users/${id}`);

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem(`user_${id}`, JSON.stringify(user));
      console.log(`Fetched and cached user ${id}`);
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

/**
 * Get dashboard statistics
 */
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
    console.error(' Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      usersWithLoans: 0,
      usersWithSavings: 0
    };
  }
};

/**
 * Clear all caches
 */
export const clearCache = () => {
  LocalStore.clearUsersCache();
  
  // Clear individual user caches
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('user_')) {
      localStorage.removeItem(key);
    }
  });

  console.log('🗑️ All caches cleared');
};

/**
 * Force refresh data from API
 */
export const refreshUsers = async (): Promise<User[]> => {
  clearCache();
  return await getUsers();
};

// import type { User } from '../types/index';

// const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

// const CACHE_DURATION = 24 * 60 * 60 * 1000;
// const STORAGE_KEYS = {
//   USERS: 'lendsqr_users',
//   USERS_TIMESTAMP: 'lendsqr_users_timestamp',
// };

// export const getUsers = async (): Promise<User[]> => {
//   try {
//     const cachedData = localStorage.getItem(STORAGE_KEYS.USERS);
//     const cachedTimestamp = localStorage.getItem(STORAGE_KEYS.USERS_TIMESTAMP);

//     if (cachedData && cachedTimestamp) {
//       const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);
//       if (cacheAge < CACHE_DURATION) {
//         return JSON.parse(cachedData);
//       }
//     }

//       // console.log('Fetching users from JSON Server API...');
//       // console.log(`API URL: ${API_BASE_URL}/users`);
//     const response = await fetch(`${API_BASE_URL}/users`);

//     if (!response.ok) {
//       throw new Error(`API responded with status: ${response.status}`);
//     }

//     const users: User[] = await response.json();

//     if (!Array.isArray(users) || users.length === 0) {
//       throw new Error('Invalid API response format');
//     }

//     localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
//     localStorage.setItem(
//       STORAGE_KEYS.USERS_TIMESTAMP,
//       Date.now().toString()
//     );

//     return users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     const cachedData = localStorage.getItem(STORAGE_KEYS.USERS);
//     if (cachedData) {
//       console.log('Using expired cache as fallback');
//       return JSON.parse(cachedData);
//     }
//     throw new Error('Failed to fetch users and no cache available');
//   }
// };

// export const getUserById = async (id: string): Promise<User | null> => {
//   try {
//     const cachedUser = localStorage.getItem(`user_${id}`);
//     if (cachedUser) {
//       return JSON.parse(cachedUser);
//     }

//     const response = await fetch(`${API_BASE_URL}/users/${id}`);

//     if (response.ok) {
//       const user: User = await response.json();
//       localStorage.setItem(`user_${id}`, JSON.stringify(user));
//       // console.log(`Fetched and cached user ${id}`);
//       return user;
//     }

//     if (response.status === 404) {
//       console.log(`User ${id} not found`);
//       return null;
//     }

//     throw new Error(`API responded with status: ${response.status}`);
//   } catch (error) {
//     console.error(`Error fetching user ${id}:`, error);
//     return null;
//   }
// };

// export const getDashboardStats = async () => {
//   try {
//     const users = await getUsers();

//     return {
//       totalUsers: users.length,
//       activeUsers: users.filter((u: User) => u.status === 'Active').length,
//       usersWithLoans: Math.floor(users.length * 0.25),
//       usersWithSavings: Math.floor(users.length * 0.4),
//     };

//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     return {
//       totalUsers: 0,
//       activeUsers: 0,
//       usersWithLoans: 0,
//       usersWithSavings: 0,
//     };
//   }
// };

// export const clearCache = () => {
//   localStorage.removeItem(STORAGE_KEYS.USERS);
//   localStorage.removeItem(STORAGE_KEYS.USERS_TIMESTAMP);
//   Object.keys(localStorage).forEach((key) => {
//     if (key.startsWith('user_')) {
//       localStorage.removeItem(key);
//     }
//   });
//   console.log('All caches cleared!');
// };

// export const refreshUsers = async (): Promise<User[]> => {
//   clearCache();
//   return await getUsers();
// };
