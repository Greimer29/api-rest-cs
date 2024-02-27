'use strict'

const { RouteGroup } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('user/validation', 'UserController.validation')
Route.get('users', 'UserController.index')

//endpoints
Route.group(() => {
  //usuarios
  //Listar todos los usuarios
  // Route.get('', 'UserController.index')
  /* //listar solo los que sean estudiantes
  Route.get('students/','UserController.showStudentsOnly')
  //listar los permisos de los estudiantes
  Route.get('students/permises/:id','UserController.showStudents')
  //registrar un usuario
  Route.post('register','UserController.store')
  //loguear un usuario
  Route.post('register/login','UserController.login')
  //actualizar un usuario
  Route.patch('register/:id','UserController.update')
  //eliminar un usuario
  Route.delete('/:id','UserController.destroy')

  //agregar un dispositivo
  Route.post('register/device/:id','UserController.inDevice')

  //permisos
  //listar todos los permisos generados
  Route.get('permises','PermissionController.index')
  //listar solo los aprobados
  Route.get('permises/aproved','PermissionController.showAprob')
  //listar solo los denegados
  Route.get('permises/denied','PermissionController.showDenied')
  //listar las peticiones
  Route.get('permises/requests','PermissionController.peticions')
  //actualizar el estado de un permiso para confiramar o negar
  Route.patch('students/permises/state/:id','PermissionController.update')
  //actualizar el estado de un permiso para confirmar que fue usado
  Route.patch('students/permises/used/:id','PermissionController.updateUsed')
  //actualizar el estado de un permiso para confirmar hora de salida y llegada
  Route.patch('students/permises/confirmed/:id','PermissionController.confirmed')
  //generar un permiso
  Route.post('permises','PermissionController.create')
  //eliminar un permiso
  Route.delete('permises/:id','PermissionController.destroy')

  //al momento de crear un usuario guarda la imagen de usuario
  Route.post('upload/image/:id','UserController.upload') */
}).prefix('users')

