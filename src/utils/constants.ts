export const NIGERIAN_FIRST_NAMES = [
  'Adebayo', 'Chioma', 'Oluwaseun', 'Fatima', 'Ibrahim', 
  'Ngozi', 'Emeka', 'Aminat', 'Chukwudi', 'Blessing',
  'Adeola', 'Chiamaka', 'Tunde', 'Zainab', 'Ifeanyi',
  'Grace', 'Segun', 'Hauwa', 'Chinedu', 'Funmilayo',
  'Babatunde', 'Amaka', 'Kunle', 'Aisha', 'Obinna',
  'Nneka', 'Femi', 'Khadija', 'Ikechukwu', 'Josephine',
  'Adeyemi', 'Chidinma', 'Yusuf', 'Shade', 'Chidi',
  'Victoria', 'Olu', 'Maryam', 'Uche', 'Deborah',
  'Tosin', 'Folake', 'Ahmed', 'Joy', 'Kemi',
  'Bukola', 'Lanre', 'Hassana', 'Nnamdi', 'Patience'
];

export const NIGERIAN_LAST_NAMES = [
  'Adeyemi', 'Okafor', 'Ibrahim', 'Musa', 'Olowo',
  'Nwosu', 'Bello', 'Okonkwo', 'Mohammed', 'Adebayo',
  'Eze', 'Yusuf', 'Obi', 'Hassan', 'Okoro',
  'Aliyu', 'Chukwu', 'Suleiman', 'Ojo', 'Abubakar',
  'Nwankwo', 'Abdullahi', 'Chukwuma', 'Usman', 'Ike',
  'Garba', 'Okoye', 'Bashir', 'Onyeka', 'Lawal',
  'Chibueze', 'Ismail', 'Nwachukwu', 'Bala', 'Nnamdi',
  'Sani', 'Onyebuchi', 'Mustapha', 'Emeka', 'Audu',
  'Ifeanyi', 'Umar', 'Ogbonna', 'Aliyu', 'Ezeh',
  'Dauda', 'Nwankwo', 'Sadiq', 'Udoka', 'Tanko'
];

export const ORGANIZATIONS = ['Lendsqr', 'Irorun', 'Lendstar'];

export const USER_STATUSES = ['Active', 'Inactive', 'Pending', 'Blacklisted'] as const;

export const EDUCATION_LEVELS = ['SSCE', 'OND', 'HND', 'B.Sc', 'M.Sc', 'Ph.D'];

export const EMPLOYMENT_STATUSES = ['Employed', 'Self-employed', 'Unemployed'];

export const EMPLOYMENT_SECTORS = [
  'FinTech', 'Education', 'Healthcare', 'Technology',
  'Agriculture', 'Manufacturing', 'Retail', 'Entertainment',
  'Real Estate', 'Transportation'
];

export const NIGERIAN_BANKS = [
  'Access Bank', 'GTBank', 'First Bank', 'UBA',
  'Zenith Bank', 'Providus Bank', 'Wema Bank', 'Fidelity Bank',
  'Union Bank', 'Sterling Bank', 'Stanbic IBTC', 'Polaris Bank'
];

export const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];

export const RESIDENCE_TYPES = [
  "Parent's Apartment",
  "Own Apartment",
  "Rented Apartment",
  "Company Accommodation"
];

export const GENDERS = ['Male', 'Female'];

export const RELATIONSHIPS = [
  'Father', 'Mother', 'Brother', 'Sister',
  'Uncle', 'Aunt', 'Cousin', 'Friend', 'Colleague'
];

export const DEFAULT_CREDENTIALS = {
  email: 'test@lendsqr.com',
  password: 'password'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'lendsqr_auth_token',
  AUTH_USER: 'lendsqr_auth_user',
  USERS: 'lendsqr_users',
  USERS_TIMESTAMP: 'lendsqr_users_timestamp'
};

export const CACHE_DURATION = 24 * 60 * 60 * 1000;