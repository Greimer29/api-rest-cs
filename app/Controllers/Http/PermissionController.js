'use strict'

const Permission = use('App/Models/Permission')
const { format } = require('date-fns')
const { myFunction } = require('../../Fireadmin/admin.js')
const User = use('App/Models/User')

class PermissionController {
  async index({ auth, request, response, view }) {
    return await Permission.query().where('estado', '!=', '').with('users').fetch()
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

    myFunction(device_token, bodyNotification)

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

    myFunction(device_token, bodyNotification)

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
    myFunction(device_token, bodyNotification)
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
