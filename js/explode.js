define(function(require, exports, module){
	  function Explode(para) {
	    this.x = 100;
	    this.y = 100;
	    this.j = 1;
	    this.i = 4;
	    this.imgSrc = null;
	    this.cutImgWidth = 160;
	    this.cutImgHeight = 160;
	    this.imgWidth = 50;
	    this.imgHeight = 50;
	    this.flag = false;
	    this.ctx = null;
	    this.imgObj = null;
	    //爆炸帧数
	    this.frame = 5;

	    for(var p in para){
	    	if(this.hasOwnProperty[p] || para[p] != undefined){
				this[p] = para[p];
	    	}
	    }

	    if(this.imgSrc != null && this.imgObj != null){
			//this.imgObj.src = this.imgSrc;
		}

	  }

	module.exports = Explode;

	Explode.prototype.runExplode = function(){

	}

	Explode.prototype.startBoom = function(cx,cy,i){
		this.draw(cx,cy,i);
		var f = 1;
		var timeExplode = setInterval(function(){
			Explode.draw(0,0,f);
			if(f < explode.frame){
				f++;
			}else{
				this.ctx.clearRect(this.x,this.y,this.imgWidth,this.imgHeight);
				clearInterval(timeExplode);
			}
		},50);
	}


	//绘制爆炸
	Explode.prototype.draw = function(cx,cy,i){
		var ctx = this.ctx
		var x = this.x;
		var y = this.y;
		var frame = this.frame;
		var imgWidth = this.imgWidth;
		var imgHeight = this.imgHeight;
		var cutX = cx;
		var cutY = cy;
		this._preImage(this.imgSrc,function(){
			var cutWidth = this.width/frame;
			var cutHeight = this.height/frame;
			cutY = cutY+(cutHeight*i);
			ctx.drawImage(this,cutX,cutY,cutWidth,cutHeight,x,y,imgWidth,imgHeight);
		});
	}

	Explode.prototype._preImage = function(url,callback){
		if(url != null){
		     var imgObj = new Image(); //创建一个Image对象，实现图片的预下载
		     imgObj.src = url;

		    if (imgObj.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
		         callback.call(imgObj);
		        return; // 直接返回，不用再处理onload事件
		     }

		     imgObj.onload = function () { //图片下载完毕时异步调用callback函数。
		         callback.call(imgObj);//将回调函数的this替换为Image对象
		     };
		}

	}


});