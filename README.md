# Query Management System (QMS) 🚀

A premium, full-stack query management solution designed for seamless user-admin interaction. Built with a modern architecture featuring **Java Spring Boot**, **React**, and **MySQL**.

---

## 📁 Project Structure

```
Query-Management-System/
├── frontend/          # Vite + React (TypeScript) + TailwindCSS
├── query-system/      # Java Spring Boot API (Maven)
├── vercel.json        # Vercel deployment configuration
├── start.bat          # Local startup script
└── README.md
```

---

## ✨ Key Features

### **🧠 Smart Query Priority**
- **Auto-Detection:** Automatically categorizes queries as **HIGH**, **MEDIUM**, or **LOW** based on keyword analysis (e.g., "urgent", "crash", "bug").
- **Visual Badges:** Color-coded priority levels in the admin dashboard for immediate attention.

### **🛡️ Admin Dashboard (Power Tools)**
- **Custom Replies:** Send personalized text responses to user queries via a sleek modal.
- **Quick Resolve ⚡:** Resolve queries instantly with a single click using pre-defined professional templates.
- **Excel Reports 📊:** Download comprehensive query reports in `.xlsx` format for offline analysis.
- **Query Management:** Advanced pagination, real-time status tracking, and glassmorphism UI.
- **Priority-Based Sorting:** View and filter queries by priority level (HIGH, MEDIUM, LOW) for efficient management.
- **User & Mentor Queries:** Manage queries from both regular users and mentors in a unified interface.

### **👤 User Experience**
- **Secure Auth:** OTP-based login & signup (Email) for robust verification.
- **Personal Dashboard:** Track query status (NEW → RESOLVED) and view admin replies in real-time.
- **Profile Management:** Complete user profile tracking including educational background and contact details.
- **Structured Address Input:** Detailed address capture with separate fields for Street/Area, City, State (dropdown), PIN Code (6-digit validation), and Country.
- **Dashboard Redirect:** After successful login OTP verification, users are automatically redirected to their personal dashboard.

### **🧑‍🏫 Mentor System**
- **Mentor Registration:** OTP-based signup with detailed professional profile capture.
- **Professional Details:** Organization, Designation, and Years of Experience tracking.
- **Address Management:** Same structured address format as users for consistency.
- **Mentor Dashboard:** Dedicated dashboard for mentors to manage their profile and mentorship activities.
- **Mentor OTP Verification:** Secure email-based OTP verification for mentor signup and login.

### **📧 Automated Notifications**
- **SendGrid Integration:** Powered by SendGrid API for reliable email delivery of OTPs, query notifications, and admin replies.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Design System)
- **Icons:** Lucide-react
- **Deployment:** Vercel

### **Backend**
- **Framework:** Spring Boot 3.3.x (Java 17+)
- **Security:** JWT + Bcrypt
- **Email:** SendGrid Java SDK
- **Data:** Spring Data JPA + MySQL
- **Tooling:** Apache POI (Excel Generation)
- **Deployment:** Render (Dockerized)

---

## 🚀 Getting Started

### **Local Setup**

#### **1. Database**
1. Create a MySQL database named `querysystem`.
2. Tables are auto-generated via JPA on first run.
3. **User Schema includes:** Name, Age, Gender, Qualification, College, Address (Street/Area, City, State, PIN Code, Country), Mobile, Email.
4. **Mentor Schema includes:** Name, Age, Gender, Email, Phone, Address, Organization, Designation, Experience.
5. **Admin Schema includes:** Admin ID, Email, Password (hashed), OTP for verification.

#### **2. Backend Configuration**
Create `query-system/QuerySystem/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/querysystem
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

# SendGrid Direct Injection
SENDGRID_API_KEY=YOUR_KEY
EMAIL_FROM=YOUR_VERIFIED_SENDER
```

#### **3. Run Application**
Use the provided batch script for one-click startup:
```bash
./start.bat
```

---

## � User Roles & Features

### **Regular Users**
- Sign up with comprehensive profile information
- Submit queries with automatic priority detection
- OTP-based secure login/signup
- View personal dashboard with query status
- Receive real-time notifications on query responses
- Track query history and admin replies

### **Mentors**
- Dedicated signup and login flows
- Professional profile with organization details
- OTP-based authentication
- Access to mentor dashboard
- Ability to interact with users and queries

### **Admins**
- Complete system oversight
- User and mentor management
- Advanced query filtering and prioritization
- Custom responses and quick resolution templates
- Email-based OTP for secure admin login
- Generate Excel reports for analysis

---

### **Backend (Render/Local)**
- `SPRING_DATASOURCE_URL`: Database connection string.
- `SENDGRID_API_KEY`: Your SendGrid API secret.
- `EMAIL_FROM`: Your verified SendGrid sender email.

### **Frontend (Vercel/Local)**
- `VITE_API_BASE_URL`: URL of the deployed backend (e.g., `https://your-api.onrender.com`).

---

## 📸 Deployment Highlights

- **Frontend:** Deployed on **Vercel** with SPA routing support.
- **Backend:** Hosted on **Render** (Docker container).
- **Database:** Managed MySQL instance on **Aiven**.

---

## 📄 License
This project is open-source and available under the MIT License.

---

**Built with ❤️ for efficient query management.**

