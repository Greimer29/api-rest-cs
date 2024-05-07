'use strict'

const Permission = use('App/Models/Permission')
const {format} = require('date-fns')
const User = use('App/Models/User')
const admin = require('firebase-admin')

const serviceAccount = {
  type: "service_account",
  project_id: "homeplus-notify-7b62a",
  private_key_id: "66008be102976e502e0216a14747786de2a15b31",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCv4pSfHkkR+EQk\nptzRfnR9Y8/WgsMXk2dqEmiAWbns3Mc4othhD6ZKbMqJljx2yCWvKRCLt+j0Exci\nuXeNpgTzQ5qvHtIujfZqwEE8ATNTdpRiqt8S+pGMb/94Z0ZGax6pcIL2q9AAJF18\nlFC5Bp3vjYaBuVVc9xmpK97RF9MoivqoDc0KTegPDi+RUU9sGt1vo/lwSS2xmCr1\ndAYnA9DJte++AA10+6KtW4OKKbLUi8XaJG5C19BLhiGLVdhpCToeyKtWtoDzaiuK\nRQqNAq7s4O727P/WyBxWpy03vKZTHMYIrBR1TX+hmg6BVF2xsYhyFu34rwVLaswo\n94qH9GUnAgMBAAECggEAERVbZSceZsnr6HlymkCDlQhEUCwMQfZ1xXY7Qzgz2F9L\nVGNwy+CmwLTXaUy327ut+VjuO/vlewt9pEhKZe45rd0joZ3HQXFVfWHmFCtzrkgm\nunypRSEkUPUx5aJ2T3GpHUEJ32apwdHGaMrJGmeboIBpD6GOOoTfr7BMqJd9UYMg\n82KIanq9manuWYV+KCc1tzokkzdG/CiWiNEyj3dGSksBqr2EL25LDogXAQvWV3VC\nxSqXongeBxgyZxq2sBTKOHSEaalU12S9F2eiENLOgNkki7ryK5XKZIP/dkGGnoNe\nL1TZKAI5rnwAXGxnTp5t2Gca0LKOnDwXcNXfru20NQKBgQDgbTv/OvHMrSNmslvn\nKKOrz1DLxW78cLKIPTzJ9qvX1NXDy0GplQsipjisUA39MvQz5gTMXUmqsowSBgyF\n5jC3husrNw10aiwDuu9ilIf69xw3KnxeJ9A8qM/bt8ejLBrzcp6mctQ44YwVBJbi\n1kBmnbumurKqpB9I/Rx4mna9swKBgQDIoRyTMYr00YR4+3A+B7BOlbvFJk2/TUK/\n9gUHhLR7HZApdweMJ2z4ubukm9JCDm9IqVNrZoU4B0hNcUD3L+Ef3woWC3EMBju+\nPCwdBfooLiqm1Qvz7PGkGw3fk1eRjvfSHZoRfyaK8w/uaRqNapWHn/8NaxgSOz6T\nXIuua1BIvQKBgQDAQ7Sfno7iCv4GEAz9xuoY2Z3dRIIlkCLS5qt6VnG3kKWlfC7/\nqikFASQSMu8ZGJrvD0LTFaRzsUygcEAwQhlAUTyNJDfJoN+ePnqwmJC6JxMsC6DK\nRQ93uCOClzpXhwR7xZk2/a7kIA4TP4BISsaXYtANMWq5F6uZqwXGKIZLUwKBgD08\nR395uKLerCNNA0Y7jIl/1C7pcQN5rmzuxzwzOe716AFv7iLOCcmkzuwAD13QEBFK\ndUarpO+j8WKJtb18pKbYqbhux5NW97cpoIE/SMooxSXkkuBhqqNfCo3559lqnKNK\nG7NJbtcsNumatNsC9B7QK8XJsTAnWwMZVRzobjm1AoGBALBDiycb/lYCTWLs52Kv\nHwoMUhIEU8yV34ocaKgzOHwY6zgBX1VZsIzarTWAgkY9BXcx+CsbxScd75Cqh/nX\nG4JUnEwBjFZmaXcgSVPaZt74z8XGtj8rmCwprA/FcjcMLLI/A+BWvAtDgGnjMoO4\nD4EKeSvf2h27uLjGSaFCoBNn\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-siin8@homeplus-notify-7b62a.iam.gserviceaccount.com",
  client_id: "100008887236486611132",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-siin8%40homeplus-notify-7b62a.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

class PermissionController {
  message = (token,theBody) => {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Otras configuraciones según sea necesario
      });
    }
    // This registration token comes from the client FCM SDKs.
    const registrationToken = token;

    const message = {
      notification : {
        title:'HomePlus',
        body:theBody
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
  async index ({ auth,request, response, view }) {
    return await Permission.query().where('estado','!=','').with('users').fetch()
  }

  async showAprob( {response}) {
    try {
      const fAct = new Date()
      const fechaActualFormateada = format(fAct, 'yyyy-MM-dd')
      return await Permission.query().where('estado', 'aprobado').where('fecha_salida', fechaActualFormateada).where('usado', '=', 'no usado').with('users').fetch()

    } catch (error) {
      return response.json({data:'No se encontraron permisos'})
    }
  }

  async showDenied() {
    try{
      const fAct = new Date()
      const fechaActualFormateada = format(fAct, 'yyyy-MM-dd')
      return await Permission.query().where('estado', 'negado').where('fecha_salida', fechaActualFormateada).with('users').fetch()
    } catch (error) {
      return response.json({data:'No se encontraron permisos'})
    }
  }

  async create({ auth, request, response, view }) {

    const prece = await User.findByOrFail('type', 1)
    const { device_token } = prece
    const bodyNotification = 'Tienes una solicitud de permiso'

    this.message(device_token,bodyNotification)

    const user = await auth.getUser()
    const { dateL, dateS, timeL, timeS, motive, place, type, state, used } = request.all()
    const permission = new Permission()
    permission.fill({
      fecha_salida: dateS,
      fecha_llegada: dateL,
      hora_salida: timeS,
      hora_llegada: timeL,
      lugar: place,
      motivo: motive,
      tipo: type,
      estado: state,
      usado: used
    })
    await user.permissions().save(permission)
    return permission
  }

  async peticions() {
    const permissionStudent = await Permission.query().where('estado', '=', 'pendiente').with('users').fetch()
    return permissionStudent
  }

  async update({ params, request, response }) {
    const { id } = params
    const { estado } = request.all()

    const bodyNotification = 'Su solicitud fue procesada'


    const permission = await Permission.find(id)
    const student = await User.findOrFail(permission.user_id)
    const { device_token } = student

    permission.merge({ estado })
    await permission.save()

    this.message(device_token,bodyNotification)

    return permission
  }

  async updateUsed({ params, request, response }) {
    const { id } = params
    const { used } = request.all()
    const bodyNotification = 'La entrada de un estudiante ha sido confirmada'

    const permission = await Permission.find(id)
    const prece = await User.findByOrFail('type', 1)
    const { device_token } = prece

    permission.merge({ usado: used })
    await permission.save()
    this.message(device_token,bodyNotification)
    return permission
  }

  async confirmed({ params, request, response }) {
    const { id } = params
    const { salidaFirmed, llegadaFirmed } = request.all()
    const permission = await Permission.find(id)

    if (salidaFirmed) {
      permission.merge({ hora_salida_firmada: salidaFirmed })
      await permission.save()
      return permission
    } else if (llegadaFirmed) {
      permission.merge({ hora_llegada_firmada: llegadaFirmed })
      await permission.save()
      return permission
    }
  }

  async destroy({ auth, params, request, response }) {
    const { id } = params
    const permission = await Permission.find(id)
    if (permission == null) {
      return response.json({
        message: "este permiso ya no existe"
      })
    } else {
      await permission.delete()
      return response.status(202).json({
        msg: 'Permiso borrado exitosamente',
        data: permission
      })
    }
  }

}

module.exports = PermissionController
