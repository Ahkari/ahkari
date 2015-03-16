var videoStatement=0;

function videoStart(wrapName){
	videoStatement=1;
	$("#"+wrapName+" .clickWrap").css('display','block');
}
function videoStop(){
	videoStatement=0;
	$(".clickWrap").css('display','none');
}

$(document).ready(function(){
	// var videoStatement=0;
	$("#triggerFinger-wrap").bind("click",function(){
		// alert(123);
		if (!videoStatement){
			videoStart("triggerFinger-wrap");			
		}
		else{
			videoStop("triggerFinger-wrap");
		}
	});

	$("#story-wrap").on("click",function(){
		if(!videoStatement){
			videoStart("story-wrap");
		}
		else{
			videoStop("story-wrap");
		}
	});
	// $("#clickWrap").bind("click",function(){
	// 	$("#clickWrap").css('display','none');
	// });

	function setLeftandHeight(){
		var clientWidth=document.documentElement.clientWidth;
		var clientHeight=document.documentElement.clientHeight;
		var left=(clientWidth-700)/2+"px";
		// var top=(clientHeight-500)/2+"px";
		// console.log(clientWidth);
		// console.log(clientHeight);
		// console.log(left);
		// console.log(top);
		$(".videoInset").css("left",left);
		// $(".videoInset").css("top",top);
	};
	setLeftandHeight();

	// alert(123);
});

// document.documentElement.clientWidth ==> 可见区域宽度
// document.documentElement.clientHeight ==> 可见区域高度 













