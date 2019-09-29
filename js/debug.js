define(function(require, exports, module){
	var $ = require('jquery');
	function Debug(flag){
	}
	module.exports = Debug;

	Debug.prototype.showBulletXY = function(x,y){
		$("#bulletx").text(x);
		$("#bullety").text(y);
	}

	Debug.prototype.showEnemyXY = function(enemy){
		text = '';
		for(var e in enemy){
			text += "<p><span>敌坦X:</span><span>"+enemy[e].x+"</span></p>"
			+
			"<p><span>敌坦Y:</span><span>"+enemy[e].y+"</span></p>";

		}
		$("#enemyxy").html(text);
	}

});