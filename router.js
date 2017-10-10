const router = require('express').Router()
const model = require('./model')

////////////////////////////////////////////////////
/// 资源：书
////////////////////////////////////////////////////
 
router.get('/api/books', (req, res) => {  //获取全部书本信息
	model.getAll('books', function(arg) {
		res.send(arg)
	})
})
.get('/api/books/:id', (req, res) => {    //获取单一本书信息
	model.getOne('books', req.params.id, function(arg) {
		res.send(arg)
	})
})
.post('/api/books', (req, res) => {       //创建一本书
	model.create('books', req.body, function(arg) {
		res.send(arg)
	})
})
.put('/api/books/:id', (req, res) => {    //修改一本书，参数需要提供全部字段
	console.log(req)
	res.send({ msg: 'Update a book with all fields' })
})
.patch('/api/books/:id', (req, res) => {  //修改一本书，仅需提供修改字段
	console.log(req)
	res.send({ msg: 'Update a book with some fields which going to change' })
})
.delete('/api/books/:id', (req, res) => { //删除一本书
	console.log(req)
	res.send({ msg: 'Delete a book' })
})

module.exports = router