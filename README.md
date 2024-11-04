# RememberMe

RememberMe is a web application that helps users manage and remember people's names, locations where they met, and unique details about them. This app is particularly useful for networking, social gatherings, or remembering contacts.

## Table of Contents
Project Overview
Features
Technologies Used
Getting Started
Installation
Usage
API Endpoints
Folder Structure
License

## Project Overview
RememberMe is designed to be a personal organizer that assists users in keeping track of the names and details of people they encounter. Users can add new contacts by specifying their name, meeting place, and a memorable detail. The application offers search functionality to help users quickly find contacts based on names or meeting locations.

## Features
Add Contacts: Enter a person’s name, where you met them, and something unique about them.
Search Functionality: Search for contacts by name or meeting location.
User Authentication: Register and log in to securely access your contacts.
JWT Authentication: Secure login with JSON Web Tokens.
Data Persistence: Stores user details and contacts in a database.

## Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Database: MongoDB
Authentication: JWT (JSON Web Token)
Security: bcrypt for password hashing

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

## Prerequisites
Node.js and npm (Node Package Manager)
MongoDB instance (local or remote)
Git for version control

## Installation
Clone the repository:
git clone https://github.com/YourUsername/RememberMe.git
cd RememberMe

Install dependencies:
npm install

Create a .env file with the following environment variables:
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongo_db_connection_string

Run the application:
npm start
The application should now be running on http://localhost:3000

## Usage
Navigate to the registration page to create an account.
Once registered, log in to add and search for contacts.

API Endpoints
Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login an existing user and receive a JWT.
Contacts
GET /api/contacts: Fetch all contacts (requires authentication).
POST /api/contacts: Add a new contact (requires authentication).
DELETE /api/contacts/:id: Delete a contact by ID (requires authentication).

## Folder Structure
RememberMe/
models/ (Contains Mongoose models)
routes/ (Express route handlers)
public/ (Static files: HTML, CSS, client-side JS)
index.html (Main application HTML file)
.env (Environment variables, not tracked in Git)
.gitignore (Git ignore rules)
README.md (Project README file)
server.js (Main server file)
package.json (npm package configuration)



License
This project is licensed under the MIT License. See the LICENSE file for more information.
