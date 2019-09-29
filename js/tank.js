define(function(require, exports, module){
	  function Tank(para) {
	    this.x = 20;
	    this.y = 20;
	    //坦克速度
	    this.speed = 5;
	    /*坦克方向
	    [
			0 : 上
			1 : 右
			2 : 下
			3 : 左
	    ]*/
	    this.direction = 0;
		//坦克轮子宽度
	    this.wheelWidth = 10;
	    //坦克轮子高度
	    this.wheelHeight = 50;

	    this.centWidth = 30;
	    this.centHeight = 30;

		//轮子的间隙
		this.tankPx = 1;

		this.bulletSpeed = 10;
		this.bulletX = 0;
		this.bulletY = 0;

	    this.width = 30;
	    this.height = 20;
	    this.color = '#EFDC1D';
	    this.strokeColor = '#F4EC9F';

	    for(var p in para){
	    	if(this.hasOwnProperty[p] || para[p] != undefined){
				this[p] = para[p];
	    	}
	    }

		  this.moveUp = function(){
			this.y -= this.speed;
			this.direction = 0;
		  }

		  this.moveRight = function(){
			this.x += this.speed;
			this.direction = 1;
		  }

		  this.moveDown = function(){
			this.y += this.speed;
			this.direction = 2;
		  }

		  this.moveLeft = function(){
			this.x -= this.speed;
			this.direction = 3;
		  }

		  this.setXY = function(x,y){
			this.x = x;
			this.y = y;
		  }

		  this.setX = function(x){
			this.x = x;
		  }

		  this.setY = function(y){
			this.y = y;
		  }

		  this.getTankWidth = function(){
			return (this.wheelWidth*2 + this.centWidth)+(this.tankPx*2);
		  }

		  this.getTankHeight = function(){
			return (this.wheelHeight);
		  }

		  this.getTankPaoXY = function(){
				if(this.direction == 0){
					return {'x':this.x+25,'y':this.y,'direction':this.direction};
				}else if(this.direction == 1){
					return {'x':this.x+50,'y':this.y+25,'direction':this.direction};
				}else if(this.direction == 2){
					return {'x':this.x+25,'y':this.y+50,'direction':this.direction};
				}else if(this.direction == 3){
					return {'x':this.x,'y':this.y+25,'direction':this.direction};
				}
		  }

		  //发射炮弹
		  this.shotBullet = function(){
			//创建子弹
			var bulletOb = require('bullet');
			var tools = require('tools');
			var audioOb = require('audio');
			var audio = new audioOb();

			//限制发射的炮弹数
			if(tools.countArray(bulletArray) < 2){
				audio.payBulletShotAudio();
				var bulletPara = {'x':this.getTankPaoXY().x,'y':this.getTankPaoXY().y,'direction':this.direction};
				//创建炮弹到数组
				bulletArray.push(new bulletOb(bulletPara));
			}

			audio = null;
		  }

	  }

	module.exports = Tank;

});