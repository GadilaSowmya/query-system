# Query Management System

A full-stack web application for managing user queries with admin oversight. Built with React, TypeScript, Java Spring Boot, and MySQL.

---

## 📁 Project Structure

```
Query_Management_System/
├── frontend/ # React + TypeScript + Tailwind CSS (Vite)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.ts
│
├── QuerySystem/ # Spring Boot backend
│ ├── src/main/java/
│ ├── src/main/resources/
│ │ ├── application.properties.template
│ └── pom.xml
│
├── start.bat # Starts frontend + backend together
├── .gitignore
└── README.md
```

---

## ✨ Features

### **User Features**
- 🔐 Dual OTP Authentication (Email + Mobile)
- 📝 Submit and track queries
- 👤 User profile management
- 📊 Personal query history dashboard
- 🔔 Real-time status updates

### **Admin Features**
- 🛡️ Secure admin authentication (bcrypt hashed passwords)
- 📋 View all user queries
- ✅ Update query statuses (Pending → In Progress → Resolved)
- 📄 Paginated query table (8 items per page)
- 📱 Responsive admin dashboard

### **Design**
- 🎨 Premium Tailwind CSS styling
- 🌈 Glassmorphism effects and gradient accents
- 📱 Fully responsive (mobile + desktop)
- ⚡ Smooth animations and hover effects

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18+)
- Java (v17+)
- MySQL (v8.0+)
- npm or yarn
- Maven

### **1. Database Setup**

1. Open MySQL Workbench or command line
2. Create a database named `querysystem`:
   ```sql
   CREATE DATABASE querysystem;
   ```
3. The Java backend will automatically create tables using JPA/Hibernate

### **2. Configure Backend**

1.  Navigate to `query-system/QuerySystem/src/main/resources/`
2.  Rename `application.properties.template` to `application.properties`
3.  Open `application.properties` and update the `CHANGE_ME` placeholders with your actual credentials:
    ```properties
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    spring.mail.username=your_gmail_address
    spring.mail.password=your_app_password
    ```

### **3. Run Backend**

```bash
cd query-system\QuerySystem


Start the server:
```bash
mvnw spring-boot:run
```

The API will run on **http://localhost:8080**

### **3. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

The app will run on **http://localhost:5173**

### **Quick Start**

Simply run the startup script:
```bash
start.bat
```
This will automatically start both the Java backend and React frontend.

---

## 🔐 Admin Access

1. Navigate to: **http://localhost:5173/admin/signup**
2. Register your first admin account
3. Log in at: **http://localhost:5173/admin/login**

---

## 📡 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login (sends OTP)
- `POST /api/auth/verify-otp` - Verify dual OTP
- `POST /api/auth/resend-otp` - Resend OTPs

### **User Queries**
- `POST /api/query/submit` - Submit a new query (protected)
- `GET /api/query/my-queries` - Get user's queries (protected)
- `GET /api/user/profile` - Get user profile (protected)

### **Admin**
- `POST /api/admin/signup` - Admin registration
- `POST /api/admin/login` - Admin login
- `GET /api/admin/queries` - Get all queries
- `PUT /api/admin/query/:id/status` - Update query status

---

## 🛠️ Tech Stack

### **Frontend**
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons
- Vite

### **Backend**
- Java 25
- Spring Boot 4.0.2
- Spring Data JPA
- MySQL
- JavaMailSender
- Lombok
- Apache POI (Excel export)

### **Database**
- MySQL

---

## 📝 Environment Variables

The application is configured using `src/main/resources/application.properties`.
Use the provided `application.properties.template` as a starting point.


---

## 🎯 Usage Flow

1. **User Signup**: Enter details → Receive OTP via email → Verify → Login
2. **Submit Query**: Authenticated users can submit queries from the dashboard
3. **Admin Review**: Admin logs in → Views all queries → Replies to queries
4. **User Tracking**: Users see updated status in their dashboard

Note: The system now uses single OTP verification (email-based) instead of dual OTP.

---

## 🛡️ Security Features

- 🔐 JWT-based authentication
- 🔒 Bcrypt password hashing
- ⏱️ OTP expiry (60 seconds)
- 🚫 Protected API routes
- 🔑 Secure admin authentication

---

## 📂 Database Schema

### **users**
- `id`, `full_name`, `age`, `gender`, `qualification`, `college_name`, `location`, `mobile_number`, `email`, `status`, `created_at`

### **queries**
- `id`, `user_id`, `query_text`, `query_id`, `status`, `created_at`



### **admins**
- `id`, `full_name`, `email`, `password`, `created_at`

---

## 📸 Screenshots

### User Authentication
- Single OTP verification via email

### Admin Dashboard
- Query management with reply functionality
- Excel export capability

---

## 👨‍💻 Development

### Run Backend in Dev Mode
```bash
cd query-system\QuerySystem
mvnw spring-boot:run
```


### Build Frontend for Production
```bash
cd frontend
npm run build
```

---

## 🐛 Troubleshooting

### MySQL Connection Error
- Verify `.env` credentials
- Ensure MySQL is running
- Check database name matches

### OTP Not Received (Simulation)
- OTPs are logged to the backend console
- Check terminal output for development testing

### Port Already in Use
- Change `PORT` in `.env`
- Kill existing processes on port 5000 or 5173

---

## 📄 License

This project is for educational purposes.

---

## 🙏 Acknowledgments

- Tailwind CSS for the styling framework
- Lucide Icons for beautiful iconography
- React Router for seamless navigation

---
## 🔗 Live Demo:  

View Project
https://query-management-system-sage.vercel.app/

---
**Built with ❤️ for efficient query management**
