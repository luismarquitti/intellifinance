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

  // CODE-ONLY: Example of how QueueService would be used.
  // This would typically be integrated into a GraphQL resolver
  // or another service.
  /*
  import { queueService } from './services/queue.service';

  async function exampleJobProducer() {
    console.log('Adding a test job to the queue...');
    await queueService.addTestJob({ message: 'Hello from the backend!' });
    console.log('Test job added.');
  }

  exampleJobProducer().catch(console.error);
  */

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