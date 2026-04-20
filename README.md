# Student Grade Tracker

Student Grade Tracker is a full-stack web application built with React, Spring Boot, and MongoDB. It lets you add students, view all saved records, delete records, and monitor class performance with a live dashboard.

## Features

- Add a student with name and marks
- View all students in a responsive table
- Delete a student record
- See total students, average score, highest score, and lowest score
- Automatic grade calculation (`A`, `B`, `C`, `D`)
- Client-side form validation and loading states
- Backend validation, layered architecture, and global exception handling

## Tech Stack

- Frontend: React + Vite + Fetch API + CSS
- Backend: Java 17 + Spring Boot + Spring Data MongoDB
- Database: MongoDB

## Folder Structure

```text
New project/
|-- backend/
|   |-- pom.xml
|   `-- src/
|       `-- main/
|           |-- java/com/studentgradetracker/
|           |   |-- StudentGradeTrackerApplication.java
|           |   |-- config/CorsConfig.java
|           |   |-- controller/StudentController.java
|           |   |-- dto/
|           |   |-- exception/
|           |   |-- model/Student.java
|           |   |-- repository/StudentRepository.java
|           |   `-- service/
|           `-- resources/application.properties
|-- src/
|   |-- components/
|   |-- services/studentApi.js
|   |-- utils/grade.js
|   |-- App.jsx
|   |-- main.jsx
|   `-- styles.css
|-- package.json
|-- vite.config.js
`-- README.md
```

## Backend Setup

1. Install Java 17, Maven, and MongoDB.
2. Start MongoDB locally on the default port `27017`.
3. Open a terminal in `C:\Users\nitis\OneDrive\Pictures\Documents\New project\backend`.
4. Run:

```bash
mvn spring-boot:run
```

5. The backend will start on `http://localhost:8080`.

### Optional MongoDB Configuration

If you want to use a different MongoDB connection string, set the `MONGODB_URI` environment variable before starting the backend.

Example:

```powershell
$env:MONGODB_URI="mongodb://localhost:27017/student_grade_tracker"
mvn spring-boot:run
```

## Frontend Setup

1. Open a terminal in `C:\Users\nitis\OneDrive\Pictures\Documents\New project`.
2. Install dependencies if needed:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

4. Open the app at the local Vite URL shown in the terminal, usually `http://localhost:5173`.

The Vite dev server is configured to proxy `/students` requests to the Spring Boot backend at `http://localhost:8080`.

## Database Setup

### Option 1: Local MongoDB Community Server

1. Install MongoDB Community Edition.
2. Start the MongoDB service.
3. The application will automatically use the database named `student_grade_tracker`.

### Option 2: MongoDB Atlas

1. Create a cluster in MongoDB Atlas.
2. Copy the connection string.
3. Set it in the `MONGODB_URI` environment variable.
4. Start the Spring Boot backend.

## API Endpoints

### Add Student

```http
POST /students
Content-Type: application/json

{
  "name": "Ananya",
  "marks": 91.5
}
```

### Get All Students

```http
GET /students
```

### Get Student Stats

```http
GET /students/stats
```

### Delete Student

```http
DELETE /students/{id}
```

## Notes

- Grade rules:
  - `A`: 90 and above
  - `B`: 75 to 89.99
  - `C`: 60 to 74.99
  - `D`: Below 60
- Validation is enforced on both frontend and backend.
- When there are no students, the dashboard returns zeros for all metrics.

## Build Commands

### Frontend Production Build

```bash
npm run build
```

### Backend Package Build

```bash
mvn clean package
```
