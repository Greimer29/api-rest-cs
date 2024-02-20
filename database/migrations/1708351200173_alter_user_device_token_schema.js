'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserDeviceTokenSchema extends Schema {
  tableName = 'users'
  up () {
    this.alter(this.tableName, (table) => {
      //table.text('device_token')
    })
  }

  down () {
    this.alter(this.tableName, (table) => {
      table.dropColumn('device_token')
    })
  }
}

module.exports = AlterUserDeviceTokenSchema
