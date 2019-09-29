define(function(require, exports, module){
	function Audio(){
		//坦克发射炮弹声音
		this.audio =  document.createElement("audio");
	}

	module.exports = Audio;

	Audio.prototype.payBulletShotAudio = function(){
		this.audio.src = 'src/audio/bulletshot_.wav';
		this.audio.load();
		this.audio.play();
	}

	Audio.prototype.payHitETankAudio = function(){
		this.audio.src = 'src/audio/hittank.wav';
		this.audio.load();
		this.audio.play();
	}

	Audio.prototype.stop = function(){
		this.audio.stop();
	}


});