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

	db.all(`select rowid, * from ${table}`, (err, rows) => {
		if (err) {
			console.error(err)
		} else {
			callback({ error: 0, list: rows })
		}
	})

}

Sqlite.getOne = function(table, id, callback) {

	db.get(`select rowid, * from ${table} where rowid=${id}`, (err, row) => {
		if (err) {
			console.error(err)
		} else {
			callback({ error: 0, list: [row] })
		}
	})
}

module.exports = Sqlite