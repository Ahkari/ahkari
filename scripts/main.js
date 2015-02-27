//jQuery的mousewheel方法监听滚轮事件

/*
jQuery(function($){
	var bodyPosition=0;
	console.log(document.body.scrollHeight);
	$(document).bind('mousewheel',function(event,delta){
		// var dir=delta>0?'up':'Down',
		// 	vel=Math.abs(delta);
			var winHeight=window.document.body.clientHeight;	 
			var pageHeight=document.body.scrollHeight;	
			if (delta<0) {
				// alert(winHeight);
				// $("body").scrollTop(winHeight);
				
				if ((bodyPosition+winHeight)>pageHeight){
				}else{
				bodyPosition+=winHeight;
				console.log(bodyPosition);
				$("body").scrollTop(bodyPosition);
				}
			}
			else if(delta>0){
				if ((bodyPosition-winHeight)<0){
				}else{
				bodyPosition-=winHeight;
				console.log(bodyPosition);
				$("body").scrollTop(bodyPosition);
				}
			}
			return false;
	});
});   */

// div class="wrapper" style="transform: translate3d(0px, -843px, 0px); transition: all 1000ms cubic-bezier(0.86, 0, 0.07, 1) 0s;"
// $(".btn1").click(function(){
//   $("p").css("color","red");
// });

jQuery(function($){
	console.log(document.body.scrollHeight);
	var animeState="none";
	var pageIndex=1;
	$(document).bind('mousewheel',function(event,delta)
		{
		var $pageActive=null;
		var pageIndexName=null;
		console.log(animeState);
		console.log(pageIndex);
		var winHeight=window.document.body.clientHeight;
		//当前木有动画
		if (animeState=="none")
		{	
			// 这是识别出了向下滚！且允许向下滚
			if (delta<0&&pageIndex<5) 
			{
				function downAnime(){
					var animeHeight="-="+winHeight.toString()+"px";	
					$("#allWrapper").animate({
						top:animeHeight
					},"slow",function(){
						pageIndex+=1;
						$pageActive=$("#allWrapper section:nth-child("+pageIndex+")");
						pageIndexName=$pageActive.attr("id");
						console.log(pageIndexName);
						animeState="none";});
					videoStop();
				}
				setTimeout(downAnime,400);
				animeState="doing";
			}
			//识别出了向上滚！且允许向上滚
			else if(delta>0&&pageIndex>1)
			{
				function upAnime(){
					var animeHeight="+="+winHeight.toString()+"px";	
					$("#allWrapper").animate({
						top:animeHeight
					},"slow",function(){
						pageIndex-=1;
						$pageActive=$("#allWrapper section:nth-child("+pageIndex+")");
						pageIndexName=$pageActive.attr("id");
						console.log(pageIndexName);
						animeState="none";});
					videoStop();
				}
				setTimeout(upAnime,400);
				animeState="doing";
			}
			return false;
		}
		// 有动画那就滚粗
		else
		{
			return false;
		}
	});
});