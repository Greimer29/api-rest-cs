'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.date('fecha_salida').notNullable()
      table.date('fecha_llegada')
      table.datetime('hora_salida').notNullable()
      table.datetime('hora_llegada').notNullable()
      table.string('lugar',45).notNullable()
      table.string('motivo',80).notNullable()
      table.string('tipo',10).notNullable()
      table.string('estado',10)
      table.timestamps()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
