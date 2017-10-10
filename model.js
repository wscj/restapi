const model = {}
//这里可以是其他的数据库
const db = require('./sqlite')

model.getAll = (table, callback) => {
	db.getAll(table, callback)
}

model.getOne = (table, id, callback) => {
	db.getOne(table, id, callback)
}

model.create = (table, fields, callback) => {
	db.create(table, fields, callback)
}

model.update = (table, id, fields, callback) => {
	db.update(table, id, fields, callback)
}

module.exports = model