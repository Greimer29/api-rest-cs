'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    await Database.table('users').insert([
      {
        'foto_url':'greimeravatar.jpg',
        'email':'Admin@Admin.com',
        'password':'123456',
        'nombre':'Admin',
        'apellido':'Admin',
        'type':'4'
      }
    ])
  }
  async aja(){
    console.log('redy')
  }
}

module.exports = UserSeeder
