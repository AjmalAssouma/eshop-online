import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyBHGXRZKRor9agFp670ZiQ0PGXFLXkI0dM",
  authDomain: "fir-notification-98f6b.firebaseapp.com",
  projectId: "fir-notification-98f6b",
  storageBucket: "fir-notification-98f6b.appspot.com",
  messagingSenderId: "874709133215",
  appId: "1:874709133215:web:891eaade91408bc7c23faa",
  measurementId: "G-427N4EBXC6"
};

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);


  export const requestPermission = () => {
    console.log("Requesting User Permission ....");
    Notification.requestPermission().then(permission => {
      if(permission === "granted") {
        console.log("Notification User Permission Granted");

        return getToken(messaging, {
          vapidKey:
          "BHGVqMGPZrf0u6LJCkA5t-cBMxWth6BmbKNidxMTA1AOFITfJ4fF7a1YMDQpKX7QQWTuL5gbTXXjyWt_cA61GQE"
        })
        .then(currentToken => {
          if(currentToken) {
            console.log("Client Token: ", currentToken);
          }else {
            console.log("Failed to generate the app registration token");
          }
        })
        .catch(err => {
          console.log("An error occured when requesting to receive the token.", err);
        });
      } else {
          console.log("User Permission Denied.");
      }
    });
  };

  requestPermission();

  export const onMessageListener = () =>
    new Promise(resolve => {
      onMessage(messaging, payload => {
        resolve(payload);
      });
    });







