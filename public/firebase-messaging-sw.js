// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBdiL0qpAySYD_NyhV_TDQDwpeSNc3Iek0",
  authDomain: "bundo-web-application.firebaseapp.com",
  projectId: "bundo-web-application",
  storageBucket: "bundo-web-application.appspot.com",
  messagingSenderId: "435932462266",
  appId: "1:435932462266:web:70a0a3f7515280d788d683",
  measurementId: "G-W0WWDJQMWW"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Ensure you have an icon in your public directory
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
