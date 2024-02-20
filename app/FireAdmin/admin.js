var admin = require("firebase-admin");

var serviceAccount = require("./homeplusnotify-f6088-firebase-adminsdk-556z1-ad80833cf6.json");

module.exports = {
  myFunction(token){

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    // This registration token comes from the client FCM SDKs.
    const registrationToken = token;

    const message = {
      notification : {
        title:'HomePlus:',
        body:'Tienes una solicitud de permiso'
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
}

/**/
