
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBdiL0qpAySYD_NyhV_TDQDwpeSNc3Iek0",
  authDomain: "bundo-web-application.firebaseapp.com",
  projectId: "bundo-web-application",
  storageBucket: "bundo-web-application.appspot.com",
  messagingSenderId: "435932462266",
  appId: "1:435932462266:web:70a0a3f7515280d788d683",
  measurementId: "G-W0WWDJQMWW"
};

let messaging;
if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(payload.notification.title, {
            body: payload.notification.body,
          });
        });
      }
    });
  }
  
export { messaging, getToken, onMessage };