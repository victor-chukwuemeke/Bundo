// notification.js
// import React from "react";
import { messaging, getToken } from './firebase-config';

const requestPermission = async () => {
  if (typeof window !== 'undefined' && messaging && 'Notification' in window) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const token = await getToken(messaging, { vapidKey: 'BHeks36FQDbH7DPSLOarRZhd0HG7UHMt2uAlnu7HlIEc4oPTVSna8O5X_pwy7M8pvOFVQoDmMkv8QrhXM4ehIrA' });
        console.log('FCM Token:', token);
        showNotification('Subscribed to notifications!');
      } else {
        console.error('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('Error getting notification permission:', error);
    }
  } else {
    console.error('Notifications are not supported in this browser.');
  }
};

const showNotification = (message) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.showNotification('Notification', {
            body: message,
          });
        }
      });
    }
  };

export { requestPermission };
