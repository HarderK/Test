var qs = require('querystring');

// 发送HTML响应
exports.sendHtml = function(res, html) {
	res.setHeader('Content-Type', 'text/html; charset="utf8"');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
};

// 解析HTTP POST数据
exports.parseReceivedData = function(req, cb) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk) {
		body += chunk;
	});
	req.on('end', function() {
		var data = qs.parse(body);
		cb(data);
	})
};

// 渲染简单的表单
exports.actionForm = function(id, path, label) {
	var html = `<form action="${path}" method="POST">
		<input type="hidden" name="id" value="id" />
		<input type="submit" value="label" />
	</form>`;
};

// 用mysql添加数据
exports.add = function(db, req, res) {
	exports.parseReceivedData(req, function(word){
		db.query(`INSERT INTO work (hours, date, description) values (?, ?, ?)`, [work.hours, work.date, work.description], function(err) {
			if(err) throw err;
			exports.show(db, res);
		} );
	});
};



// 获取工作记录
exports.show = function(db, res, showArchived) {
	var query = "SELECT * FROM work WHERE archived=? ORDER BY date DESC";

	var archiveValue = (showArchived) ? 1 : 0;
	db.query(query, [archiveValue], function(err, rows){
		if (err) throw err;

	});

};

exports.workHitlistHtml = function(rows) {
	var html = '<table>';
	for (var i in rows) {
		html += `<tr>
			<td>${rows[i].date}</td>
			<td>${rows[i].hours}</td>
			<td>${rows[i].description}</td>
			${rows[i].archived ? '' : '' }
		</tr>`;
	}
}


