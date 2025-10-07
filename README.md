# Student Management System

A full-stack **Student Management System** application with:

- **Frontend:** ReactJS with HTML, CSS, and JavaScript
- **Backend:** Java 17 Spring Boot REST API secured with JWT authentication
- **Database:** MySQL
- **Build Tool:** Maven
- **Docker:** Used for containerizing backend and frontend
- **API Testing:** Postman collection available for testing endpoints

---

## Project Structure

student-management-system/
│
├── backend/ # Java Spring Boot backend
│ ├── src/ # Source code
│ ├── pom.xml # Maven build file
│ └── Dockerfile # Docker configuration
│
├── frontend/ # ReactJS frontend code
│
├── docker UI.dockerfile # Dockerfile for UI
│
└── README.md # This file


---

## Features

- User authentication and authorization using JWT (JSON Web Tokens)
- Secure REST API with Spring Security
- CRUD operations for managing student data
- Data persistence using MySQL database
- Responsive ReactJS user interface connected to backend APIs
- Docker support for easy deployment and environment consistency
- Postman collection included for API testing

---

## Getting Started

### Prerequisites

- Java 17
- Maven 3.x
- Node.js and npm
- MySQL database setup (default port 3306)
- Docker (optional, if using containers)

---

### Running the Backend

```bash
cd backend
./mvnw spring-boot:run
Backend will start on port 9091 (default).
Ensure your MySQL database credentials and settings are configured in src/main/resources/application.properties.

Running the Frontend
bash
Copy code
cd frontend
npm install
npm start
Frontend runs on port 3000 by default.

Docker Usage
Backend Docker
bash
Copy code
cd backend
docker build -t student-backend .
docker run -p 9091:9091 student-backend
Frontend Docker
bash
Copy code
docker build -t student-ui -f "docker UI.dockerfile" .
docker run -p 3000:3000 student-ui
API Testing with Postman
Use the included Postman collection to test API endpoints easily. Import the collection into Postman and update environment variables as needed.

Configuration
Backend database and JWT configurations are in application.properties

Modify ports and secrets as required

Contact
Developed by Mallikarjuna Karedla
GitHub: https://github.com/mallikarredla
git push origin feature/jwt-auth
