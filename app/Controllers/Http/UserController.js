'use strict'

const User = use('App/Models/User')
const Permission = use('App/Models/Permission')
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

class UserController {
  async validation({request,response}){
    const {cod,typeUser} = request.all()
    if(typeUser == 1){
      if(cod == 'iunavEDU'){
        return {
          userType:'Monitor',
          validation:true
        }
      }else{
        return response.status(502).json({validation:false})
      }
    }
    if(typeUser == 2){
      if(cod == 'iunavEDU'){
        return {
          userType:'Vigilante',
          validation:true
        }
      }else{
        return response.status(502).json({validation:false})
      }
    }
    if(typeUser == 3){
      if(cod == 456123789){
        return {
          userType:'Student',
          validation:true
        }
      }else{
        return response.status(502).json({validation:false})
      }
    }
  }

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

  async store({request,response}){
    const {user} = request.all()

    if(user.type == 1 || user.type == 2){
      const {email,password,name,lastName,type} = user
      const newUser = await User.create({
        nombre:name,
        apellido:lastName,
        password,
        email,
        type
      })
      return newUser
    }
    if(user.type == 3){
      const prece = await User.findByOrFail('type',1)
      const {device_token} = prece
      const bodyNotification = 'Un estudiante se ha registrado en nuestra app'
      const {name,lastName,age,ci,carrer,semester,phone,codKey,nroRoom,password,email,type} = user
      const newUser = await User.create({
        nombre:name,
        apellido:lastName,
        edad:age,
        cedula:ci,
        carrera:carrer,
        semestre:semester,
        telefono:phone,
        cod_llave:codKey,
        nro_habitacion:nroRoom,
        password,
        email,
        type
      })

      this.message(device_token,bodyNotification)

      await response.status(200).json({newUser})
    }
  }

  async upload({request,response,params}){
    const fotoUser = request.file("image",{
      types:["image"],
      size:"50mb"
    })
    const user = await User.findOrFail(params.id)
    await fotoUser.move('public/avatar',{
      name: fotoUser.clientName,
      overwrite:true
    })
    if(!fotoUser.moved()){
      return response.status(500).json({error:'no se pudo guardar la foto'})
    }
    user.foto_url = fotoUser.clientName
    await user.save()
    return response.status(200).json(user)
  }

  async login({request,auth}){
    const {email,password} = request.all()
    const token = await auth.attempt(email,password)
    const user = await User.query().where({email}).with('permissions').first()
    token.user = user
    return token
  }

  async inDevice({request,params,response}){
    const {id} = params;
    const {tokenDevice} = request.all();

    const findUser = await User.find(id)
    findUser.merge({
      device_token:tokenDevice
    })

    await findUser.save()
    return response.status(200).json({state:'Dispositivo logueado',user:findUser})
  }

  async index() {
    return await User.all()
  }

  async destroy ({ auth, params, request, response }) {
    const {id} = params
    const user = await User.find(id)

    if(!user){
      return {data:'usuario no encontrado'}
    }

    await user.delete()
    return user
  }

  async showStudentsOnly(){
    const user = await User.query().where('type','=',3).with('permissions').fetch()
    return user
  }

  async showStudents({params}){
    const {id} = params
    const permission = await Permission.query().where('user_id','=',id).fetch()
    return permission
  }

  async update ({ params, request, response }) {
    const {name,lastName,age,ci,carrer,semester,phone,codKey,nroRoom,username,password,email,type} = request.all()
    const {id} = params
    const user = await User.find(id)
    if(user == null || id == null){
      return response.json({
        message:"este usuario ya no existe"
      })
    }
    else if (user.id != id){
      return response.status(403).json({
        msg:'usted no esta authorizado'
      })
    }
    user.merge({
      nombre:name,
      apellido:lastName,
      edad:age,
      cedula:ci,
      carrera:carrer,
      semestre:semester,
      telefono:phone,
      cod_llave:codKey,
      nro_habitacion:nroRoom,
      username,
      password,
      email,
      type
    })

    await user.save()
    return user
  }
}

module.exports = UserController
