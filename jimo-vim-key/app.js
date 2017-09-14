/**
@Author: https://github.com/jimolonely
**/


//G:到页面底部
$(document).bind('keydown', 'shift+g', function(){
	$(window).scrollTo("1000000px");
});

//j:往下
$(document).bind('keydown', 'j', function(){
	$(window).scrollTo("+=100px");
});

//k:往上
$(document).bind('keydown', 'k', function(){
	$(window).scrollTo("-=100px");
});

//h:往左
$(document).bind('keydown', 'h', function(){
	$(window).scrollTo({left:"-=100px"});
});

//l:往右
$(document).bind('keydown', 'l', function(){
	$(window).scrollTo({right:"+=100px"});
});

/**
处理两个都是字母的情况
**/
var gPressed = false;
var beginTime = 0;
$(document).keydown(function(e){
	//gg:返回页面顶部
	if (e.which==71){
		if(gPressed && inTime()){
			$(window).scrollTo("0px");
			gPressed = false;
		}else{
			gPressed = true;
			beginTime = new Date().getTime();
		}
	} 
	
})

//判断第一次与第二次按键的间隔是否在1s内
function inTime(){
	var end = new Date().getTime();
	if(end-beginTime>1000){
		return false;
	}
	return true;
}


$(document).keyup(function(e){
	
})
