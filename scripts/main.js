jQuery(function($){
	// console.log(document.body.scrollHeight);
	var pageIndex=1;
	$(document).bind('mousewheel',function(event,delta)
		{
		var $pageActive=null;
		var pageIndexName=null;
		var winHeight=window.document.body.clientHeight;
		//css动画运行中
		


		//当前木有动画
		if (!$("#allWrapper").is(":animated"))
		{	
			// 这是识别出了向下滚！且允许向下滚
			if (delta<0&&pageIndex<5) 
			{
				function downAnime(){
					var animeHeight="-="+winHeight.toString()+"px";	
					$("#allWrapper").animate({
						top:animeHeight
					},500,"easeOutCubic",function(){
						pageIndex+=1;
						$pageActive=$("#allWrapper section:nth-child("+pageIndex+")");
						pageIndexName=$pageActive.attr("id");
						console.log(pageIndexName);});
					videoStop();
				}
				downAnime();
			}
			//识别出了向上滚！且允许向上滚
			else if(delta>0&&pageIndex>1)
			{
				function upAnime(){
					var animeHeight="+="+winHeight.toString()+"px";	
					$("#allWrapper").animate({
						top:animeHeight
					},500,"easeOutCubic",function(){
						pageIndex-=1;
						$pageActive=$("#allWrapper section:nth-child("+pageIndex+")");
						pageIndexName=$pageActive.attr("id");
						console.log(pageIndexName);});
					videoStop();
				}
				upAnime();
			
			}
			return false;
		}
		// 有动画那就滚粗
		else
		{
			return false;
	




		};
	});	//mouseover
});