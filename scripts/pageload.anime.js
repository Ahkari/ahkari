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
	// 第一个场景，ajax请求页面，向其中添加雨滴，然后绑摄像机插件动画
	function senceOne(){
		$(".storyBack").css("transform","scale(1.1)");
		// 下面需要ajax请求到story_sence_one的html，然后生成三十个水滴。
		$.ajax("./htm/story_sence_one.htm",{
				async:true,
				// complete:complete,
				dataType:"html",
				error:null,
				success:story.addRainDom,//无需addRainDom指定后面三个参数
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
			var thisWidth=getRandom(20)+10;
			rainDom+="<div id=\"obj"+i+"\" style=\"width:30px;height:30px\"><img src=\"./src/rain.png\" width=\""+thisWidth+"\" height=\""+thisWidth+"\" /></div>";
	
		}
		$("#sence_one").html(rainDom);
		// 下面为生成的桑拿室水滴绑动画
		story.bindCameraAnime();
		setTimeout(story.whiteLayerTransform,2500);

	},
	// 给元素绑定动画，此处是摄像机插件。
	bindCameraAnime:function(){
		// story下的一个数组，为摄像机下雨滴位置数组。想办法自己生成。
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
		// console.log(obejectArray);
		// alert(obejectArray);
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
		function insideWhiteLayerTransform(){
			$(".whiteTransformLayer").css("opacity",0);
		}
		// alert(1);
		// console.log(1);


	},	//whiteLayerTransform:function()

}	//story命名空间










//页面dom加载完毕执行事件
jQuery(function($){
	$("#sence_one").on("click",function(){
		alert(1);
		story.bindCameraAnime();
		
	});

}); //jquery