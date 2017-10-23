const Sqlite = {}
const fse = require("fs-extra");
const sqlite3 = require('sqlite3').verbose();
const dbPath = './restapi.db';
// fse.unlinkSync(dbPath)
const isDbExists = fse.existsSync(dbPath);

if (!isDbExists) {
    fse.ensureFileSync(dbPath);
}
db = new sqlite3.Database(dbPath);

if (!isDbExists) {
	const sqls = [];

	/**
	 * @member books
	 * @type {table}
	 * @private
	 * @description 书本表
	 */
	sqls.push(`
		create table books (
			name NVarchar(50),
			category NVarchar(20)
		)
	`);

	/**
	 * @member articles
	 * @type {table}
	 * @private
	 * @description 文章表
	 */
	sqls.push(`
		create table articles (
			pid Integer,
			title NVarchar(50),
			author NVarchar(10),
			content Text
		)
	`);

	sqls.push(`
		Create Trigger tr_delete_books
    Before Delete On books
    For Each Row
    Begin
        Delete From articles Where pid = old.rowid;
    End
	`);
	
	sqls.push(`
		insert into books (name, category)
		select '唐诗三百首', '文学'
		union select '宋词', '文学'
	`);
	
	sqls.push(`
		insert into articles (pid, title, author, content)
		select 1, '静夜思', '李白', '床前明月光，\n 疑是地上霜。\n 举头望明月，\n 低头思故乡。'
		union select 1, '寻隐者不遇', '贾岛', '松下问童子，\n 言师采药去。\n 只在此山中，\n 云深不知处。'
	`);

	(function exec(sqls) {
		if (sqls.length) {
			db.run(sqls.shift(), (err) => {
				err ? console.error(err): exec(sqls);
			});
		}
		else {
			Sqlite.isInited = true;
		}
	}(sqls));
}

Sqlite.getAll = (resource, filter, callback) => {

	let condition = ''
	let where = ''

	// 过滤条件
	if (filter) {
		//排序
		if (filter.sortby) {
			condition += ` order by ${filter.sortby}`
			delete filter.sortby
			if (filter.order) {
				condition += ` ${filter.order}`
				delete filter.order
			}
		}
		//分页
		if (filter.page && filter.per_page) {
			condition += ` limit ${filter.page} offset ${(filter.page - 1) * filter.per_page}`
			delete filter.page
			delete filter.per_page
		}
		else {
			//查询记录数量
			if (filter.limit) {
				condition += ` limit ${filter.limit}`
				delete filter.limit
			}
			//查询记录起始位置
			if (filter.offset) {
				condition += ` offset ${filter.offset}`
				delete filter.offset
			}
		}
		Object.keys(filter).forEach(key => {
			where += ` and ${key}='${filter[key]}'`
		})
		if (where.length) {
			where = ` where` + where.substr(4)
		}
	}
	const sql = `select rowid, * from ${resource} ${where} ${condition}`

	db.all(sql, (err, rows) => {
		err ? console.error(err) : callback({ error: 200, list: rows })
	})

}

Sqlite.getOne = (resource, id, callback, code) => {

	const sql = `select rowid, * from ${resource} where rowid=${id}`
	db.get(sql, (err, row) => {
		if (err) {
			console.error(err)
		}
		else if (row) {
			callback({ error: code || 200, list: [row] })
		}
		else {
			callback({ error: 404 })
		}
	})

}

Sqlite.create = (resource, fields, callback) => {

	let sql1 = `insert into ${resource} (`
	let sql2 = `) values (`

	Object.keys(fields).forEach((key) => {
		sql1 += (key + ',')
		sql2 += `'${fields[key]}',`
	})

	const sql = sql1.substr(0, sql1.length - 1) + sql2.substr(0, sql2.length - 1) + ')'

	db.run(sql, function(err) { //这里需要使用回调函数的this，不能使用es6的箭头函数
		err ? console.error(err) : Sqlite.getOne(resource, this.lastID, callback, 201)
	})

}

Sqlite.update = (resource, id, fields, callback) => {

	let sql = `update ${resource} set `
	Object.keys(fields).forEach((key) => {
		sql += `${key}='${fields[key]}',`
	})
	sql = sql.substr(0, sql.length - 1) + ` where rowid=${id}`
	db.run(sql, function(err) {
		if (err) {
			console.error(err)
		}
		else if (this.changes === 0) {
			callback({ error: 404 })
		}
		else {
			Sqlite.getOne(resource, id, callback, 201)
		}
	})

}

Sqlite.delete = (resource, id, callback) => {

	const sql = `delete from ${resource} where rowid=${id}`
	db.run(sql, function(err) {
		if (err) {
			console.error(err)
		}
		else if (this.changes === 0) {
			callback({ error: 404 })
		}
		else {
			callback({ error: 204 })
		}
	})

}

Sqlite.getSubResource = (resource, foreignKey, callback) => {

	const sql = `select rowid, * from ${resource} where pid=${foreignKey}`
	db.all(sql, (err, rows) => {
		err ? console.error(err) : callback({ error: 0, list: rows })
	})

}

module.exports = Sqlite