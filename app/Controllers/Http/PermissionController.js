'use strict'

const auth = require('@adonisjs/auth')
const Response = require('@adonisjs/framework/src/Response')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with permissions
 */

const Permission = use('App/Models/Permission')
const User = use('App/Models/User')
const {format} = require('date-fns')

class PermissionController {
  /**
   * Show a list of all permissions.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth,request, response, view }) {
    return await Permission.query().where('estado','!=','').with('users').fetch()
  }

  async showAprob () {
    try {
      const fAct = new Date()
      const fechaActualFormateada = format(fAct,'yyyy-MM-dd')
      return await Permission.query().where('estado','aprobado').where('fecha_salida',fechaActualFormateada).where('usado','=','no usado').with('users').fetch()

    } catch (error) {
      console.log(error)
    }
  }

  async showDenied () {
    return await Permission.query().where('estado','=','negado').with('users').fetch()
  }


  /**
   * Render a form to be used for creating a new permission.
   * GET permissions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ auth, request, response, view }) {
    const user = await auth.getUser()
    const {dateL,dateS,timeL,timeS,motive,place,type,state,used} = request.all()
    const permission = new Permission()
    permission.fill({
      fecha_salida:dateS,
      fecha_llegada:dateL,
      hora_salida:timeS,
      hora_llegada:timeL,
      lugar:place,
      motivo:motive,
      tipo:type,
      estado:state,
      usado:used
    })
    await user.permissions().save(permission)
    return permission
  }

  async peticions (){
    const permissionStudent = await Permission.query().where('estado','=','pendiente').with('users').fetch()
    return permissionStudent
  }

  /**
   * Create/save a new permission.
   * POST permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single permission.
   * GET permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const {} = params
  }

  /**
   * Render a form to update an existing permission.
   * GET permissions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update permission details.
   * PUT or PATCH permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {id} = params
    const {estado} = request.all()
    const permission = await Permission.find(id)
    permission.merge({estado})
    await permission.save()
    return permission
  }

  async updateUsed ({ params, request, response }) {
    const {id} = params
    const {used} = request.all()
    const permission = await Permission.find(id)
    permission.merge({usado:used})
    await permission.save()
    return permission
  }
  async confirmed ({ params, request, response }) {
    const {id} = params
    const {salidaFirmed,llegadaFirmed} = request.all()
    const permission = await Permission.find(id)

    if(salidaFirmed){
      permission.merge({hora_salida_firmada:salidaFirmed})
      await permission.save()
      return permission
    }else if(llegadaFirmed){
      permission.merge({hora_llegada_firmada:llegadaFirmed})
      await permission.save()
      return permission
    }
  }


  /**
   * Delete a permission with id.
   * DELETE permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, params, request, response }) {
    const user = await auth.getUser()
    const {id} = params
    const permission = await Permission.find(id)
    if(permission == null){
      return response.json({
        message:"este permiso ya no existe"
      })
    }
    else if (permission.user_id !== user.id){
      return response.status(403).json({
        msg:'usted no esta authorizado'
      })
    }

    await permission.delete()
    return permission
  }

}

module.exports = PermissionController
