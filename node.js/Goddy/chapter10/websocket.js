var websocket = function(url) {
	this.options = parseUrl(url);
	this.connect();
};

WebSocket.prototype.onopen = function() {

}

WebSocket.prototype.setSocket = function(socket) {
	this.socket = socket;
}

var options = {
	port: this.options.port,
	host: this.options.hostname,
	headers: {
		'Connection': 'Upgrade',
		'Upgrade': 'Websocket',
		'Sec-Websocket-Version': this.options.protocolVersion,
		'Sec-Websocket-key': key
	}
}