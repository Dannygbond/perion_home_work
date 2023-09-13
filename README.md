# Project Setup Guide

This guide will help you set up and start a project using Docker Compose. The project consists of multiple services, including Nginx, a frontend application, a backend application, and a database.

## Prerequisites

Before you start, ensure that you have the following prerequisites installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the project repository to your local machine.

2. Navigate to the project directory.

3. Create a `.env` file in the project root directory if it doesn't already exist, and configure any necessary environment variables as required for your project.

4. Open a terminal or command prompt and run the following command to start the project services:

   ```bash
       docker-compose up -d
   ```

   This command will start the services in detached mode, allowing them to run in the background.

5. Wait for the containers to build and start. You can monitor the progress in the terminal.

6. Once the containers are up and running, you can access the services as follows:

- **Nginx**: Open your web browser and navigate to `https://localhost`. Nginx is running on port 443.

7. You have successfully started the project, and the services are now running. You can develop and interact with the project as needed.

## Stopping the Project

To stop the project and remove the containers, run the following command in the project directory:
`bash
    docker-compose down
    `
This will stop and remove all the containers associated with the project.

# Key Decisions

During this home assignment, I encountered a technology that was previously unfamiliar to me—Google Publisher Tag. This lack of experience prompted me to delve into the (Google documentation)[https://developers.google.com/publisher-tag/guides/get-started], ultimately aiding in the resolution of a logging issue related to ad clicks.

Moreover, I prioritized efficiency throughout the project. This led me to carefully design hooks, the project's structure, and opt for "GET" requests over "POST." These decisions were driven by the core objective of creating the most efficient log collector possible.
