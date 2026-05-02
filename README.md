# Getting Started Team Task Manager
A full-stack Role-Based Access Control (RBAC) task management application.

# Live Demo
https://team-task-manager-production-2285.up.railway.app/

# Tech Stack
* Frontend- Next.js (App Router), React, Tailwind CSS
* Backend- Next.js API Routes (Serverless)
* Database- MongoDB (Mongoose)
* Authentication- NextAuth.js (Credentials Provider with RBAC)
* Deployment- Railway

# Key Features
* Authentication- Secure Signup & Login with encrypted passwords (bcrypt).
* Role-Based Access Control- * `Admin`: Can create projects, assign tasks, and change statuses.
  * `Member`: Can view assigned projects and update task statuses.
* Visual Dashboard- Tasks organized by Pending, In Progress, and Completed.
* Responsive UI- Built with Tailwind CSS.


# Running Locally
1. Clone the repository.
2. Run `npm install`
3. Create a `.env.local` file with `MONGODB_URI`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL=http://localhost:3000`.
4. Run `npm run dev`.

# Login credentials for checking Admin account
It's possible only with `@test.com`
user - admin@test.com
password - Admin

# Login credentials for checking member account
user - varunji@gmail.com
password - 12345678

# Either check by these credentials or you can signup by creating your account