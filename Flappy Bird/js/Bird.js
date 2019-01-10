function Bird(imgArr, x, y) {
	this.imgArr = imgArr;
	// 精确到一张图片
	this.index = parseInt(Math.random() * imgArr.length);
	this.img = this.imgArr[this.index];
	this.x = x;
	this.y = y;
	this.state = "D";
	this.speed = 0;
}

// 该游戏中 鸟并不会前进，只是背景的移动和fly的效果让鸟看起来像在移动
// 扇动翅膀
Bird.prototype.fly = function(){
	// 改变图片的索引值
	this.index ++;
	if (this.index > this.imgArr.length - 1) {
		this.index = 0;
	}
	this.img = this.imgArr[this.index];
}
// 下落
Bird.prototype.fellDown = function() {
	// 判断鸟的状态
	if (this.state === "D") {
		this.speed++;
		this.y += Math.sqrt(this.speed);
	} else {
		this.speed--;
		// 在点击事件中需要判断speed是否为0
		if (this.speed === 0) {
			this.state = "D";
			return;
		}
		this.y -= Math.sqrt(this.speed);
	}
}
// 上升
Bird.prototype.goUp = function() {
	this.state = "U";
	// 改变speed
	this.speed = 20;
}