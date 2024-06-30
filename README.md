# Project Gallery Youtube
<img loading="lazy" src="https://avatars.githubusercontent.com/u/128262168?s=200&v=4" width="200px"/>

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/Abo1zu?referralCode=alphasec)

Welcome to project-gallery-youtube repository 🎥

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)

## Introduction

This application was created by me, Allan Hipólito. It allows users to explore and watch YouTube videos in an intuitive and dynamic way. Utilizing Node.js, Prisma, and deployed on Railway, the gallery features a sleek and responsive interface, seamlessly integrating high-quality and diverse content from YouTube.

## Technologies Used

### Frontend

- **Vite**: A build tool that boasts a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **PrismaORM**: Prisma ORM is an open-source next-generation ORM.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **TypeScript**: Brings static typing to JavaScript, ensuring a more predictable runtime behavior.
- **Jest**: Used for writing unit and integration tests for the backend.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Installation

Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/7ipolito/project-gallery-youtube.git
   ```

2. **Navigate to the repository**:

   ```bash
   cd project-gallery-youtube
   ```

3. **Install the dependencies**:

   - For Frontend:
   
     ```bash
     cd frontend && npm install
     ```

   - For Backend:

     ```bash
     cd backend && npm install
     ```

## Running the Application

- **To run the frontend**:

  ```bash
  npm run start-frontend
  ```

  This starts the React application on `http://localhost:5173` (or another available port).

- **To run the backend**:

  ```bash
  npm run start-backend
  ```

  This initializes the Express server, typically on `http://localhost:3000`.

- **To run both simultaneously**:

  ```bash
  npm run start
  ```

  This will invoke `concurrently` to start both the front and back ends.

Ensure that the frontend and backend are configured to run on separate ports to avoid conflicts.

## Conclusion

This application, created by me, Allan Hipólito, allows users to explore and watch YouTube videos dynamically. It features a sleek interface where users can seamlessly navigate related videos from their initial selection. The project is currently 80% complete, with ongoing enhancements to enrich the user experience.

---
