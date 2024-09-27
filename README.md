# SHACL-validation-task

This project consists of a **backend** built with Python and a **frontend** built with React. Below are the steps to set up the environment, install dependencies, and run both the backend and frontend.

## Prerequisites

Before starting, ensure you have the following installed:

- **Python 3.x**: [Download Python](https://www.python.org/downloads/)
- **pip**: Python package manager (comes with Python installation)
- **Node.js**: Includes npm, the Node package manager [Download Node.js](https://nodejs.org/)

## Backend Setup

### 1. Navigate to the backend directory:

```bash
cd backend

### 2. Install the backend dependencies

```bash
pip install -r requirements.txt

### 3. Run the backend server

```bash
python3 app.py


The backend will run on http://localhost:3000 by default. 



## Frontend Setup

### 1. Navigate to the frontend directory:

```bash
cd frontend


### 2. Install the frontend dependencies

```bash
npm install


### 3. Run the backend server

To start the React development server, run 

```bash
npm start

The frontend will open in your Browser at http://localhost:3000. 

## Running the Full Application

To run the full application, follow these steps:

1. Start the Backend Server:
- Follow the backend setup instructions to run the backend on http://localhost:5000.
2. Start the Frontend Development Server:
- Follow the frontend setup instructions to run the frontend on http://localhost:3000.

Once both servers are running, the frontend can communicate with the backend, and the full application will be functional.

## Notes

Make sure that your backend and frontend ports are properly configured and that CORS is handled if necessary, especially for API calls from the frontend to the backend.
Ensure that both servers are running simultaneously for the app to function correctly.
