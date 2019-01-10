function Game(pen, bird, pipe, land, mountain) {
	this.pen = pen;
	this.bird = bird;
	this.pipeArr = [pipe];
	this.land = land;
	this.mountain = mountain;
	this.timer = null;
	// 定义帧用来减缓定时器的运行 
	this.iframe = 0;
	this.init();
}
Game.prototype.init = function() {
	this.start();
	this.bindEvent();
}
Game.prototype.start = function() {
	var that = this;
	// 定义一个定时器
	this.timer = setInterval(function () {
		that.iframe ++;
		// 清屏
		that.clear();
		// 渲染背景
		that.renderMountain();
		that.renderLand();
		// 渲染鸟
		that.renderBird();
		// 管子移动
		that.movePipe();
		that.renderPipe();

		// 0，10，10的倍数可以进入if语句 频率降低
		if (!(that.iframe % 10)) {
			that.bird.fly();
		}

		that.bird.fellDown();

		if (!(that.iframe % 63)) {
			that.createPipe();
		}
		that.clearPipe();

		that.renderBirdPoints();
		that.renderPipePoints();
		that.renderLandPoint();

		that.checkBoom();

	}, 20)

}
// 绑定事件方法
Game.prototype.bindEvent = function() {
	var that = this;
	this.pen.canvas.onclick = function() {
		that.bird.goUp();
	}
}

// 渲染远山
Game.prototype.renderMountain = function() {
	var img = this.mountain.img;
	this.mountain.x -= this.mountain.step;
	// 背景图片循环
	if (this.mountain.x === - img.width) {
		this.mountain.x = 0;
	}
	this.pen.drawImage(img, this.mountain.x, this.mountain.y);
	this.pen.drawImage(img, this.mountain.x + img.width, this.mountain.y);
	this.pen.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);
}
// 渲染地面
Game.prototype.renderLand = function() {
	var img = this.land.img;
	this.land.x -= this.land.step;
	// 背景图片循环
	if (this.land.x === -img.width) {
		this.land.x = 0;
	}
	// 原尺寸绘图
	this.pen.drawImage(img, this.land.x, this.land.y);
	this.pen.drawImage(img, this.land.x + img.width, this.land.y);
	this.pen.drawImage(img, this.land.x + img.width * 2, this.land.y);
}
// 渲染鸟
Game.prototype.renderBird = function() {
	var img = this.bird.img;
	// console.log(this.bird.x, this.bird.y);
	// 保存状态
	this.pen.save();
	// 平移坐标系 translate（x，y）x固定100，y一直在变大（下降）
	this.pen.translate(this.bird.x, this.bird.y);

	// 判断角度向上还是向下
	var deg = this.bird.state === "D" ? Math.PI / 180 * this.bird.speed : - Math.PI / 180 * this.bird.speed;
	this.pen.rotate(deg);
	this.pen.drawImage(img, -img.width / 2, -img.height / 2);
	this.pen.restore();
}

// 渲染管子
Game.prototype.renderPipe = function() {
	var that = this;
	this.pipeArr.forEach(function(value, index) {
	// 绘制上管子
	var img = value.pipe_up;
	// 截取图片的x，y定义位置
	var img_x = 0;
	var img_y = img.height - value.up_height;
	var img_w = img.width;
	var img_h = value.up_height;
	var canvas_x = that.pen.canvas.width - value.step * value.count;

	var canvas_y = 0;
	var canvas_w = img.width;
	var canvas_h = value.up_height;
	that.pen.drawImage(img, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h);


	// 绘制下管子
	var img_down = value.pipe_down;
	var img_down_x = 0;
	var img_down_y = 0;
	var img_down_w = img_down.width;
	var img_down_h = value.down_height;
	var canvas_down_x = that.pen.canvas.width - value.step * value.count;
	var canvas_down_y = value.up_height + 150;
	var canvas_down_w = img_down.width;
	var canvas_down_h = value.down_height;
	that.pen.drawImage(img_down, img_down_x, img_down_y, img_down_w, img_down_h, canvas_down_x, canvas_down_y, canvas_down_w, canvas_down_h);
	})
}

// 创建管子
Game.prototype.createPipe = function() {
	var pipe = this.pipeArr[0].createPipe();
	// 放入管子数组中
	this.pipeArr.push(pipe);
}
// 清理管子
Game.prototype.clearPipe = function() {
	// 判断管子的位置
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];
		if (pipe.x - pipe.step * pipe.count < - pipe.pipe_up.width) {
			this.pipeArr.splice(i, 1);
			return;
		}
	}
}
// 管子移动
Game.prototype.movePipe = function() {
	this.pipeArr.forEach(function(value, index) {
		value.count ++;
	})
}
// 碰撞检测
// 绘制鸟的4点 
Game.prototype.renderBirdPoints = function() {
	// 定义存放点信息的对象 ABCD
	var bird_A = {
		x: this.bird.x - this.bird.img.width / 2 + 6,
		y: this.bird.y - this.bird.img.height / 2 + 6
	}
	var bird_B = {
		x: bird_A.x + this.bird.img.width - 12,
		y: bird_A.y 
	}
	var bird_C = {
		x: bird_B.x,
		y: bird_B.y + this.bird.img.height - 12
	}
	var bird_D = {
		x: bird_A.x,
		y: bird_C.y
	}

	this.pen.beginPath();
	this.pen.moveTo(bird_A.x, bird_A.y);
	this.pen.lineTo(bird_B.x, bird_B.y);
	this.pen.lineTo(bird_C.x, bird_C.y);
	this.pen.lineTo(bird_D.x, bird_D.y);

	this.pen.closePath();
	// this.pen.strokeStyle = "blue";
	// this.pen.stroke();
}

// 绘制管子的8个点
Game.prototype.renderPipePoints = function() {

	// 循环绘制管子的8个点
	for (var i = 0; i < this.pipeArr.length; i ++) {

		var pipe = this.pipeArr[i];

		// 绘制上管子
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}
		var pipe_B = {
			x: pipe_A.x + pipe.pipe_up.width,
			y: 0
		}
		var pipe_C = {
			x: pipe_B.x,
			y: pipe.up_height
		}
		var pipe_D = {
			x: pipe_A.x,
			y: pipe_C.y
		}

		// 绘制点线
		this.pen.beginPath();
		this.pen.moveTo(pipe_A.x, pipe_A.y);
		this.pen.lineTo(pipe_B.x, pipe_B.y);
		this.pen.lineTo(pipe_C.x, pipe_C.y);
		this.pen.lineTo(pipe_D.x, pipe_D.y);
		this.pen.closePath();
		// this.pen.strokeStyle = "blue";
		// this.pen.stroke();

		// 绘制下管子
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 400 - pipe.down_height
		}
		var pipe_down_B = {
			x: pipe_down_A.x + pipe.pipe_down.width,
			y: pipe_down_A.y
		}
		var pipe_down_C = {
			x: pipe_down_B.x,
			y: 400
		}
		var pipe_down_D = {
			x: pipe_A.x,
			y: 400
		}

		// 绘制点线
		this.pen.beginPath();
		this.pen.moveTo(pipe_down_A.x, pipe_down_A.y);
		this.pen.lineTo(pipe_down_B.x, pipe_down_B.y);
		this.pen.lineTo(pipe_down_C.x, pipe_down_C.y);
		this.pen.lineTo(pipe_down_D.x, pipe_down_D.y);
		this.pen.closePath();
		// this.pen.strokeStyle = "blue";
		// this.pen.stroke();
	}
}
// 绘制地面的一个点
Game.prototype.renderLandPoint = function() {
	var land_A = {
		y: 400
	}
}

// 碰撞检测
Game.prototype.checkBoom = function() {
	for (var i = 0; i < this.pipeArr.length; i ++) {

		var pipe = this.pipeArr[i];
		// 绘制上管子
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count - 1,
			y: 0
		}
		var pipe_B = {
			x: pipe_A.x + pipe.pipe_up.width + 3,
			y: 0
		}
		var pipe_C = {
			x: pipe_B.x,
			y: pipe.up_height + 1
		}
		var pipe_D = {
			x: pipe_A.x,
			y: pipe_C.y
		}

		// 绘制下管子
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 400 - pipe.down_height
		}
		var pipe_down_B = {
			x: pipe_down_A.x + pipe.pipe_down.width,
			y: pipe_down_A.y
		}
		var pipe_down_C = {
			x: pipe_down_B.x,
			y: 400
		}
		var pipe_down_D = {
			x: pipe_A.x,
			y: 400
		}
		// 鸟的4个点
		var bird_A = {
			x: this.bird.x - this.bird.img.width / 2 + 5,
			y: this.bird.y - this.bird.img.height / 2 + 15
		}
		var bird_B = {
			x: bird_A.x + this.bird.img.width - 10,
			y: bird_A.y 
		}
		var bird_C = {
			x: bird_B.x,
			y: bird_B.y + this.bird.img.height - 25
		}
		var bird_D = {
			x: bird_A.x,
			y: bird_C.y
		}
		// 绘制地面的点
		var land_A = {
			y: 400
		}
		// 检测上管子
		if (bird_B.x >= pipe_A.x && bird_B.y <= pipe_D.y && bird_A.x <= pipe_B.x) {
			this.gameover();
			console.log("撞到上管子");
			return;
		}
		// 检测下管子
		if (bird_B.x >= pipe_down_A.x && bird_C.y >= pipe_down_A.y && bird_A.x <= pipe_down_B.x) {
			this.gameover();
			console.log("撞到下管子");
			return;
		}
		// 检测地面
		if (bird_C.y >= land_A.y) {
			this.gameover();
			console.log("撞到地面");
			return;
		}
	}
}
// 清屏
Game.prototype.clear = function() {
	this.pen.clearRect(0, 0, 360, 512);
}
// 
// 游戏结束
Game.prototype.gameover = function() {
	clearInterval(this.timer);
	// console.log("游戏结束");
}