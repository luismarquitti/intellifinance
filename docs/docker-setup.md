# Docker Environment Setup

This project supports two Docker environments:

1. **Local Development**: For active development with hot-reloading.
2. **Local Production**: For running a stable version of the application on a local server (e.g., a home server).

## Prerequisites

- Docker and Docker Compose installed.
- Node.js (for local tooling, optional if running fully in Docker).

## 1. Local Development

This environment mounts your source code into the containers, so changes are reflected immediately (hot-reloading).

### Standard Setup

1. Copy `.env.example` to `.env` (if not already done).
2. Run the application:

    ```bash
    docker compose up
    ```

3. Access the application:
    - **Frontend**: <http://localhost:5173>
    - **Backend**: <http://localhost:3000>
    - **Database**: localhost:5432
    - **Redis**: localhost:6379

### Stopping

Press `Ctrl+C` or run:

```bash
docker compose down
```

## 2. Local Production

This environment builds optimized images and serves the frontend via Nginx. It is suitable for a server running 24/7 on your local network.

### Setup

1. Create a production environment file:

    ```bash
    cp .env.prod.example .env.prod
    ```

2. **Important**: Edit `.env.prod` and set secure passwords for `POSTGRES_PASSWORD` and other secrets.

### Running

Run the following command to build and start the production containers in the background:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### Accessing

- **Frontend**: <http://localhost> (or the server's IP address)
- **Backend**: <http://localhost:3000> (accessible via API calls from frontend)

### Updating

To update the application after code changes:

1. Pull key changes from git.
2. Rebuild and restart:

    ```bash
    docker compose -f docker-compose.prod.yml up -d --build
    ```

### Stopping

```bash
docker compose -f docker-compose.prod.yml down
```

## Troubleshooting

- **Ports in use**: Ensure ports 80, 3000, 5432, and 6379 are not used by other services.
- **Permission errors**: If you encounter permission errors with volumes, you may need to adjust ownership of the `postgres_data` or `postgres_data_prod` directories.
