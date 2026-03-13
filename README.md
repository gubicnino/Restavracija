# Restaurant Reservation System

A full-stack web application for a restaurant featuring a modern React frontend and a PHP backend. The core of the app is a smart reservation system that automatically handles table and time slot allocation based on availability and user input. It also includes a dedicated admin panel where administrators can manage reservations, tables, and users, as well as view analytics and insights about reservation activity.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Recharts, Framer Motion |
| Backend | PHP (Apache), REST API with PDO |
| Database | MySQL |
| Email | SMTP via custom EmailService |
| Dev Tools | Docker Compose, phpMyAdmin |
| Image hosting | Cloudinary |
| Cloud | Backend + MySQL running on Oracle VM |

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

- `user` — application users and roles
- `verification_codes` — one-time verification codes for 2-step login
- `tableentity` — restaurant tables (number, capacity, location, table status)
- `reservation` — reservation records (guest info, time range, status, created timestamp)
- `reservation_table` — link table between reservations and assigned tables
- `pdfconfirmation` — generated PDF confirmation paths per reservation
- `menu_category` — menu categories and display order
- `menu_item` — menu items with category, price, image, and availability/location flags

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

### 2. Create a `.env` file

Create a `.env` file in the project root with the following variables:

```env
DB_PASSWORD=
DB_ROOT_PASSWORD=
DB_HOST=mysql
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

### 3. Start the backend and database

```bash
docker compose up -d
```

This starts:
- **PHP/Apache backend** on http://localhost:8000
- **phpMyAdmin** on http://localhost:8001
- **MySQL server**

### 5. Start the frontend

```bash
cd data/www
npm install
npm run dev
```

Frontend will be available at http://localhost:5173.

---
