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

Sqlite.getAll = function(table, callback) {

	const sql = `select rowid, * from ${table}`
	db.all(sql, (err, rows) => {
		err ? console.error(err) : callback({ error: 0, list: rows })
	})

}

Sqlite.getOne = function(table, id, callback) {

	const sql = `select rowid, * from ${table} where rowid=${id}`
	db.get(sql, (err, row) => {
		err ? console.error(err) : callback({ error: 0, list: [row] })
	})

}

Sqlite.create = function(table, fields, callback) {

	let sql1 = `insert into ${table} (`
	let sql2 = `) values (`

	Object.keys(fields).forEach(function(key) {
		sql1 += (key + ',')
		sql2 += `'${fields[key]}',`
	})

	const sql = sql1.substr(0, sql1.length - 1) + sql2.substr(0, sql2.length - 1) + ')'

	db.run(sql, function(err) {
		err ? console.error(err) : Sqlite.getOne(table, this.lastID, callback)
	})

}

module.exports = Sqlite