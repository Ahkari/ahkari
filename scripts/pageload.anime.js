// 每页动画在这写
var countingWaveLoadEvent=function(){
	console.log(pageIndexName);
};
var triggerFingerLoadEvent=function(){
	console.log(pageIndexName);
	$(".storyBack").css("transform","scale(1.8)");

};


// story页面加载。
// 动画过程，两个场景。
var storyLoadEvent=function(){
	console.log(pageIndexName);
	$(".storyScenceTwo").css("display","none");
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
		setTimeout(story.whiteLayerTransform,2500);

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

		for (var i=0;i<40;i++){
			var thisWidth=getRandom(15)+10;//设定雨滴粒子大小在10-25之间
			var thisTop=getRandom(1000)-500;	//起始高度,注意运算规则.考虑正负。
			var thisPath=thisTop+2000;	//路径，由起始高度而来
			thisPathArr.push(thisPath);	
			var thisTime=Math.floor(250000/thisWidth);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
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
		for (var i=0;i<50;i++){
			var thisWidthCopy=getRandom(15)+5;//设定雨滴粒子大小在10-25之间
			var thisTopCopy=getRandom(1000)-500;	//起始高度,注意运算规则.考虑正负。
			var thisPathCopy=thisTopCopy+2000;	//路径，由起始高度而来
			thisPathArrCopy.push(thisPathCopy);	
			var thisTimeCopy=Math.floor(250000/thisWidthCopy);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
			thisTimeArrCopy.push(thisTimeCopy);
			// var thisTop=getRandom(1000);
			var thisLeftCopy=getRandom(2000)-200;	//起始x位置，考虑正负。
			rainDropDomCopy+="<div id=\"rainDropDomCopy"+i+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTopCopy+"px;left:"+thisLeftCopy+"px\"><img src=\"./src/rain.png\" width=\""+thisWidthCopy+"\" height=\""+thisWidthCopy+"\" /></div>";
			// console.log(rainDropDomCopy);
		}
		$(".storyBackTwo").html(rainDropDomCopy);
		$(".storyBackTwo div").each(function(indexCopy){
			$(this).animate({top:"+="+thisPathArrCopy[indexCopy]+"px"},thisTimeArrCopy[indexCopy],"linear");
			console.log($(this));
		});	//$(".stroyBackTwoOver div").each(function(index)


		//开始粒子生成。
		
		
		var rainDomCreateAnime=setInterval(story.createOneRainDrop,200);
		// var testThisAnime=setInterval(story.testInterval,500);
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
		var thisTime=Math.floor(250000/thisWidth);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
		var thisLeft=getRandom(2000)-200;

		//粒子计数
		// console.log($("#rainDomCount").val());
		var index=Number($("#rainDomCount").val())+1;
		$("#rainDomCount").val(index);
		
		var rainDropOneDom="<div id=\"rainDropOneDom"+index+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTop+"px;left:"+thisLeft+"px\"><img src=\"./src/rain.png\" width=\""+thisWidth+"\" height=\""+thisWidth+"\" /></div>";
		$(".stroyBackTwoOver").append(rainDropOneDom);
		$("#rainDropOneDom"+index).animate({top:"+="+thisPath+"px"},thisTime,"linear");


		var thisWidthCopy=getRandom(15)+5;//设定雨滴粒子大小在10-25之间
		var thisTopCopy=getRandom(500)-500;	//起始高度,注意运算规则.考虑正负。
		var thisPathCopy=thisTopCopy+2000;	//路径，由起始高度而来
		var thisTimeCopy=Math.floor(250000/thisWidthCopy);	//运行时长，由粒子大小而来，应为遵照近大远小，近快远慢原则。
		var thisLeftCopy=getRandom(2000)-200;

		//粒子计数
		// console.log($("#rainDomCount").val());
		var indexCopy=Number($("#rainDomCountCopy").val())+1;
		$("#rainDomCountCopy").val(indexCopy);
		
		var rainDropOneDomCopy="<div id=\"rainDropOneDomCopy"+indexCopy+"\" style=\"width:30px;height:30px;position:absolute;top:"+thisTopCopy+"px;left:"+thisLeftCopy+"px\"><img src=\"./src/rain.png\" width=\""+thisWidthCopy+"\" height=\""+thisWidthCopy
		+"\" /></div>";
		
		$(".storyBackTwo").append(rainDropOneDomCopy);
		$("#rainDropOneDomCopy"+indexCopy).animate({top:"+="+thisPathCopy+"px"},thisTimeCopy,"linear");
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










//页面dom加载完毕执行事件
jQuery(function($){
	$("#sence_one").on("click",function(){
		alert(1);
		story.bindCameraAnime();
		
	});

}); //jquery