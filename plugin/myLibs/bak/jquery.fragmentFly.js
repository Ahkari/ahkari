;(function($){
 // 这里写代码了啦
$.fn.extend({
    /**
     * [fragment 碎片视差动画插件]
     *
     * @param {[divisionSetting]}
     *            分割设置，{
     *                       cut_dir:x(y),
     *                       ave_part:ave_part,
     *                       rm_part:rm_part
     *                    }
     * @param {[animeSetting]}
     *            动画设置，{
     *                       anime_dir,
     *                       path:100 50,
     *                       time:2000 500
     *                    }
     * @return null
     */

    "fragmentFly":function(divisionSetting,animeSetting){
        // jQuery对象的方法扩展，所以用jQuery.fn.extend()来编写
        cardDom=$(this);

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
    
            } //for (var j=0;j<isRandom;j++)
        } //for (var i=0;i<12;i++)
      
    
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
            },time,"swing");

        } // for (var j=0;j<isRandom;j++)
    } //for (var i=0;i<12;i++)
 













    }//"fragmentFly":function(objectArray,camera,callBack)

});
})(jQuery);







