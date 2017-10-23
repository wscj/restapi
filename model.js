const model = {}
//这里可以是其他的数据库
const db = require('./sqlite')

model.getAll = (resource, filter, callback) => {
	db.getAll(resource, filter, callback)
}

model.getOne = (resource, id, callback) => {
	db.getOne(resource, id, callback)
}

model.create = (resource, fields, callback) => {
	db.create(resource, fields, callback)
}

model.update = (resource, id, fields, callback) => {
	db.update(resource, id, fields, callback)
}

model.delete = (resource, id, callback) => {
	db.delete(resource, id, callback)
}

model.getSubResource = (resource, foreignKey, callback) => {
	db.getSubResource(resource, foreignKey, callback)
}

module.exports = model