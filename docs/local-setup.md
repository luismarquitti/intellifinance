# Local Development Environment Setup (Windows/WSL2)

This guide details how to set up the IntelliFinance project locally using Docker Compose on Windows with WSL2.

## Prerequisites

1. **Windows 10/11** with WSL2 enabled.
2. **Docker Desktop** for Windows installed, with the "Use the WSL 2 based engine" option checked in Settings > General.
3. **Ubuntu (or other distro)** installed via WSL.
4. **Git** installed within your WSL distribution.

## Setup Steps

1. **Clone the Repository**
    Open your WSL terminal and clone the repository:

    ```bash
    git clone <repository_url> intellifinance
    cd intellifinance
    ```

2. **Start the Environment**
    Run the following command to build and start all services:

    ```bash
    docker-compose up --build
    ```

    *Note: The first run may take several minutes as it downloads images and builds the application dependencies.*

3. **Verify Services**
    Once the logs verify that services are running (look for "Backend running on port 3000" and "ready for connections"), you can access:

    - **Frontend:** [http://localhost:5173](http://localhost:5173)
    - **Backend API:** [http://localhost:3000](http://localhost:3000)
    - **GraphQL Playground:** [http://localhost:3000/graphql](http://localhost:3000/graphql)

4. **Stopping the Environment**
    Press `Ctrl+C` in the terminal or run:

    ```bash
    docker-compose down
    ```

## Troubleshooting

- **Port Conflicts:** Ensure ports `3000`, `5173`, `5432` (Postgres), and `6379` (Redis) are not in use by other applications on your host machine.
- **Permission Issues:** Ensure you are running the commands inside the WSL terminal, not Windows PowerShell (unless configured otherwise).
- **Volume Mounting:** Docker Desktop handles volume mounting from WSL automatically. If you see empty folders where files should be, verifying your Docker Desktop > Resources > WSL Integration settings.

## Development Notes

- The default setup runs the application ensuring all services are connected.
- Database data is persisted in a named docker volume `postgres_data`.
