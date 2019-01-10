function Pipe(pipe_up, pipe_down, step, x) {
	this.pipe_up = pipe_up;
	this.pipe_down = pipe_down;
	// 定义上管子的高度
	this.up_height = parseInt(Math.random() * 240) + 10;
	this.down_height = 250 - this.up_height;
	this.step = step;
	this.x = x;
	this.count = 0;
}

Pipe.prototype.createPipe = function() {
	return new Pipe(this.pipe_up, this.pipe_down, this.step, this.x);
}