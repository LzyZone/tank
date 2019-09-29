define(function(require, exports, module){
	  var tank = require('tank');
	  function Enemy(para) {
		this.pTank = tank;
		this.pTank();

	  	 for(var p in para){
	    	if(this.hasOwnProperty[p] || para[p] != undefined){
				this[p] = para[p];
	    	}
	    }
	  }
	  module.exports = Enemy;

	  //敌人坦克随机移动
	  Enemy.prototype.Move = function(){
			switch(this.direction){
				case 0://向上
					if(this.y >=0){
						this.y -= this.speed;
					}else{
						this.changDirection();
					}
					break;
				case 1://向右
					if(this.x+this.wheelHeight <= canvasWidth){
						this.x += this.speed;
					}else{
						this.changDirection();
					}
					break;
				case 2://向下
					if(this.y+this.wheelHeight <= canvasHeight){
						this.y += this.speed;
					}else{
						this.changDirection();
					}
					break;
				case 3://向左
					if(this.x >=0){
						this.x -= this.speed;
					}else{
						this.changDirection();
					}
					break;

			}
	  }

	  Enemy.prototype.changDirection = function(){
	  		//this.y = this.y <= 0 ? 0 : this.y;
	  		//this.y = this.y >= canvasHeight ? canvasHeight : this.y;
	  		//this.x = this.x <= 0 ? 0 : this.x;
	  		//this.x = this.x >= canvasWidth ? canvasWidth : this.x;

			if(this.direction == 0){
				this.direction = this._RandomArray([1,2,3]);
			}else if(this.direction == 1){
				this.x = this.x+this.getTankHeight() > canvasWidth ? (canvasWidth-this.getTankHeight()) : this.x;
				this.direction = this._RandomArray([0,2,3]);
			}else if(this.direction == 2){
				this.y = this.y+this.getTankWidth() > canvasHeight ? (canvasHeight-this.getTankWidth()) : this.y;
				this.direction = this._RandomArray([0,1,3]);
			}else if(this.direction == 3){
				this.direction = this._RandomArray([0,1,2]);
			}
	  }

	   Enemy.prototype._RandomArray = function(array){
			var n = Math.floor(Math.random()*array.length + 1)-1;
			return (array[n]);
	  }



});