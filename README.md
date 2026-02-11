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

### **👤 User Experience**
- **Secure Auth:** OTP-based login (Email) for robust verification.
- **Personal Dashboard:** Track query status (NEW → RESOLVED) and view admin replies in real-time.
- **Profile Management:** Complete user profile tracking including educational background and contact details.
- **Structured Address Input:** Detailed address capture with separate fields for Street/Area, City, State (dropdown), PIN Code (6-digit validation), and Country.

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

## 🔐 Environment Variables

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

