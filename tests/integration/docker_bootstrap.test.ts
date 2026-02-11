
import { execSync } from 'child_process';
import axios from 'axios';

describe('Docker Compose Bootstrap', () => {
    const BACKEND_URL = 'http://localhost:3000';
    const FRONTEND_URL = 'http://localhost:5173';

    beforeAll(() => {
        try {
            // Bring up the services and wait for healthchecks
            execSync('docker-compose up -d --build --wait', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to start docker-compose services', error);
            throw error;
        }
    }, 300000); // 5 minutes timeout for build and start

    afterAll(() => {
        try {
            execSync('docker-compose down', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to stop docker-compose services', error);
        }
    });

    it('should have backend service running and reachable', async () => {
        // Poll backend health check or root
        let attempts = 0;
        const maxAttempts = 10;
        let healthy = false;

        while (attempts < maxAttempts && !healthy) {
            try {
                await axios.get(`${BACKEND_URL}/health`); // Assuming /health exists, or replace with root
                healthy = true;
            } catch (e) {
                attempts++;
                await new Promise(r => setTimeout(r, 2000));
            }
        }
        expect(healthy).toBe(true);
    }, 30000);

    it('should have frontend service running and reachable', async () => {
        let attempts = 0;
        const maxAttempts = 10;
        let healthy = false;

        while (attempts < maxAttempts && !healthy) {
            try {
                await axios.get(FRONTEND_URL);
                healthy = true;
            } catch (e) {
                attempts++;
                await new Promise(r => setTimeout(r, 2000));
            }
        }
        expect(healthy).toBe(true);
    }, 30000);
});
