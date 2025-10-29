# 💰 Finance Tracker

A full-stack **personal finance management system** that helps users track **income, expenses, budgets, and financial goals** with authentication, dashboard insights, and CRUD management.

---

## 🚀 Features

### 🔐 Authentication
- Register, Login, Logout, and Token Refresh
- Profile management and password change
- JWT-based authentication (Bearer tokens)

### 💵 Finance Management
- **Expense Tracker:** Add, update, delete, and view expenses
- **Income Tracker:** Manage multiple income entries
- **Budget Tracker:** Set and monitor budgets
- **Goal Tracker:** Create and track financial goals

### 📊 Dashboard
- Aggregated summary of all finance data
- Graphs and statistics for quick insights

### 📤 File Uploads
- Expense receipts can be uploaded (stored as URL)

### 🧱 Architecture
- Clean architecture using Services, DTOs, and Controllers
- Type-safe frontend using React hooks and API services
- Fully documented Swagger UI

---

## 🧩 Folder Structure

### Frontend (`/frontend`)

```text
finance-tracker-frontend/
├── src/
│ ├── app/
│ │ ├── login/
│ │ ├── register/
│ │ ├── dashboard/
│ │ │ ├── income/
│ │ │ └── expenses/
│ │ └── layout.tsx
│ ├── components/
│ │ ├── ExpenseForm.tsx
│ │ ├── ExpenseList.tsx
│ │ ├── IncomeForm.tsx
│ │ ├── IncomeList.tsx
│ │ └── Navbar.tsx
│ ├── hooks/
│ │ ├── useExpenses.ts
│ │ └── useIncome.ts
│ ├── lib/
│ │ ├── api.ts
│ │ └── auth.ts
│ └── styles/
│ └── globals.css
├── package.json
└── tsconfig.json
```


### Backend (`/backend`)

```text
FinanceTracker.Api/
├── Controllers/
│ ├── AuthController.cs
│ ├── ExpenseController.cs
│ └── IncomeController.cs
├── DTOs/
│ ├── RegisterDto.cs
│ ├── LoginDto.cs
│ ├── ExpenseDto.cs
│ └── IncomeDto.cs
├── Models/
│ ├── ApplicationUser.cs
│ ├── Expense.cs
│ └── Income.cs
├── Data/
│ ├── AppDbContext.cs
│ └── SeedData.cs
├── Services/
│ ├── AuthService.cs
│ └── TokenService.cs
├── Program.cs
├── appsettings.json
└── FinanceTracker.Api.csproj
```

---


## 🛠️ Technologies Used

### Backend
- **.NET 8 / ASP.NET Core Web API**
- **Entity Framework Core** (Code First + Migrations)
- **SQL Server**
- **JWT Authentication**
- **Swagger / Swashbuckle**
- **Dependency Injection (DI)**

### Frontend
- **Next.js 15 (App Router)**
- **TypeScript + React**
- **TailwindCSS**
- **Axios (API calls)**
- **NextAuth / Custom Auth Provider**

---

## ⚙️ How to Run

### Backend Setup
```bash
cd FinanceTracker.Api
dotnet restore
dotnet ef database update
dotnet run
t run
```
- Backend runs at:
👉 http://localhost:5056/api

### 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Frontend runs at:
👉 http://localhost:3000

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint                    | Description       |
| ------ | --------------------------- | ----------------- |
| POST   | `/api/Auth/register`        | Register user     |
| POST   | `/api/Auth/login`           | Login and get JWT |
| POST   | `/api/Auth/logout`          | Logout            |
| POST   | `/api/Auth/refresh`         | Refresh token     |
| GET    | `/api/Auth/profile`         | Get current user  |
| PUT    | `/api/Auth/profile`         | Update profile    |
| PUT    | `/api/Auth/change-password` | Change password   |


### Expense
| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/Expense`      | Create expense        |
| GET    | `/api/Expense`      | Get all user expenses |
| GET    | `/api/Expense/{id}` | Get expense by ID     |
| PUT    | `/api/Expense/{id}` | Update expense        |
| DELETE | `/api/Expense/{id}` | Delete expense        |


### Income
| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | `/api/Income`      | Get all user income  |
| GET    | `/api/Income/{id}` | Get income by ID     |
| POST   | `/api/Income`      | Add income record    |
| PUT    | `/api/Income/{id}` | Update income record |
| DELETE | `/api/Income/{id}` | Delete income record |

### Budget
| Method | Endpoint           | Description           |
| ------ | ------------------ | ----------------------|
| GET    | `/api/Budgets`     | Get all user Budgets  |
| GET    | `/api/Budgets/{id}`| Get Budgets by ID     |
| POST   | `/api/Budgets`     | Add Budgets record    |
| PUT    | `/api/Budgets/{id}`| Update Budgets record |
| DELETE | `/api/Budgets/{id}`| Delete Budgets record |

### Goal
| Method | Endpoint           | Description        |
| ------ | ------------------ | -------------------|
| GET    | `/api/Goal`        | Get all user Goal  |
| GET    | `/api/Goal/{id}`   | Get Goal by ID     |
| POST   | `/api/Goal`        | Add Goal record    |
| PUT    | `/api/Goal/{id}`   | Update Goal record |
| DELETE | `/api/Goal/{id}`   | Delete Goal record |

### DashBoard
| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/api/Dashboard/summary` | Summary of financial data |


----

## 💻 Screenshots





## 🔮 Future Enhancements

- 💡 Monthly/Category-wise expense analytics (Pie/Bar charts)

- 🔔 Recurring expense reminders

- ☁️ Cloud storage integration (AWS S3 / Azure Blob)

- 🧾 Export to PDF/Excel

- 🧍‍♂️ Multi-user roles (Admin, User)

---

## 📜 License

- This project is licensed under the MIT License — you are free to use, modify, and distribute it with attribution.
---

## 👩‍💻 Author

Pinki Akter
Full-Stack Developer — ASP.NET Core | Next.js | SQL | React

--- 