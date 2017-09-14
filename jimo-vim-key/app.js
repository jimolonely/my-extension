/**
@Author: https://github.com/jimolonely
**/

console.log(chrome.extension)

/**
定义一个content script和background script通信的消息体
**/
class Msg{
	constructor(type,data){
		this.type = type;
		this.data = data;
	}
}

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

//h:切换到左边一个tab页
$(document).bind('keydown', 'h', function(){
	var msg = new Msg('tab','h');
	chrome.extension.sendRequest(msg);
});

//l:切换到右边一个tab页
$(document).bind('keydown', 'l', function(){
	var msg = new Msg('tab','l');
	chrome.extension.sendRequest(msg);
});

//c:打开一个新的tab页
$(document).bind('keydown', 'c', function(){
	var msg = new Msg('tab','c');
	chrome.extension.sendRequest(msg)
});

//x:关闭当前tab页
$(document).bind('keydown', 'x', function(){
	var msg = new Msg('tab','x');
	chrome.extension.sendRequest(msg)
});

//esc:
$(document).bind('keydown', 'esc', function(){
	doEsc()
});
$("input").bind('keydown', 'esc', function(){
	doEsc();
});
$("textarea").bind('keydown', 'esc', function(){
	doEsc();
});

function doEsc(){
	console.log('esc')
	//隐藏cmdDiv
	$('#jimo-cmd-div').hide()
	$("input").blur();
	$("textarea").blur();
}

/**
:(冒号)=shift+;
在VIM里用于在正常模式执行命令，在这里沿用；
思路是在左下角弹出执行命令的输入框，回车执行相应命令
**/
var createdCmdDiv = false,clearCmdIput = false;
$(document).bind('keydown', 'shift+;', function(){
	console.log('shift+;')
	//新增div元素包括输入框，使用绝对定位在左下角
	if(!createdCmdDiv){
		var cmdDiv = '<div id="jimo-cmd-div" style="width:150px;height:25px;background:#000;position:fixed;bottom:0px;left:0px;color:#ddd;z-index:10000000;">'
		+'<b>:</b><input id="jimo-cmd-input" type="text" style="width:90%;border:0px solid #000;background:#000;color:#ddd"/>'
		+'</div>'
		$("body").append(cmdDiv);		
		createdCmdDiv = true;
	}else{
		$('#jimo-cmd-div').show()
	}
	$("#jimo-cmd-input").focus();
	clearCmdIput = true;//按下shift+;时会把:写入input
});

//监听cmdInput的按键命令,因为是动态生成的，所以单独处理
$("body").on('keydown','#jimo-cmd-input', function(e){
	switch(e.keyCode){
	case 13://enter
		handleCmd();
	break;
	case 27://esc
		$('#jimo-cmd-div').hide()
	break;
	}
});

//处理命令
function handleCmd(){
	var cmd = $("#jimo-cmd-input").val();
	
}

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
			beginTime = Date.now();
		}
	} 
	
})

//判断第一次与第二次按键的间隔是否在1s内
function inTime(){
	var end = Date.now();
	if(end-beginTime>1000){
		return false;
	}
	return true;
}


$(document).keyup(function(e){
	if(clearCmdIput){
		$("#jimo-cmd-input").val("");
		clearCmdIput = false;
	}
})
