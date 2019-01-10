
function Game (Map, Snake, Food, Block) {
	this.map = Map;
	this.snake = Snake;
	this.food = Food;
	this.block = Block;
	this.timer = null;
	this.flag = null;
	this.init();
} 

Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderBlock();
	this.start();
	this.bindEvent();

}

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	// 取二维数组
	// this.map.arr[row][col].style.backgroundColor = "red";

	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}
// 渲染蛇
Game.prototype.renderSnake = function() {
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length -1];
	// 设置头部图片
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";

	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// 渲染蛇
		// this.map.arr[]
		// this.map.arr[row][col].style.backgroundColor = "green";
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}

	// 渲染尾部图片
	var tail = this.snake.arr[0];

	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}
// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
	var me = this;

	this.timer = setInterval(function() {
		me.snake.move();
		console.log(1);
		me.checkSnake();
		me.checkFood();

		me.checkEatself();
		me.checkBlock();
		if (me.flag) {
			// 先清屏
		me.map.clear();
		// 渲染蛇
		me.renderSnake();
		// 渲染食物
		me.renderFood();
		// 渲染障碍物
		me.renderBlock();

		}
		
	}, 400)
}

// 绑定键盘事件..

Game.prototype.bindEvent = function() {
	var me = this;
	document.onkeydown = function(e) {
		var code = e.keyCode;
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			me.snake.direction = code;
		}
	}
}
Game.prototype.gameOver = function() {

	this.flag = false;
	clearInterval(this.timer);
}

// 检测蛇是否撞到墙的方法
Game.prototype.checkSnake = function() {
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 然后跟map的arr的行列比较 撞墙则执行gameover（）方法；
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		console.log("撞到墙");
		this.gameOver();
	}
}

// 检测是否吃到食物
Game.prototype.checkFood = function() {
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物
	var food = this.food;
	// 判断蛇头和食物的位置是否重叠
	if (head.row === food.row && head.col === food.col) {
		// 蛇变长
		this.snake.grow();
		// 重置食物
		this.resetFood();
	}
}
// 重置食物
Game.prototype.resetFood = function() {
	// 随机生成row和col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	// 循环蛇的每一节身体
	for(var i = 0; i < this.snake.arr.length; i++) {
		var one = this.snake.arr[i];
		if (one.row === row && one.col === col) {
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col);
}

// 蛇吃自己
Game.prototype.checkEatself = function() {
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环检测蛇的每一节是否与头部重合
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("eat itself");
			this.gameOver();
		}
	}
}

// 渲染障碍物
Game.prototype.renderBlock = function() {
	// 渲染一条不会动的蛇
	for (var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col; 

		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}

}


// 检测蛇是否撞到障碍物
Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 蛇头跟block的每一项进行比较
	for (var i = 0; i < this.block.arr.length; i ++) {
		var one = this.block.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("撞到障碍物");
			this.gameOver();
		}
	}

}