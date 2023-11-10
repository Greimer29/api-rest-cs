'use strict'

const User = use('App/Models/User')

class UserController {
  async store({request}){
    const {names,lastNames,age,ci,carrer,semester,phone,codKey,nroRoom,username,password,email,type} = request.all()
    //console.log(names,lastNames,age,ci,carrer,semester,phone,keyCod,nroRoom,username,password,email)

    const user = await User.create({
      nombres:names,
      apellidos:lastNames,
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
    return user
  }

  async index(){
    return await User.all()
  }
}

module.exports = UserController
