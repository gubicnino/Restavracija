# Restaurant Reservation System

A full-stack web application for a restaurant featuring a modern React frontend and a PHP backend. The core of the app is a smart reservation system that automatically handles table and time slot allocation based on availability and user input. It also includes a dedicated admin panel where administrators can manage reservations, tables, and users, as well as view analytics and insights about reservation activity.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Recharts, Framer Motion |
| Backend | PHP (Apache), REST API with PDO |
| Database | MySQL (Azure MySQL Flexible Server) |
| Email | SMTP via custom EmailService |
| Dev Tools | Docker Compose, phpMyAdmin |
| Image hosting | Cloudinary |

---

## Project Structure

```
/
├── data/
│   ├── php/          # PHP backend & REST API
│   │   └── api/      # Endpoints: auth, reservations, tables, menu, users, stats
│   └── www/          # React frontend (Vite)
│       └── src/
│           ├── pages/       # Home, Login, Dashboard, Menu, Gallery, etc.
│           ├── components/
│           ├── services/    # API calls (axios)
│           └── context/     # Auth context
├── docker-compose.yaml
└── script.sql        # Database schema & seed data
```

---

## Database Schema

- **User** — registered users
- **Reservation** — reservation records (date, time, number of guests, status)
- **TableEntity** — restaurant tables
- **Reservation_Table** — many-to-many link between reservations and tables
- **PDFConfirmation** — PDF confirmation files linked to reservations

---

## Running Locally

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js & npm (for the frontend dev server)

### 1. Clone the repository

```bash
git clone https://github.com/gubicnino/Restavracija.git
cd Restavracija
```

### 2. Create the MySQL database

Start a local MySQL server (or use Docker) and create the database

Then import the schema and seed data

### 3. Create a `.env` file

Create a `.env` file in the project root with the following variables:

```env
DB_PASSWORD=
DB_HOST=
DB_PORT=3306
DB_NAME=
DB_USER=

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=your@email.com
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=your@email.com
SMTP_FROM_NAME=Restaurant
```

### 4. Start the backend

```bash
docker compose up -d
```

This starts:
- **PHP/Apache backend** on http://localhost:8000
- **phpMyAdmin** on http://localhost:8001

### 5. Start the frontend

```bash
cd data/www
npm install
npm run dev
```

Frontend will be available at http://localhost:5173.

---
