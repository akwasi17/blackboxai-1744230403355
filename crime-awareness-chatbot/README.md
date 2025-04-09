# Crime Awareness Chatbot

A React-based chatbot application for crime awareness, reporting, and safety tips.

## Features

- Interactive crime awareness chatbot
- Safety tips and prevention advice
- Police station locator
- Crime reporting functionality
- User authentication

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Register a web app in your Firebase project
3. Get your Firebase configuration from Project Settings
4. Create a `.env` file in project root with these variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

5. Enable Authentication (Email/Password) and Firestore in Firebase Console

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Note: The app includes default configuration values for demo purposes, but you should replace them with your own Firebase project credentials for production use.
