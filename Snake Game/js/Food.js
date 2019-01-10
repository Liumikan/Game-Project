function Food (x, y, img) {
	// 用行列方便分析
	this.row = x;
	this.col = y;
	this.img = img;
}

Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}