const model = {}
//这里可以是其他的数据库
const db = require('./sqlite')

model.getAll = function(table, callback) {
	db.getAll(table, callback)
}

model.getOne = function(table, id, callback) {
	db.getOne(table, id, callback)
}

model.create = function(table, fields, callback) {
	db.create(table, fields, callback)
}

model.update = function(table, id, fields, callback) {
	db.update(table, id, fields, callback)
}

module.exports = model