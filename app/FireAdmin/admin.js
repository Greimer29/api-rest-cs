var admin = require("firebase-admin");

var serviceAccount = require("./homeplusnotify-f6088-firebase-adminsdk-556z1-ad80833cf6.json");

export default function myFunction(token, theBody) {

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Otras configuraciones según sea necesario
    });
  }
  // This registration token comes from the client FCM SDKs.
  const registrationToken = token;

  const message = {
    notification: {
      title: 'HomePlus',
      body: theBody
    },
    webpush: {
      fcmOptions: {
        link: '/?breakingnews'
      }
    },
    token: registrationToken
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}


/**/
