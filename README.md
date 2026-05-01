#Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
#Team Task Manager
A full-stack Role-Based Access Control (RBAC) task management application built within a 5-hour constraint.

#Live Demo

#Tech Stack
* Frontend- Next.js (App Router), React, Tailwind CSS
* Backend- Next.js API Routes (Serverless)
* Database- MongoDB (Mongoose)
* Authentication- NextAuth.js (Credentials Provider with RBAC)
* Deployment- Railway

#Key Features
* Authentication- Secure Signup & Login with encrypted passwords (bcrypt).
* Role-Based Access Control- * `Admin`: Can create projects, assign tasks, and change statuses.
  * `Member`: Can view assigned projects and update task statuses.
* Visual Dashboard- Tasks organized by Pending, In Progress, and Completed.
* Responsive UI- Built with Tailwind CSS.


#Running Locally
1. Clone the repository.
2. Run `npm install`
3. Create a `.env.local` file with `MONGODB_URI`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL=http://localhost:3000`.
4. Run `npm run dev`.