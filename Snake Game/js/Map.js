function Map (row, col, width, height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	this.arr = [];
	// 创建地图容器 body
	this.dom = document.createElement("div");
}
Map.prototype.fill = function() {
	// 创建行
	for (var j = 0; j < this.row; j++) {
		// 创建行容器
		var row_dom = document.createElement("div");
		// 创建数组
		var arr_row = [];
		// 添加类名
		row_dom.className = "row";
		for (var i = 0; i < this.col; i++) {
			// 创建小方格
			var col_dom = document.createElement("span");
			// 给小方格添加类名
			col_dom.className = "grid";
			// 上树到row_dom
			row_dom.appendChild(col_dom);
			// 将coldom放到arrrow数组中
			arr_row.push(col_dom);
		}
		// 行上树
		this.dom.appendChild(row_dom);
		// arr数组添加行
		this.arr.push(arr_row);
		// 添加类名
		this.dom.className = "box";

	}
	document.body.appendChild(this.dom);
} 

// 清屏方法

Map.prototype.clear = function() {
	for (var i = 0; i < this.arr.length; i++) {
		for (var j = 0; j < this.arr.length; j++) {
			// this.arr[i][j].style.backgroundColor = "white";
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}