var qs = require('querystring'),
	http = require('http');

var search = process.argv.slice(2).join(' ').trim();

if(search.length <= 0) {
	return console.log('\n Usage: node tweets <search item> \n');
}

console.log('\n searching for: \033[96m' + qs.stringify({q: search}) + '\033[39m\n');

http.request({
	host: 'twitter.com',
	path: '/search?' + qs.stringify({q: search})
}, function(res) {
	var body = '';

	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		body += chunk;
	});

	res.on('end', function() {
		var obj = JSON.parse(body);

		obj.results.forEach(function(tweet) {
			console.log(' \033[90m' + tweet.text + '\033[39m');
			console.log(' \033[94m' + tweet.from_user + '\033[39m');
			console.log('--');
		})
	})
}).end();