define(function(require, exports, module){
	  function Bullet(para) {
	  	this.speed = 30;
	  	this.x = 0;
	  	this.y = 0;
	  	this.size = 1;
		this.direction = 0;
		//子弹类型，0--英雄子弹，1--敌人子弹
		this.type = 0;

		for(var p in para){
	    	if(this.hasOwnProperty[p] || para[p] != undefined){
				this[p] = para[p];
	    	}
	    }

	  	this.move = function(){

	  	}

	  	this.setX = function(x){
	  		this.x = x;
	  	}

	  	this.moveUp = function(){
			this.y -= this.speed;
	  	}

	  	this.moveRight = function(){
			this.x += this.speed;
	  	}

	  	this.moveDown = function(){
			this.y += this.speed;
	  	}

	  	this.moveLeft = function(){
			this.x -= this.speed;
	  	}

	  }

	module.exports = Bullet;

});