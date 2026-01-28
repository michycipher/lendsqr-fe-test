import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

server.use(middlewares);

server.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Lendsqr Mock API is running',
    timestamp: new Date().toISOString(),
    totalUsers: router.db.get('users').size().value()
  });
});

server.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Lendsqr Mock API',
    endpoints: {
      users: '/users',
      health: '/health'
    }
  });
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('JSON Server is running!');
  console.log(`Total users: ${router.db.get('users').size().value()}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});


// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// // Enable CORS
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// server.use(middlewares);

// server.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Lendsqr Mock API is running',
//     timestamp: new Date().toISOString(),
//     totalUsers: router.db.get('users').size().value()
//   });
// });

// server.get('/', (req, res) => {
//   res.json({
//     message: 'Welcome to Lendsqr Mock API',
//     endpoints: {
//       users: '/users',
//       health: '/health'
//     }
//   });
// });

// server.use(router);

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log('🚀 JSON Server is running!');
//   console.log(`📊 Total users: ${router.db.get('users').size().value()}`);
//   console.log(`🌐 Local: http://localhost:${PORT}`);
//   console.log(`✅ Health: http://localhost:${PORT}/health`);
// });