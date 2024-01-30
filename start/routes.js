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

Route.post('user/validation','UserController.validation')

Route.group(()=>{
  //usuarios
  Route.get('/','UserController.index')
  Route.get('students/','UserController.showStudentsOnly')
  Route.get('students/permises/:id','UserController.showStudents')
  Route.get('register/:id','UserController.show')
  Route.post('register','UserController.store')
  Route.post('register/login','UserController.login')
  Route.patch('register/:id','UserController.update')
  Route.delete('/:id','UserController.destroy')
  //permisos
  Route.get('permises','PermissionController.index')
  Route.get('permises/aproved','PermissionController.showAprob')
  Route.get('permises/denied','PermissionController.showDenied')
  Route.get('permises/requests','PermissionController.peticions')
  Route.patch('students/permises/state/:id','PermissionController.update')
  Route.patch('students/permises/used/:id','PermissionController.updateUsed')
  Route.patch('students/permises/confirmed/:id','PermissionController.confirmed')
  Route.post('permises','Permissioncontroller.create')
  Route.delete('permises/:id','Permissioncontroller.destroy')
  //
  Route.post('upload/image/:id','UserController.upload')
}).prefix('users')

