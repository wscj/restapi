const router = require('express').Router()

////////////////////////////////////////////////////
/// 资源：书
////////////////////////////////////////////////////
 
router.get('/api/books', (req, res) => {  //获取全部书本信息
	console.log(req)
	res.send({ msg: 'Get all books' })
})
.get('/api/books/:id', (req, res) => {    //获取单一本书信息
	console.log(req)
	res.send({ msg: 'Get one book' })
})
.post('/api/books', (req, res) => {       //创建一本书
	console.log(req)
	res.send({ msg: 'Create a book' })
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