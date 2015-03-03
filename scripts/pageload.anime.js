// 每页动画在这写
var countingWaveLoadEvent=function(){
	console.log(pageIndexName);
};
var triggerFingerLoadEvent=function(){
	console.log(pageIndexName);
	$(".storyBack").css("transform","scale(1.8)");
};


// story动画过程，两个场景。
var storyLoadEvent=function(){
	console.log(pageIndexName);
	function senceOne(){
		$(".storyBack").css("transform","scale(1.1)");

	}
	senceOne();


};
var beautifulWorldLoadEvent=function(){
	console.log(pageIndexName);
	$(".storyBack").css("transform","scale(1.8)");
};
var attackOnTitanLoadEvent=function(){
	console.log(pageIndexName);
};	



jQuery(function($){
	

}); //jquery