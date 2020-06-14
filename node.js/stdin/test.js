/*process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if(typeof chunk === 'string'){
    chunk = chunk.slice(0,-1);	// 将最后的huanh
    process.stdout.write(`stringLength:${chunk.length}\n`);
  }
  if(chunk === ''){
    process.stdin.emit('end');
    return
  }
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}\n`); 
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});

process.stdin.on('readable', () => {
	console.log(process.stdin.read())
})*/

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
		process.stdout.write(chunk);
	if(Number(chunk)) {
		process.stdout.write(chunk.slice(0, -1));
	} else {
		process.stdin.pause();
	}

})