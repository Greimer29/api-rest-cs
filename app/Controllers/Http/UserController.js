'use strict'

const User = use('App/Models/User')
const Permission = use('App/Models/Permission')
const Database = use('Database')

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
        return {
          userType:'Unknow',
          validation:false
        }
      }
    }
    if(typeUser == 2){
      if(cod == 'iunavEDU'){
        return {
          userType:'Vigilante',
          validation:true
        }
      }else{
        return {validation:false}
      }
    }
    if(typeUser == 3){
      if(cod == 456123789){
        return {
          userType:'Student',
          validation:true
        }
      }else{
        return {validation:false}
      }
    }
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
      await response.status(200).json({newUser})
    }
  }

  async upload({request,response,params}){
    const fotoUser = request.file("image",{
      types:["image"],
      size:"2mb"
    })
    const user = await User.findOrFail(params.id)
    const FotoUsername = fotoUser.clientName
    await fotoUser.move('public/users/avatar',{
      name: user.id+'_'+FotoUsername,
      overwrite:true
    })
    if(!fotoUser.moved()){
      return response.status(500).json({error:'no se pudo guardar la foto'})
    }
    user.foto_url = user.id+'_'+FotoUsername
    await user.save()
    return response.status(200).json(user)
  }

  async show({auth,params,response,request}){
    const auser = await auth.getUser()
    return auser
  }

  async login({request,auth}){
    const {email,password} = request.all()
    const token = await auth.attempt(email,password)
    const user = await User.query().where({email}).with('permissions').first()
    token.user = user
    return token
  }

  async index(){
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
