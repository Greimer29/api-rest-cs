'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.specificType('fecha_salida','DATE').notNullable()
      table.specificType('fecha_llegada','DATE')
      table.string('hora_salida').notNullable()
      table.string('hora_llegada').notNullable()
      table.string('lugar',80).notNullable()
      table.string('motivo',200).notNullable()
      table.string('tipo',10).notNullable()
      table.string('usado',10)
      table.string('estado',10)
      table.string('hora_salida_firmada',20)
      table.string('hora_llegada_firmada',20)
      table.timestamps()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
