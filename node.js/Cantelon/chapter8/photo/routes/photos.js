var express = require('express');
var router = express.Router();

var photos = [];
photos.push({
	name: 'pic1',
	path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491976604218&di=d79417301be72de165a49c12c4c95740&imgtype=0&src=http%3A%2F%2Fimg2.ooopic.com%2F12%2F85%2F38%2F40bOOOPIC0e_202.jpg'
});
photos.push({
	name: 'pic2',
	path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491976604218&di=4882f1dd9a81efaf9fe85dc0ff3e6688&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20151014%2Fkatongbeijingtupian_5086318_small.jpg'
});


router.get('/', function(req, res, next) {
	res.render('photos', {
		title: 'Photos',
		photos: photos
	})
});

module.exports = router;