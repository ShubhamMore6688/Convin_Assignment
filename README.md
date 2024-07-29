# Expense Sharing Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Introduction

The Expense Sharing Application is designed to help friends share and track their expenses. Users can add expenses, split costs equally or by percentage, and view their individual expenses. This application provides a streamlined way to manage shared expenses and ensures accurate accounting between friends.

## Features

- User authentication and authorization
- Add and manage expenses
- Split expenses equally, by percentage, or by exact amounts
- View individual expense details
- Export expenses to an Excel file

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- ExcelJS for exporting data to Excel
- dotenv for environment variables

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ShubhamMore6688/Convin_Assignment.git
cd Convin_Assignment
```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:

```bash
SECRETKEY=your_jwt_secret_key
DB_URL=your_mongodb_connection_string
```
4. Start the server:

```bash
npm start
```

## Usage

1. **User Registration and Login**:
    - Register a new user by sending a POST request to `/createuser` with `username`, `email`, and `mobile no.`.
       
    - Login with an existing user by sending a POST request to `/login` with `email`.
        

2. **Add Expense**:
    - Add an expense by sending a POST request to `/addexpense` with `description`, `amount`, `sharedType`, and `shares`.

        
3. **View Individual Expenses**:
    - Get the logged-in user's expenses by sending a GET request to `/indexpense`.


4. **View Overall Expenses**:
    - Get the all user's expenses by sending a GET request to `/overallexp`.
      

5. **Export Individual Expenses**:
    - Export individual expenses to an Excel file by sending a GET request to `/download-individual`.

6. **Export Overall Expenses**:
    - Export overall expenses to an Excel file by sending a GET request to `/download`.

## Project Structure

```bash
.
├── app.js
├── Controllers
│   ├── Expense.js
│   ├── IndividualExpenseSheet.js
│   ├── OverallExpenseSheet.js
│   └── User.js
├── Data
│   ├── config.env
│   └── database.js
├── files
│   ├── individual.xlsx
│   └── users.xlsx
├── Middlewares
│   └── authentication.js
├── Models
│   ├── Expense.js
│   └── User.js
├── package.json
├── package-lock.json
├── README.md
└── Routes
    ├── Expense.js
    ├── OverallExpenseSheet.js
    └── User.js

```

## API Endpoints

### Authentication

- **Register**: `POST createuser`
  - Request: `{ "username": "string", "email": "string", "mobileno": "464646545", "password": "string" }`
  - Response: `{ "success": true, "message": "User registered successfully" }`

- **Login**: `POST /login`
  - Request: `{ "email": "string", "password": "string" }`
  - Response: `{ "success": true, "token": "JWT token" }`

### Expenses

- **Add Expense**: `POST /addExpense`
  - Request: `{ "description": "string", "amount": number, "sharedType": "EQUAL | PERCENTAGE | EXACT", "shares": [{ "user": "userId", "amount": number }] }`
  - Response: `{ "success": true, "message": "Expense added successfully" }`

- **Get Individual Expenses**: `GET /indexpense`
  - Response: `{ "success": true, "individualExpenseDetailsOfUser": [expenseObject] }`

- **Get Overall Expenses**: `GET /overallexp`
  - Response: `{ "success": true, "expenses": [expenseObject] }`

- **Export Individual Expenses**: `GET /download-individual`
  - Response: `{ "success": true, "message": "file successfully downloaded", "path": "./files/individual.xlsx" }`

- **Export Overall Expenses**: `GET /download`
  - Response: `{ "success": true, "message": "file successfully downloaded", "path": "./files/users.xlsx" }`