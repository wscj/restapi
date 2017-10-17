const model = {}
//这里可以是其他的数据库
const db = require('./sqlite')

model.getAll = (table, filter, callback) => {
	db.getAll(table, filter, callback)
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

model.delete = (table, id, callback) => {
	db.delete(table, id, callback)
}

model.getSubResource = (table, foreignKey, callback) => {
	db.getSubResource(table, foreignKey, callback)
}

module.exports = model