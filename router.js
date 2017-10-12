const router = require('express').Router()
const model = require('./model')

////////////////////////////////////////////////////
/// 资源：书
////////////////////////////////////////////////////
 
router.get('/api/books', (req, res) => {  //获取全部书本信息
	model.getAll('books', req.query, (arg) => {
		res.send(arg)
	})
})
.get('/api/books/:id', (req, res) => {    //获取单一本书信息
	model.getOne('books', req.params.id, (arg) => {
		res.send(arg)
	})
})
.post('/api/books', (req, res) => {       //创建一本书
	model.create('books', req.body, (arg) => {
		res.send(arg)
	})
})
.put('/api/books/:id', (req, res) => {    //修改一本书，理论上需要提供全部字段，但本项目PUT的实现与PATCH一致，只需提供修改的字段
	model.update('books', req.params.id, req.body, (arg) => {
		res.send(arg)
	})
})
.patch('/api/books/:id', (req, res) => {  //修改一本书，仅需提供修改字段
	model.update('books', req.params.id, req.body, (arg) => {
		res.send(arg)
	})
})
.delete('/api/books/:id', (req, res) => { //删除一本书
	model.delete('books', req.params.id, (arg) => {
		res.send(arg)
	})
})

////////////////////////////////////////////////////
/// 资源：文章
////////////////////////////////////////////////////
 
router.get('/api/articles', (req, res) => {
	model.getAll('articles', (arg) => {
		res.send(arg)
	})
})
.get('/api/articles/:id', (req, res) => {
	model.getOne('articles', req.params.id, (arg) => {
		res.send(arg)
	})
})
.post('/api/articles', (req, res) => {
	model.create('articles', req.body, (arg) => {
		res.send(arg)
	})
})
.put('/api/articles/:id', (req, res) => {
	model.update('articles', req.params.id, req.body, (arg) => {
		res.send(arg)
	})
})
.patch('/api/articles/:id', (req, res) => {
	model.update('articles', req.params.id, req.body, (arg) => {
		res.send(arg)
	})
})
.delete('/api/articles/:id', (req, res) => {
	model.delete('articles', req.params.id, (arg) => {
		res.send(arg)
	})
})

module.exports = router