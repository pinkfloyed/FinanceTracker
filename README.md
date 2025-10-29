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

Figure 1 : Registration Page

<img width="1364" height="608" alt="register" src="https://github.com/user-attachments/assets/e980ae9c-69ec-445e-8e01-f37cf711b3e9" />

Figure 2 : Login Page

<img width="1365" height="570" alt="login" src="https://github.com/user-attachments/assets/8dfd37aa-64e2-4330-92f6-1f8ba5489ace" />

Figure 3 : After login (Sidebar Displays)

<img width="1365" height="611" alt="afterlog" src="https://github.com/user-attachments/assets/8e693fbc-0b7a-4552-b9b0-b59a6678e547" />

Figure 4 : Home Page

<img width="1365" height="598" alt="home" src="https://github.com/user-attachments/assets/c82fd485-bd1b-4af8-91e7-b1c5cf754fb2" />

Figure 5 : About Page

<img width="677" height="540" alt="about" src="https://github.com/user-attachments/assets/eb36d756-872b-45aa-a490-53cf5fcaf62d" />

Figure 6 : Dashboard

<img width="1365" height="601" alt="dashboard" src="https://github.com/user-attachments/assets/aeb5cbd6-394f-4544-bd92-49180d9ed38c" />

Figure 7 : Profile Page

<img width="1365" height="613" alt="profile" src="https://github.com/user-attachments/assets/c30c9e76-7ec3-4c75-90f8-5148e512e0bf" />

Figure 8 : Settings Page

<img width="1365" height="606" alt="settings" src="https://github.com/user-attachments/assets/57663d8e-9d5e-4519-a772-f438c727d45e" />

Figure 9 : Budgets Page - Users can Create, Read, Update, and Delete budgets to track spending limits across different categories

<img width="1365" height="452" alt="budgets" src="https://github.com/user-attachments/assets/4a8782f6-c04a-48f1-84df-92111dc3a71f" />

Figure 10 : Income Page - Enables users to manage income records efficiently, including adding new sources of income. 

<img width="1365" height="530" alt="addincome" src="https://github.com/user-attachments/assets/8d561230-a27e-4cdd-801b-e147d78fdf4e" />

Figure 11 : Update income - Shows the interface for editing existing income entries with real-time validation

<img width="1365" height="534" alt="updateincome" src="https://github.com/user-attachments/assets/a17fc19b-ed54-4e7c-9b9c-4f3601cf2f27" />

Figure 12 : Goals Page - Allows users to define, modify, and track financial goals such as savings targets or investment plans. 

<img width="1363" height="444" alt="goals" src="https://github.com/user-attachments/assets/31db37e8-3a69-4415-83bb-48d1b94eb9ee" />

Figure 13 : Reports Page

<img width="1365" height="608" alt="reports" src="https://github.com/user-attachments/assets/e116c0ee-d562-4cc6-9a30-5861eebf74f2" />

Figure 14 : Expense Page - Provides complete expense management, enabling users to add, edit, delete, and categorize expenses

<img width="1365" height="609" alt="expense" src="https://github.com/user-attachments/assets/1644e00b-e40e-4957-8447-d63163636470" />


---

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
