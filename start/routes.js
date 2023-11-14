'use strict'

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

Route.get('users','UserController.index')
Route.get('users/permises','Permissioncontroller.index').middleware('auth')
Route.post('users/permises','Permissioncontroller.create').middleware('auth')
Route.post('users/register','UserController.store')
Route.post('users/register/login','UserController.login')
