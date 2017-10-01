const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');

//设置静态文件路径
app.use(express.static('assets'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'), (err) => {
		err && console.error(err);
	});
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});