'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('foto_url')
      table.string('email', 254).notNullable().unique()
      table.string('password', 90).notNullable()
      table.string('nombre', 90)
      table.string('apellido', 90)
      table.string('edad', 20)
      table.string('cedula', 10).unique()
      table.string('carrera', 80)
      table.string('semestre', 10)
      table.string('telefono', 15)
      table.string('cod_llave', 5)
      table.string('nro_habitacion', 5)
      table.text('device_token')
      table.string('type',3)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
