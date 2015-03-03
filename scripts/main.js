// 全局变量pageIndex和pageIndexName，用来记录当前页面位置。
var pageIndex=1;
var pageIndexName=null;

jQuery(function($){
	// console.log(document.body.scrollHeight);
	
	$(document).bind('mousewheel',function(event,delta)
		{
		var $pageActive=null;
		// var pageIndexName=null;
		var winHeight=window.document.body.clientHeight;
		//css动画运行中
		// 取得下个页面信息
		function valueDowm(){
			pageIndex+=1;
			$pageActive=$("#allWrapper section:nth-child("+pageIndex+")");
			pageIndexName=$pageActive.attr("id");
			// console.log(pageIndexName);
		}
		//取得上个页面信息
		function valueUp(){
			pageIndex-=1;
			$pageActive=$("#allWrapper section:nth-child("+pageIndex+")");
			pageIndexName=$pageActive.attr("id");
			// console.log(pageIndexName);
		}
		// 根据页面信息执行该页面对应的事件
		function myPageLoad(pageName){
			switch(pageName){
				case "countingWave-wrap":
					return countingWaveLoadEvent();
				case "triggerFinger-wrap":
					return triggerFingerLoadEvent();
				case "story-wrap":
					return storyLoadEvent();
				case "beautifulWorld-wrap":
					return beautifulWorldLoadEvent();
				case "attackOnTitan-wrap":
					return attackOnTitanLoadEvent();	
			}
		}

		//当前木有动画
		if (!$("#allWrapper").is(":animated"))
		{	
			// 这是识别出了向下滚！且允许向下滚
			if (delta<0&&pageIndex<5) 
			{
				function downAnime(){
					valueDowm();
					myPageLoad(pageIndexName);
					var animeHeight="-="+winHeight.toString()+"px";	
					$("#allWrapper").animate({
						top:animeHeight
					},500,"easeOutCubic");
					videoStop();
				}
				downAnime();
			}
			//识别出了向上滚！且允许向上滚
			else if(delta>0&&pageIndex>1)
			{
				function upAnime(){
					valueUp();
					myPageLoad(pageIndexName);
					var animeHeight="+="+winHeight.toString()+"px";	
					$("#allWrapper").animate({
						top:animeHeight
					},500,"easeOutCubic");
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