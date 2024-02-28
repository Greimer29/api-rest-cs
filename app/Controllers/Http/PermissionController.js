'use strict'

const Permission = use('App/Models/Permission')
const {format} = require('date-fns')
const User = use('App/Models/User')
const admin = require('firebase-admin')

const serviceAccount = {
  type: "service_account",
  project_id: "homeplusnotify-f6088",
  private_key_id: "ad80833cf64c0c4a2460c63615a57cb50e165707",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCAlpwXbXsjixsl\nDpJYgmfRSXzCco7LjSomVxi8s5FufdUpyHWLrMu6fi0qHwWgqmF5I+Z8TdBZaoSB\nXI2uecYzZHes8X8ruD96n0ZFnI+v18QTsZxsHHCRm5WYeuQGbZMlbkUlrVBXkH4l\nFW6PMxLTZ4z4YZb+xUqyxTG0oCGGV6j6undO1DBfHhTr3ccN3GgSViiFOIXC1H+h\nzgeEJnTF97fRD8X90NiQ/JLmep+qdpcAfVL+ZxurjUyPBy3Nf2tLBkLM7vByOIBs\ncEYnyyOX7lrntny4conOAmIglV+FILtprcLeft5hrv2+xoUGf1lzJ+jbZ0wnwagY\nwLQGm7o/AgMBAAECggEAI14JYbI1l8GXfjpDSz/W4Sv2uh67IsZZbQEwpxo2qm7G\ntf7SQdANmuZAcuDkcdvbAnA64T6fyzAucMwtlesddh4wgmtL4JEFOKtdLyFQLfvJ\nDOehj+TEm2/xFebbF9+EhNuO/j1spyDxaS67YXyZNXc6QUjKOJm4IXJ2aOlQPzwy\nSgQJ6TYC+1ypxKb/eoCCk0lU85/txHKu0k1yKOeGE1nX6pTqLeNtwpOuNJWKbwVL\nHGSaldSGeU4rPXq8aGpuPC+grTMOsSaPjVtsM1JqoYm7V0fOcG/45EMoqtJPGP21\nRyDm0E9ESEiCdsnb437GDuXTj0i8/DwT8Tq0TEV8PQKBgQC11UOGPBVcADQF21ds\nDMhGN6mzQ5yTwg/pR7g/buR+Z+KXXUphvC/SdixIzp4H+uADxauVhifC3NidiWyY\nu0Go9gxXWGk1bikN/llA+0EDbYKHhEdGeBVzx6G5qjyjWSs658/ylbcYL5eTowih\npivGgq4dvJ+hUubZxfQs7Y4H1QKBgQC1CZwRKMnG0uEm+8dkZE1CVIduBVvCrR5F\nDywbmcK7rdmLjvagaYOaIhfSR8/EjKl4GeGuqjrs/Mv0A3sgUhpxhTORapILmHug\n7curjiRPuqyEncR4m3bZ4CxWqJDKuX/5y6pGZnKJ+mEraoJWFOWT887LKxpnqbqo\nL7mKBEk3wwKBgEB6EgqcbZqE++2DvLk0wyObA1Lsy63dZ5T5+IyNvvpPzhqMWx7T\nA0Ym30cl9QWxYRQVWOWZf6nqc+lQ3LA/3mWScgfa8tueZ3Jt2apgLcqQX3O8ZSXI\n2RqIFIHoqr3llZ26q5NCoX0zCxWv/xSK/wTSO/mRdC1ZX0CjoBT6W53NAoGAeW2m\npsPLA3cy2ekLRsUYJSN5a0xgzeU8ZmnU1fZ+bVAgmMEdn17mjJ3NiJfuPhFzIkGJ\n5JP9zjOJwXQMRBON9RK5EhJ/PxPZ6IlXkQxYQrodOR5xR8xPHbiFROLvq2pc8nmv\nDmVs8itkvbBFF+QQUPq5fAC/R0TLFEBenLpfOe0CgYEAldENgnK+wj7k3ze6csHt\ni+sWAVJIVDXPbhcDdvkGFR9af1XzACmZ3QtDtHeglaXbOTLgjMXKRj5zEIt+2Vow\n4jIQwidoRTrfNZLLLJYU1x6WZQaaVoOox16aqyAHq330At8BubhLV4uWOE1a4pBQ\nLuT3nF8bcN3nAilZ8fvsGS4=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-556z1@homeplusnotify-f6088.iam.gserviceaccount.com",
  client_id: "112701694149190566419",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-556z1%40homeplusnotify-f6088.iam.gserviceaccount.com",
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

  async showAprob() {
    try {
      const fAct = new Date()
      const fechaActualFormateada = format(fAct, 'yyyy-MM-dd')
      return await Permission.query().where('estado', 'aprobado').where('fecha_salida', fechaActualFormateada).where('usado', '=', 'no usado').with('users').fetch()

    } catch (error) {
      console.log(error)
    }
  }

  async showDenied() {
    return await Permission.query().where('estado', '=', 'negado').with('users').fetch()
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
    const user = await auth.getUser()
    const { id } = params
    const permission = await Permission.find(id)
    if (permission == null) {
      return response.json({
        message: "este permiso ya no existe"
      })
    }
    else if (permission.user_id !== user.id) {
      return response.status(403).json({
        msg: 'usted no esta authorizado'
      })
    }

    await permission.delete()
    return permission
  }

}

module.exports = PermissionController
