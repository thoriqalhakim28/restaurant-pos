# Restaurant POS System

## Tech Stack

### Backend

- PHP 8.2+
- Laravel 12
- Laravel Sanctum (API Authentication)
- MySQL

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Zustand (State Management)
- React Router 7
- shadcn/ui Components

## Prerequisites

Make sure you have the following installed:

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm
- MySQL

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd restaurant-pos
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Copy environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Configure your database in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_pos
DB_USERNAME=root
DB_PASSWORD=
```

Run database migrations:

```bash
php artisan migrate
```

Seed the database with initial data:

```bash
php artisan db:seed
```

Start the backend server:

```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install Node.js dependencies:

```bash
npm install
```

Copy environment file:

```bash
cp .env.example .env
```

Configure the API URL in `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`


### 4. Account

Kasir:

```
Email: cashier@example.com
Password: password
```

Pelayan:

```
Email: waiter@example.com
Password: password
```
