var express = require('express');
var formidable = require('formidable');
var join = require('path').join;
var fs = require('fs');
var Photo = require('../models/Photo');

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

// router.use()

router.get('/', function(req, res, next) {
	Photo.find({}, function(err, photos){
		if(err) return next(err);
		
		res.render('photos', {
			title: 'Photos',
			photos: photos
		});
	});
	
});

router.get('/upload', function(req, res, next) {
	res.render('photos/upload', {
		title: 'Photo upload'
	});
});

router.get('/photo/:id/download', function(req, res, next) {
	var id = req.params.id;
	Photo.findById(id, function(err, photo) {
		if(err) return next(err);
		console.log(__dirname);
		var path = join(req.app.get('photos'), photo.name);

		//res.sendFile(path);		// 传输文件
		res.download(path);
	});
});

router.post('/upload', submit());

function submit() {
	return function(req, res, next) {
		var type = req.headers['content-type'] || '';
		if(type.indexOf('multipart/form-data') === 0) {
  			var form = new formidable.IncomingForm();
  			form.parse(req, function(err, fields, files){
  				var path = join(req.app.get('photos'), fields['photo_name']);
				

				fs.rename(files['photo_image'].path, path, function(err) {
					if(err) return next(err);

					Photo.create({
						name: fields['photo_name'],
						path: join('/photos', fields['photo_name'])
					}, function(err) {
						if(err) return next(err);
						// res.redirect('/');
						res.redirect('/photos');
					});
				})

  			});
			
		}
	}
}
module.exports = router;