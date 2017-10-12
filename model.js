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

/**
 * 删除数据
 *
 * |错误码|意义|
 * |--|--|
 * |0|成功|
 * |1|不存在被删除的数据|
 */
model.delete = (table, id, callback) => {
	db.delete(table, id, callback)
}

module.exports = model