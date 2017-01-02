// 命令式
var makes = [];
for(i = 0; i < cars.length; i++ ){
	makes.push(cars[i].make);
}

// 声明式，关注的是做什么
var makes = cars.map(function(car) {
	return car.make;
});

// 命令式
var authenticate = function(form) {
	var user = toUser(form);
	return logIn(user);
};

// 声明式
var authenticate = compose(logIn, toUser);

var Impure = {
	getJSON: _.curry(function(callback, url) {
		$.getJSON(url, callback);
	}),

	setHtml: _.curry(function(sel, html) {
		$(sel).html(html);
	})
};

var url = function(term) {
	return 'https://api.flicker.com/services/feeds/photos_public.gne?tags=' + term;
};

var app = _.compose(Impure.getJSON(trace("response")), url);
app("cats");

var prop = _.curry(function(property, object) {
	return object[property];
});

var mediaUrl = _.compose(_.prop('m'), _.prop('media'));
var srcs = _.compose(_.map(mediaUrl), _.prop('items'));

var renderImages = _.compose(Impure.setHtml('body'), url);

var img = function(url) {
    return $('<img />', {src: url});
};

var images = _.compose(_.map(img), srcs);
var renderImages = _.compose(Impure.setHtml("body"), images);
var app = _.compose(Impure.getJSON(renderImages), url);

var mediaUrl = _.compose(_.prop('m'), _.prop('media'));

var images = _.compose(_.map(img), _.map(mediaUrl), _.prop('items'))

var images = _.compose(_.map(_.compose(img, mediaUrl)), _.prop('items'));

var mediaToImg = _.compose(img, mediaUrl);
var images = _.compose(_.map(mediaToImg), _.prop('items'));


