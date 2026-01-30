export const routePaths = {
  
  auth: {
    login: '/',
  },

  
  dashboard: {
    home: '/dashboard',
    users: '/dashboard/users',
    userDetail: (id: string) => `/dashboard/users/${id}`,
    guarantors: '#',
    loans: '#',
    decisionModels: '#',
    savings: '#',
    loanRequests: '#',
    whitelist: '#',
    karma: '#',
    preferences: '#',
  },
} as const;