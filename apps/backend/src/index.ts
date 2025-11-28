import { createServer } from 'http';
import { UserSchema } from '@intellifinance/types';

const PORT = process.env.PORT || 3000;

async function checkConnections() {
  console.log('Checking database connection...');
  // TODO: Implement real DB check
  console.log('Checking redis connection...');
  // TODO: Implement real Redis check
  
  // Usage of shared type
  console.log('UserSchema loaded:', UserSchema);

  return true;
}

async function start() {
  try {
    await checkConnections();
    const server = createServer((req, res) => {
      res.writeHead(200);
      res.end('Backend Ready');
    });
    server.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start:', error);
    process.exit(1);
  }
}

start();