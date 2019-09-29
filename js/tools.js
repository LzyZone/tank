define(function(require, exports, module){
	module.exports.countArray = function(arr){
		var n = 0;
		for(var i in arr){
			n++;
		}
		return n;
	}

});