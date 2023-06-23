<h1 align="center"> JobtrekSuivis </h1>

JobtrekSuivis is an apprenticeship skills tracking application. It is developed using a combination of technologies, including C# for the backend, React with Material-UI for the frontend, and PostgreSQL as the database.

## Project Objective

The main objective of JobtrekSuivis is to allow companies and trainers to track and evaluate the skills of apprentices throughout their apprenticeship program. The application provides an efficient way to collect, store, and analyze data on the skills acquired by apprentices, facilitating the tracking of their progress and evaluation of their performance.

## Key Features

- Job management: Add, update, and delete jobs, as well as view the complete list of available jobs.
- Apprentice management: Create and manage apprentice profiles, recording information such as their name, job, and skills.
- Skills tracking: Record the skills acquired by apprentices and perform assessments to track their progress.
- Skills dashboard: Display a visual dashboard that summarizes the apprentices' skills and provides information on their performance.
- User-friendly interface: The user interface is designed to be user-friendly and intuitive for easy navigation and use of the application.

## Prerequisites

Before getting started with JobtrekSuivis, make sure you have the following:

- .NET Core SDK
- Node.js
- PostgreSQL

## Installation and Configuration

1. Clone this code repository to your local machine.

2. Backend:

    - Open the backend project in your code editor.
    - Configure the connection to the PostgreSQL database in the .env file.
    - Run migrations to create the database tables using the command dotnet ef database update.
    - Run the backend using the command dotnet run.
3. Frontend:

    - Open the frontend project in your code editor.
    - Install dependencies using the command npm install.
    - Configure the backend API URL in the .env file.
    - Launch the frontend application using the command npm start.
4. Access the application by opening your browser and visiting <http://localhost:3000>.
