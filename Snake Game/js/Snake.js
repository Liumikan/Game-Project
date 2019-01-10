function Snake(pic_obj) {
	// 定义一个数组存放蛇的身体
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		{row: 4, col: 7},
		{row: 4, col: 8}
	];
	// 方向属性 left 37  top 38 right 39 bottom 40
	this.direction = 39;
	this.lock = true;

	// 定义图片
	this.head_pic = pic_obj.head_pic;
	this.body_pic = pic_obj.body_pic;
	this.tail_pic = pic_obj.tail_pic;

	// 定义头部图片索引 索引值的定义
	this.head_idx = 2;
	this.tail_idx = 0;
}

// 蛇的移动
Snake.prototype.move = function() {
	// 创建新头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	// 判断蛇头的方向  从而决定蛇头出现的位置
	if (this.direction == 37) {
		// 行不变 列--
		newHead.col--;
	} else if (this.direction == 38) {
		// 列不变，行--
		newHead.row--;
	} else if (this.direction == 39) {
		// 行不变 列++
		newHead.col++;
	} else if (this.direction == 40) {
		// 列不变 行++
		newHead.row++;
	}
	// 将头部push进数组最后一项
	this.arr.push(newHead);
	// 删除尾部=数组第一项，shift（）
	this.arr.shift();
	// 开锁
	this.lock = true;

	// 移动时候更改尾部图片
	this.tail = this.arr[0];
	this.mae = this.arr[1];

	//  判断tail 与 mae之间的关系
	if (this.tail.row === this.mae.row) {
		// 说明是在同一行， 比较列的关系
		this.tail_idx = this.tail.col > this.mae.col ? 2 : 0;
	} else {
		// 说明在同一列， 比较行的关系
		this.tail_idx = this.tail.row > this.mae.row ? 3 : 1;
	}
}

// 改变蛇的转向
Snake.prototype.change = function (direction) {
	// 节流
	if (!this.lock) {
		return;
	}
	// 关锁:如果该函数还没执行完就又调用 lock是false 直接return不执行change()
	this.lock = false;

	// 改变direction
	var result = Math.abs(direction - this.direction);
	// 判断
	if (result === 2 || result === 0) {
		return;
	} else {
		this.direction = direction;
	}

	// 在change的时候改变蛇转向的方法
	if (direction === 37) {
		this.head_idx = 0;
	} else if (direction === 38) {
		this.head_idx = 1;
	} else if (direction === 39) {
		this.head_idx = 2;
	} else if (direction === 40) {
		this.head_idx = 3;
	}

}

// 蛇变长
Snake.prototype.grow = function() {
	// 获取尾部
	var tail = this.arr[0];
	// 将tail添加到arr的第一项
	this.arr.unshift(tail);
}