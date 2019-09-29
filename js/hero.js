define(function(require, exports, module){
	  var tank = require('tank');
	  function Hero(para) {
		this.pTank = tank;
		this.pTank();

	  	 for(var p in para){
	    	if(this.hasOwnProperty[p] || para[p] != undefined){
				this[p] = para[p];
	    	}
	    }
	  }
	  module.exports = Hero;
});