'use strict'

const User = use('App/Models/User')
const Permission = use('App/Models/Permission')
const admin = require("firebase-admin")


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
      size:"10mb"
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
