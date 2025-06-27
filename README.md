# Expense Tracker Application

## Overview

Expense Tracker is a full-stack web application that helps users manage their personal finances by tracking income and expenses. The application provides an intuitive interface for recording financial transactions, visualizing spending patterns, and gaining insights into personal financial habits.

## Features

### Current Features

- **User Authentication**
  - Secure registration and login with JWT authentication
  - Password encryption using bcrypt
  - Profile picture upload functionality

- **Dashboard**
  - Overview of income, expenses, and balance
  - Visual representation of financial data

- **Transaction Management**
  - Add, view, edit, and delete income entries
  - Add, view, edit, and delete expense entries
  - Categorize transactions for better organization

## Technology Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Custom components with React Icons
- **HTTP Client**: Axios
- **Build Tool**: Vite 6.x
- **Notification**: React Hot Toast
- **Data Visualization**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Development**: Nodemon for hot reloading

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB running locally or a MongoDB Atlas account
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   
   # Create a .env file with the following variables:
   # PORT=8000
   # MONGO_URI=mongodb://localhost:27017/expense-tracker
   # JWT_SECRET=your_jwt_secret
   # CLIENT_URL=http://localhost:5173
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   
   # Start the frontend development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `GET /api/v1/auth/getUser` - Get user information (protected)
- `POST /api/v1/auth/upload-image` - Upload a profile picture

### Income (To be implemented)
- `GET /api/v1/income` - Get all income entries
- `POST /api/v1/income` - Create a new income entry
- `PUT /api/v1/income/:id` - Update an income entry
- `DELETE /api/v1/income/:id` - Delete an income entry

### Expenses (To be implemented)
- `GET /api/v1/expense` - Get all expense entries
- `POST /api/v1/expense` - Create a new expense entry
- `PUT /api/v1/expense/:id` - Update an expense entry
- `DELETE /api/v1/expense/:id` - Delete an expense entry

### Dashboard (To be implemented)
- `GET /api/v1/dashboard/summary` - Get financial summary
- `GET /api/v1/dashboard/charts` - Get data for charts

## Future Scope

### Enhanced User Experience
- **Dark Mode / Light Mode** - Toggle between dark and light themes
- **Customizable Dashboard** - Drag and drop widgets to personalize the dashboard
- **Multiple Languages** - Internationalization support for multiple languages

### Advanced Financial Features
- **Budget Planning** - Set up monthly/yearly budgets with category-wise limits
- **Financial Goals** - Create and track financial goals (savings, debt reduction)
- **Recurring Transactions** - Setup recurring income/expenses to auto-add entries
- **Bill Reminders** - Notifications for upcoming bills and expenses
- **Debt Tracker** - Track loans, credit cards, and other debts with interest calculations

### Data Insights
- **Advanced Analytics** - In-depth analysis of spending patterns over time
- **Predictive Analysis** - Predict future expenses based on historical data
- **Expense Categories Insights** - Detailed breakdown of where money is spent
- **Custom Reports** - Generate and export custom financial reports
- **Financial Health Score** - Calculate and track overall financial health

### Integration and Import/Export
- **Bank Integration** - Connect with banking APIs to auto-import transactions
- **CSV/Excel Import/Export** - Import and export financial data in various formats
- **Tax Calculation** - Help in calculating tax implications of income and deductions
- **Receipt Scanning** - Scan receipts to automatically create expense entries
- **Multi-currency Support** - Handle transactions in multiple currencies

### Social Features
- **Shared Budgets** - Allow multiple users to contribute to shared budgets
- **Financial Advice** - Community tips and professional advice integration
- **Expense Splitting** - Split expenses with friends/roommates/family
- **Expense Challenges** - Create and participate in saving challenges

### Mobile and Cross-Platform
- **Mobile Apps** - Native iOS and Android applications
- **Offline Mode** - Continue using the app without internet connection
- **Cross-device Sync** - Seamlessly sync data across all devices

### Security Enhancements
- **Two-Factor Authentication** - Additional security layer for account access
- **Biometric Authentication** - Login using fingerprint or face recognition
- **End-to-End Encryption** - Encrypt sensitive financial data
- **Privacy Controls** - Granular control over what data is stored and shared

### Enterprise Features
- **Team Accounts** - Business expense tracking with role-based permissions
- **Invoice Generation** - Create and send invoices directly from the app
- **Vendor Management** - Track vendors and payment history
- **Approval Workflows** - Set up approval chains for business expenses

---

*Note: This project is under active development. Some features described in the Future Scope section are planned but not yet implemented.*
