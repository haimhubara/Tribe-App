# 📱 Tribe App

**Tribe App** is a **React Native (iOS & Android)** application that helps users connect with new friends who share similar hobbies and interests.

---

## 🚀 Features

- 💬 **Private Chat:** One-on-one real-time messaging between users  
- 👥 **Group Chat:** Create and join chat groups around shared hobbies  
- 🎯 **Activities:** Create or join activities and meet people in your area  
- 👤 **Profile:** Personalize your user profile with photos and hobbies  
- 🔍 **Search:** Find activities by interests or location  
- ☁️ **Firebase Firestore:** Store user and chat data securely  
- 🔄 **Firebase Realtime Database:** Manage live message updates  
- 🧠 **React Redux:** Manage authentication, user data, and chat state  
- 🔑 **Firebase Authentication:** Secure login and sign-up with email or social login  

---

## 🧱 Project Structure

```
Tribe-App/                           
├─ assets/      # Images, icons, fonts           
├─ components/  # Reusable UI components      
├─ constants/   # Global styles, colors, etc           
├─ hooks/       # Custom React hook      
├─ navigation/  # React Navigation setup          
├─ screens/     # App screens (Chat, Profile, etc.)    
├─ store/       # Redux slices and store config     
└─ util/        # Helper functions (e.g., Firebase, Cloudinary)
└─ README.md
```
---

## ⚙️ Tech Stack

- **React Native (Expo)**
- **Firebase (Auth, Firestore, Realtime DB, Storage)**
- **Redux Toolkit**
- **Cloudinary (for media uploads)**

---

## 🧩 Installation & Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/haimhubara/Tribe-App.git
cd Tribe-App


# Install dependencies
npm install

# Run the development server
npm start
```

## 🔐 Environment Variables

Before running the app, create a `.env` file in the root directory with the following variables:

```bash
# Firebase Configuration
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=