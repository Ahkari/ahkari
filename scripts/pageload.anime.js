// 全局变量
var rainDomCreateAnime;	//雨滴持续增加的动画参数。每一次使用前都需要先销毁。
var rainLayerTransAnime; //雨滴延时动画。每一次使用都需要先销毁。

// 每页动画在这写
var countingWaveLoadEvent=function(){
	console.log(pageIndexName);
};
var triggerFingerLoadEvent=function(){
	console.log(pageIndexName);
	$(".storyBack").css("transform","scale(1.8)");
	window.clearInterval(rainDomCreateAnime);

};


// story页面加载。
// 动画过程，两个场景。
var storyLoadEvent=function(){
	console.log(pageIndexName);
	// 先重置dom和动画们。
	$(".storyScenceTwo").css("display","none");
	$(".storyBackTwo").empty();
	$(".stroyBackTwoOver").empty();

	// 第一个场景，ajax请求页面，向其中添加雨滴，然后绑摄像机插件动画
	function senceOne(){
		$(".storyBack").css("transform","scale(1.1)");
		// 下面需要ajax请求到story_sence_one的html，然后生成水滴。
		$.ajax("./htm/story_sence_one.htm",{
				async:true,
				// complete:complete,
				dataType:"html",
				error:null,
				success:story.addRainDom,//addRainDom无需指定后面三个参数
				type:"get",
			}
		);
	}
	senceOne();

};
var beautifulWorldLoadEvent=function(){
	console.log(pageIndexName);
	$(".storyBack").css("transform","scale(1.8)");
	window.clearInterval(rainDomCreateAnime);

	// 这里使用个人插件fragmentFly，用于切割指定绑定了背景图像的元素，并对切割后的元素做视差动画。
	// 原型是beautiful.cutCard，写于15/3/18,插件同日开发。
	$("#beautifulTitle").fragmentFly({
		cut_dir:"x",	//x方向平均切割。
		ave_part:12,		//切割成12份
		rm_part:[2,5]	//Y方向最少有2块，最多有5块。随机
	},{
		anime_dir:"down",	//动画向下
		path:[200,450],	//动画最短300px，最长450px
		time:[1200,2000] //动画持续时间最短1500ms，最长2000ms
	});


};
var attackOnTitanLoadEvent=function(){
	console.log(pageIndexName);
};	

// 随机数生成函数，n为生成1-n的数
function getRandom(n){	
        return Math.floor(Math.random()*n+1)
        }




// stroy命名空间，内含story页面的专有操作函数。
var story={
	

	//生成七十个雨滴。
	addRainDom:function(data,textStatus,jqXHR){
		$(".storyBack").html(data);
		var rainDom;
		for (var i=0;i<70;i++){
			var thisWidth=getRandom(20)+10;//设定雨滴粒子大小在10-30之间
			rainDom+="<div id=\"obj"+i+"\" style=\"width:30px;height:30px\"><img src=\"./src/rain.png\" width=\""+thisWidth+"\" height=\""+thisWidth+"\" /></div>";
	
		}
		$("#sence_one").html(rainDom);
		// 下面为生成的水滴绑动画
		story.bindCameraAnime();

		window.clearInterval(rainLayerTransAnime);
		rainLayerTransAnime=setTimeout(story.whiteLayerTransform,2500);

	},
	// 给元素绑定动画，此处是摄像机插件。
	bindCameraAnime:function(){
		// 雨滴数组。
		var obejectArray=[];
		for(var i=0;i<70;i++){
			var eachObj={
				// "obj",
				// "x_position",
				// "y_position",
				// "z_position"
			};
			eachObj.obj="#obj"+i;
			eachObj.x_position=getRandom(1600);
			eachObj.y_position=getRandom(800);
			eachObj.z_position=getRandom(600);
			obejectArray.push(eachObj);
		};
		
		// ！！！！！使用俺自己做的插件来实现摄相机效果！！！！！
		$("#sence_one").camera3D(obejectArray,{
			mode: "once",
		    //相机的运动模式
		    x_position:"" ,
		    //相机初始位置（有效）
		    y_position: "1000px",
		    //相机初始位置（有效）
		    z_position: "800px",
		    //相机初始位置（非有效）
		    x_path: "0px",
		    //相机运动的X分量
		    y_path: "0px",
		    //相机运动的Y分量
		    z_path: "1800px",
		    //相机运动的Z分量（有效，但只完全支持static和once模式）
		    time: 3000 //相机运动的时间
		});

	},//bindCameraAnime:function()

	// 白场过渡
	whiteLayerTransform:function(){
		$(".whiteTransformLayer").css("opacity",1);
		setTimeout(insideWhiteLayerTransform,500);
		// $(".storyScenceTwo").css("display","block");

		function insideWhiteLayerTransform(){
			$(".storyScenceTwo").css("display","block");	//场景二出现
			story.createRainDrop(100);	//制造下雨，设为100个雨滴。
			
			$(".whiteTransformLayer").css("opacity",0);		//白场过渡
		}



	},	//whiteLayerTransform:function()

	//制造下雨，包括初始场景和单粒子增加的两个过程。
	createRainDrop:function(num){
		var rainDropDom;
		var rainDropDomCopy;
		var thisPathArr=[];
		var thisPathArrCopy=[];
		var thisTimeArr=[];
		var thisTimeArrCopy=[];

		for (var i=0;i<15;i++){
			var thisWidth=getRandom(15)+10;//设定雨滴粒子大小在10-25之间
			var thisTop=getRandom(1000)-500;	//起始高度,注意运算规则.考虑正负。
			var thisPath=thisTop+2000;	//路径，由起始高度而来
			thisPathArr.push(thisPath);	
			var thisTime=Math.floor(350000/thisWidth);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
			thisTimeArr.push(thisTime);
			// var thisTop=getRandom(1000);
			var thisLeft=getRandom(2000)-200;	//起始x位置，考虑正负。
			rainDropDom+="<div id=\"rainDropDom"+i+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTop+"px;left:"+thisLeft+"px\"><img src=\"./src/rain.png\" width=\""+thisWidth+"\" height=\""+thisWidth+"\" /></div>";
		
		}
		$(".stroyBackTwoOver").html(rainDropDom);
		$(".stroyBackTwoOver div").each(function(index){
			$(this).animate({top:"+="+thisPathArr[index]+"px"},thisTimeArr[index],"linear");
		});	//$(".stroyBackTwoOver div").each(function(index)

		//第二层
		for (var i=0;i<25;i++){
			var thisWidthCopy=getRandom(15)+5;//设定雨滴粒子大小在10-25之间
			var thisTopCopy=getRandom(1000)-500;	//起始高度,注意运算规则.考虑正负。
			var thisPathCopy=thisTopCopy+2000;	//路径，由起始高度而来
			thisPathArrCopy.push(thisPathCopy);	
			var thisTimeCopy=Math.floor(400000/thisWidthCopy);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
			thisTimeArrCopy.push(thisTimeCopy);
			// var thisTop=getRandom(1000);
			var thisLeftCopy=getRandom(2000)-200;	//起始x位置，考虑正负。
			rainDropDomCopy+="<div id=\"rainDropDomCopy"+i+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTopCopy+"px;left:"+thisLeftCopy+"px\"><img src=\"./src/rain.png\" width=\""+thisWidthCopy+"\" height=\""+thisWidthCopy+"\" /></div>";
			// console.log(rainDropDomCopy);
		}
		$(".storyBackTwo").html(rainDropDomCopy);
		$(".storyBackTwo div").each(function(indexCopy){
			$(this).animate({top:"+="+thisPathArrCopy[indexCopy]+"px"},thisTimeArrCopy[indexCopy],"linear");
		});	//$(".stroyBackTwoOver div").each(function(index)


		//开始粒子生成。先清除上一次的粒子动画
		
		window.clearInterval(rainDomCreateAnime);
		rainDomCreateAnime=setInterval(story.createOneRainDrop,400);
		
	},	//createRainDrop:function()

	
	//单粒子生成
	// createOneRainDrop:function(minWidth,offsetWidth,minTop,offsetTop,minLeft,offsetLeft){
	createOneRainDrop:function(minWidth,offsetWidth,minTop,offsetTop,minLeft,offsetLeft){
		// var thisWidth=getRandom(offsetWidth)+minWidth;
		// var thisTop=getRandom(offsetTop)+minTop;
		// var thisPath=thisTop+2000;
		// var thisTime=Math.floor(250000/thisWidth);
		// var thisLeft=getRandom(offsetLeft)+minLeft;

		var thisWidth=getRandom(15)+10;//设定雨滴粒子大小在10-25之间
		var thisTop=getRandom(500)-500;	//起始高度,注意运算规则.考虑正负。
		var thisPath=thisTop+2000;	//路径，由起始高度而来
		var thisTime=Math.floor(350000/thisWidth);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
		var thisLeft=getRandom(2000)-200;

		//粒子计数
		// console.log($("#rainDomCount").val());
		var index=Number($("#rainDomCount").val())+1;
		$("#rainDomCount").val(index);
		
		var rainDropOneDom="<div id=\"rainDropOneDom"+index+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTop+"px;left:"+thisLeft+"px\"><img src=\"./src/rain.png\" width=\""+thisWidth+"\" height=\""+thisWidth+"\" /></div>";
		$(".stroyBackTwoOver").append(rainDropOneDom);
		$("#rainDropOneDom"+index).animate({top:"+="+thisPath+"px"},thisTime,"linear",removeOneRainDom);

		// 动画完即移出单个雨滴
		function removeOneRainDom(){
			$("#rainDropOneDom"+index).remove();
		}

		var thisWidthCopy=getRandom(15)+5;//设定雨滴粒子大小在10-25之间
		var thisTopCopy=getRandom(500)-500;	//起始高度,注意运算规则.考虑正负。
		var thisPathCopy=thisTopCopy+2000;	//路径，由起始高度而来
		var thisTimeCopy=Math.floor(400000/thisWidthCopy);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
		var thisLeftCopy=getRandom(2000)-200;

		//粒子计数
		// console.log($("#rainDomCount").val());
		var indexCopy=Number($("#rainDomCountCopy").val())+1;
		$("#rainDomCountCopy").val(indexCopy);
		
		var rainDropOneDomCopy="<div id=\"rainDropOneDomCopy"+indexCopy+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTopCopy+"px;left:"+thisLeftCopy+"px\"><img src=\"./src/rain.png\" width=\""+thisWidthCopy+"\" height=\""+thisWidthCopy
		+"\" /></div>";
		
		$(".storyBackTwo").append(rainDropOneDomCopy);
		$("#rainDropOneDomCopy"+indexCopy).animate({top:"+="+thisPathCopy+"px"},thisTimeCopy,"linear",removeOneRainDomCopy);

		function removeOneRainDomCopy(){
			$("#rainDropOneDomCopy"+indexCopy).remove();
		}
		// console.log(index);
		index++;
		indexCopy++;
	},	//createOneRainDrop:function()
		testInterval:function(){
		
		console.log($("#rainDomCount").val());//粒子计数。绑定在页面的隐藏input上。
		var test=Number($("#rainDomCount").val())+1;
		$("#rainDomCount").val(test);
	}

}	//story命名空间

// beautifulWorld命名空间，内含beautifulWorld页面的专有操作函数。
var beautiful={
	//元素卡片化。
	//特例模式，即对指定的517*56像素图片分割。X分12部分，y随机分2,3块。
	//cutCard此方法是个人插件，fragmentFly的原型。
	// 在整合为fragmentFly插件后，此处的方法弃用，不过可以放在这里用于纪念。
	// 插件中默认的参数也是参考于此方法。
	cutCard:function(cardDom){
		var cardHeight=cardDom.height();
		var cardWidth=cardDom.width();

		var cardDomName=cardDom.attr("id");

		var cardCopyObjects;

		var unitX=cardWidth/12;
		var unitY1=cardHeight/2;
		var unitY2=cardHeight/3;

		var creatTitleCopy="";
		var eachTitle;

		for (var i=0;i<12;i++){
			var isRandom=(i%2==0)?2:3;
			unitY=(i%2==0)?unitY1:unitY2;
			for (var j=0;j<isRandom;j++){
				var left=i*unitX;
				var top=j*unitY;
				var width=unitX;
				var height=unitY;

				var styleStr="style=\"position:absolute;z-index:10;left:"+left+"px;top:"+top+"px;width:"+width+"px;height:"+height+"px;background:url('./src/beautifulWorldTitle.png') no-repeat -"+left+"px -"+top+"px;\"";
				
				eachTitle="<div id=\""+cardDomName+"_cardCopy"+i+"_"+j+"\" "+styleStr+"></div>";
				creatTitleCopy+=eachTitle;
			}	//for (var j=0;j<isRandom;j++)
		}	//for (var i=0;i<12;i++)
	
		cardDom.html(creatTitleCopy);
		// 绑动画
		for (var i=0;i<12;i++){
			var isRandom=(i%2==0)?2:3;
			for (var j=0;j<isRandom;j++){
				var randomY=getRandom(300)+500;

				var title_y_path="+="+randomY.toString()+"px";
				var title_y_path_ready="-="+randomY.toString()+"px";
				var time=getRandom(300)+1000;
				$("#"+cardDomName+"_cardCopy"+i+"_"+j)
				.animate({
					top:(title_y_path_ready)
				},0)
				.animate({
					top:title_y_path
				},time,"swing",function(){});

			}
		}
	},//cutCard:function(cardDom)



}







//页面dom加载完毕执行事件
jQuery(function($){
	
}); //jquery