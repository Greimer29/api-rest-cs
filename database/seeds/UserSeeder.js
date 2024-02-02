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
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const newUser = await User.create({
      foto_url:'greimeravatar.jpg',
      nombre:'Admin',
      apellido:'Admin',
      password:'123',
      email:'Admin@Admin.com',
      type:'4'
    })
  return newUser
  }
}

module.exports = UserSeeder
