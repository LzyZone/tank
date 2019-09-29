define(function(require, exports, module){
	var canvasWidth,canvasHeight,canvas,ctx,bulletShotMusic;
	var $ = require('jquery');
	var tools = require('tools');
	var audioOb = require('audio');
	var debugOb = require('debug');
	var debug = new debugOb();

	var tankGlobal;
	var bulletFlag = false;
	canvas = document.getElementById('canvas');
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;

	ctx = canvas.getContext('2d');
	//var tankOb = require('../js/tank');

	var heroOb = require('hero');
	var enemyOb = require('enemy');



	//var bulletOb = require('bullet');
	//英雄坦克
	var hero  = new heroOb({'x':300,'y':300});
	//敌人坦克数组
	var enemyTanks = new Array();
	//敌人坦克数量
	var enemySize = 6;
	for(var i=0;i<enemySize;i++){
		enemyTanks[i]  = new enemyOb({'x':(i+1)*80,'y':30,'color':'#0A9696','direction':Math.floor(Math.random()*3+1)});
	}
	//子弹连发数
	var bulletRunFire = 2;
	//子弹数组
	var bulletArray;
	bulletArray = new Array();
	//全局变量
	window.bulletArray  = bulletArray;
	window.canvasWidth = canvasWidth;
	window.canvasHeight = canvasHeight;

	//事件监听
	keyEventListener();


	var explodeOb = require('explode');
	var explode = new explodeOb({'ctx':ctx,'imgSrc':'src/img/explode.png'});



	var FPS = 100;
	//定时器
	setInterval(function(){
		flashTankMap();
	},FPS);


	function flashTankMap(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var i=0;i<tools.countArray(enemyTanks);i++){
			//enemyTanks[i]  = new enemyOb({'x':(i+1)*80,'y':30,'color':'#0A9696','direction':2});

			///绘制敌人坦克
			drawTank(enemyTanks[i]);
			//敌人坦克的移动
			enemyTanks[i].Move();
			//随机变换方向
		}
		debug.showEnemyXY(enemyTanks);
		//绘制英雄坦克
		drawTank(hero);
		//绘制炮弹
		drawBullet(bulletArray);
		//检测子弹是否击中
		checkBulletHit(hero,enemyTanks,bulletArray);

		//drawExplode(explode);
	}


	//tank.draw();*/
	//绘制坦克
	function drawTank(tank){
			//this.ctx.save();
	  		ctx.fillStyle = tank.color;
			switch(tank.direction){
				case 0:
				case 2:
					//坦克轮子
					ctx.fillRect(tank.x,tank.y,tank.wheelWidth,tank.wheelHeight);
					//坦克轮子
					ctx.fillRect(tank.x+10+30+tank.tankPx*2,tank.y,tank.wheelWidth,tank.wheelHeight);
					//中间框
					ctx.fillRect(tank.x+10+tank.tankPx,tank.y+10,30,30);

					//圆盖
					ctx.beginPath();
					ctx.fillStyle = tank.strokeColor;
					ctx.arc(tank.x+25,tank.y+25,10,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();

					//炮筒
					ctx.beginPath();
					ctx.strokeStyle = tank.color;
					ctx.moveTo(tank.x+25,tank.y+25);
					if(tank.direction == 0){
						ctx.lineTo(tank.x+25,tank.y);
					}else{
						ctx.lineTo(tank.x+25,tank.y+50);
					}

					ctx.closePath();
					ctx.stroke(); // 进行绘制
					break;
				case 1:
				case 3:
					//坦克轮子
					ctx.fillRect(tank.x,tank.y,tank.wheelHeight,tank.wheelWidth);
					//坦克轮子
					ctx.fillRect(tank.x,tank.y+10+30+tank.tankPx*2,tank.wheelHeight,tank.wheelWidth);
					//中间框
					ctx.fillRect(tank.x+10,tank.y+10+tank.tankPx,30,30);

					//圆盖
					ctx.beginPath();
					ctx.fillStyle = tank.strokeColor;
					ctx.arc(tank.x+25,tank.y+25,10,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();

					//炮筒
					ctx.beginPath();
					ctx.strokeStyle = tank.color;
					ctx.moveTo(tank.x+25,tank.y+25);
					if(tank.direction == 1){
						ctx.lineTo(tank.x+50,tank.y+25);
					}else{
						ctx.lineTo(tank.x,tank.y+10+15);
					}

					ctx.closePath();
					ctx.stroke(); // 进行绘制
					break;
			}

	}

	//绘制子弹
	function drawBullet(bulletArray){
		var bullet;
		for(var bkey in bulletArray){
			bullet = bulletArray[bkey];
			//画布边界检测
			if(bullet.y <= 0 || bullet.x <= 0 || bullet.y >= canvas.height || bullet.x >= canvas.width){
				bulletArray.splice(bkey,1);
				return;
			}
			ctx.fillRect(bullet.x,bullet.y,bullet.size,bullet.size);
			//确定子弹方向
			if(bullet.direction == 0){
				bullet.moveUp();
			}else if(bullet.direction == 1){
				bullet.moveRight();
			}else if(bullet.direction == 2){
				bullet.moveDown();
			}else if(bullet.direction == 3){
				bullet.moveLeft();
			}

			debug.showBulletXY(bullet.x,bullet.y);
		}


		//$("#bulletx").text(bullet.x);
		//$("#bullety").text(bullet.y);
	}

	//绘制爆炸
	function drawExplode(x,y){
		if(explode.flag) return;
		explode.cutImgHeight = explodeObje.height/explode.frame;
			ctx.drawImage(explodeObje,0,0+(explode.i*explode.cutImgHeight),explode.cutImgWidth,explode.cutImgHeight,x,y,explode.imgWidth,explode.imgHeight);
			if(explode.i < explode.frame){
				explode.i++
			}else if(explode.i == explode.frame){
				explode.i = 0;
				explode.j = 1;
				explode.flag = true;
			}

	}

	//检测碰撞
	//bulletArray.splice(b,1);
	//enemyTanks.splice(e,1);
	//return;
	function checkBulletHit(hero,enemyTanks,bulletArray){
		if(tools.countArray(bulletArray) > 0){
			for(var b in bulletArray){
				for(var e in enemyTanks){
					if(
						bulletArray[b].x >= enemyTanks[e].x &&
						bulletArray[b].x <= enemyTanks[e].x + enemyTanks[e].getTankHeight() &&
						bulletArray[b].y >= enemyTanks[e].y &&
						bulletArray[b].y <= enemyTanks[e].y + enemyTanks[e].getTankWidth()
					){
						var x = enemyTanks[e].x;
						var y = enemyTanks[e].y;
						var eWidth = enemyTanks[e].getTankWidth();
						var wHeight = enemyTanks[e].getTankHeight();
						bulletArray.splice(b,1);
						enemyTanks.splice(e,1);

						ctx.clearRect(x,y,eWidth,wHeight);

						explode.x = x;
						explode.y = y;
						startBoom(explode,0,0,0);
						var audioExplode = new audioOb();
						audioExplode.payHitETankAudio();
						audioExplode = null;
						return;
					}
				}
			}
		}
	}

		//开始爆炸
		function startBoom(explode,cx,cy,i){
			explode.draw(cx,cy,i);
			var f = 1;
			var timeExplode = setInterval(function(){
				explode.draw(0,0,f);
				if(f < explode.frame){
					f++;
				}else{
					ctx.clearRect(explode.x,explode.y,explode.imgWidth,explode.imgHeight);
					clearInterval(timeExplode);
				}
			},50);
		}


	//监听键盘事件
	function keyEventListener(){
		document.onkeydown=function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			/**
			up:38
			right:39
			down:40
			left:37
			w:87
			d:68
			s:83
			a:65
			*/
			if(e){
				switch(e.keyCode){
					case 38 :
					case 87 :
						if(hero.y > 0)
							hero.moveUp();
						break;
					case 39 :
					case 68 :
						if(hero.x+hero.getTankWidth() < canvas.width)
							hero.moveRight();
						break;
					case 40 :
					case 83 :
						if(hero.y+hero.getTankHeight() < canvas.height)
							hero.moveDown();
						break;
					case 37 :
					case 65 :
						if(hero.x > 0)
							hero.moveLeft();
						break;
					case 32://空格键，发射炮弹
						//创建炮弹
						explode.flag = false;
						hero.shotBullet();
				}

			}

		}

		document.onkeyup=function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];

			if(e){
				switch(e.keyCode){
					case 32:
				}
			}

		}
	}


	function preImage(url,callback){
	     var img = new Image(); //创建一个Image对象，实现图片的预下载
	     img.src = url;

	    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
	         callback.call(img);
	        return; // 直接返回，不用再处理onload事件
	     }

	     img.onload = function () { //图片下载完毕时异步调用callback函数。
	         callback.call(img);//将回调函数的this替换为Image对象
	     };
	}

});
