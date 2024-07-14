# Project Gallery Youtube
<img src="https://github.com/user-attachments/assets/13d8d8fc-bee8-4713-82f7-a8059f7c7808" width="200px"/>

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

This application was created by me Allan Hipólito. It allows users to explore and watch YouTube videos in an intuitive and dynamic way. the gallery features a sleek and responsive interface, seamlessly integrating high-quality and diverse content from YouTube.

## Technologies Used
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Nest](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
	
### Frontend

- **Vite**: A build tool that boasts a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **react-navigation**: React Navigation is a flexible and extensible navigation library for React Native that enables seamless navigation between different screens and handling deep linking within a mobile app.
- **react-hot-toast**:is a lightweight and customizable React library for displaying toast notifications easily and efficiently.
- **react-redux**: Redux is a predictable state container for JavaScript applications, designed to manage and centralize the application’s state using a single store and unidirectional data flow.


### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **PrismaORM**: Prisma ORM is an open-source next-generation ORM.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **TypeScript**: Brings static typing to JavaScript, ensuring a more predictable runtime behavior.
- **Jest**: Used for writing unit and integration tests for the backend.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Configure the enviroment variables
- Before install the depedencies it is necessary you get a `key` you will access [Google console](https://console.cloud.google.com/) and create a key without restrictions.
- After you will put you key in .env following the model in .env.example
- Also it is necessary to configure the database, i recommend you use [Supabase](https://supabase.com/) it will appear same like this `postgresql://postgres.[YOUR-USER]:[YOUR-PASSWORD][YOUR-URL]:6543/postgres`


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

   - For install both dependecies run:
   
   ```bash
   npm install
   ```

   - To inicialize prisma run:
   
   ```bash
   cd backend && npx run prisma generate
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

I hope that you to enjoy this project, he was designed with best practices using all features of the latest version of react using Suspense component, useMemo, lazy import and redux.🚀

---
