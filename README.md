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
- Mongoose
- JWT for authentication
- ExcelJS for exporting data to Excel
- dotenv for environment variables

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-sharing-app.git
cd expense-sharing-app
```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:

```bash
SECRETKEY=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
```
4. Start the server:

```bash
npm start
```

