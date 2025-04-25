# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

# 💸 Full-Stack Expense Tracker App

A modern full-stack **Expense Tracker** mobile app built with **React Native, Expo Router, and Firebase**, designed to help users manage their finances on the go. Featuring real-time updates, dynamic financial insights, and a clean responsive UI — all with Firebase Auth, Firestore, and Cloudinary integration.

---

## 🛠 Tech Stack

- **Frontend:** React Native, Expo, Expo Router, Tailwind (via NativeWind)
- **Backend:** Firebase (Auth, Firestore, Storage), Cloudinary (Media)
- **Navigation:** Expo Router (File-based routing)
- **State Management:** React Context API
- **Other Tools:** ESLint, Prettier, React Navigation, Reanimated

---

## 🚀 Features

### ✅ Authentication
- Firebase Email/Password Auth
- Secure user login & registration
- Biometric login support (optional)

### 🧑‍💼 User Profiles
- Profile info with avatar
- Profile photo upload via **Cloudinary**
- Edit profile & logout functionality

### 💼 Wallet Management
- Create multiple wallets (e.g., Cash, Bank)
- View wallet balance & transactions
- Delete wallets with confirmation

### 🔄 Transactions
- Add income/expense with category
- Real-time data syncing via Firestore
- Edit/delete transactions

### 🔍 Dynamic Search
- Search transactions by category, wallet, or notes
- Instant filtering of data

### 📊 Statistics Screen
- Visualize expenses by category (pie chart)
- Filter by time frame (daily/weekly/monthly)
- Budget insights (planned feature)

### 🧭 Custom Navigation
- Bottom Tab Navigation via Expo Router
- Stack Navigation for detail screens
- Smooth animations with Reanimated

---

## 🖼 Screenshots

> Upload your screenshots inside `/assets/screenshots` and reference them here:

| Login Screen | Dashboard | Statistics |
|--------------|-----------|------------|
| ![](./assets/screenshots/login.png) | ![](./assets/screenshots/dashboard.png) | ![](./assets/screenshots/stats.png) |

---

## 🗂 Entity Relationship Diagram (ERD)

This diagram shows the data structure between users, wallets, and transactions in Firestore:

> Add your ERD diagram image to `/assets/er-diagram.png` and reference here:

![ER Diagram](./assets/er-diagram.png)

### ER Model Breakdown:
- **Users**
  - `uid: string`
  - `email: string`
  - `displayName: string`
  - `photoURL: string`

- **Wallets**
  - `id: string`
  - `name: string`
  - `type: string` (e.g., Cash, Bank)
  - `balance: number`
  - `createdBy: uid`

- **Transactions**
  - `id: string`
  - `amount: number`
  - `type: "income" | "expense"`
  - `category: string`
  - `walletId: string`
  - `userId: uid`
  - `timestamp: Date`

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app


This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
