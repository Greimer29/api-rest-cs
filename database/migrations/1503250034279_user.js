'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('nombres', 60).notNullable()
      table.string('apellidos', 60).notNullable()
      table.string('edad', 3).notNullable()
      table.string('cedula', 10).notNullable().unique()
      table.string('carrera', 15).notNullable()
      table.string('semestre', 3).notNullable()
      table.string('telefono', 15).notNullable()
      table.string('cod_llave', 5).notNullable()
      table.string('nro_habitacion', 5).notNullable()
      table.string('type',3)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
