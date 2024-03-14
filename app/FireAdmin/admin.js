var admin = require("firebase-admin");
var serviceAccount = require("./homeplus-notify-firebase-admin.json");

module.exports = class FirebaseAdmin {
  constructor() {
    // this.bucket = storage.bucket(bucketName); // Nombre del bucket
  }

  /**
   * @param {string} fileName nombre del archivo
   * @returns {Promise<string>} url de la imagen
   */
  static async myFunction(token, theBody) {
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
}
