const model = {}
const db = require('./sqlite')

model.getAll = function(table, callback) {
	db.getAll(table, callback)
}

model.getOne = function(table, id, callback) {
	db.getOne(table, id, callback)
}

module.exports = model