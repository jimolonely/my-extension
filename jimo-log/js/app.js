
var addLogBtn = $("#btn_add_log");
var logInput = $("#input_log");
var timeSpan = $("#time_now");
var msgOut = $("#msg_out");
var filePathInput = $("#file_path");
var logText = $("#text_log");

var fileEntry = null;

function errorHandler(e) {
  console.error(e);
}


//点击添加一条日志
addLogBtn.on('click',function(){
	
	var log = logInput.val();
	if(!log||log==""){
		return;
	}
	var now = timeSpan.html();
	logText.val(logText.val()+' | '+now+' | '+log+' |\n');
	
	saveOneLog();
})

function saveOneLog(){
  if (fileEntry) {
    writeEditorToFile(fileEntry);
  } else {
	  var d = new Date().Format("yyyy-MM-dd");
	  var title = d+".txt";
	  var config = {type: 'saveFile', suggestedName: title};
    chrome.fileSystem.chooseEntry(config, function(theFileEntry){
	  console.log(theFileEntry)
	  fileEntry = theFileEntry;
	  //初始化时加入table表头
	  logText.val('# '+d +'\n ---------- \n | 时间 | 事件 |\n | ------ | -------| \n | '+ timeSpan.html()+' | 初始化写入 |\n| '+timeSpan.html()+' | '+logInput.val()+' |\n');
	  writeEditorToFile(theFileEntry);
	});
  }
}

var onChosenFileToSave = function(theFileEntry) {
	console.log(theFileEntry)
  fileEntry = theFileEntry;
  writeEditorToFile(theFileEntry);
//  filePathInput.val(theFileEntry.fullPath);
};

function writeEditorToFile(theFileEntry) {
  theFileEntry.createWriter(function(fileWriter) {
    fileWriter.onerror = function(e) {
		msgOut.html("写入失败："+e.toString());
      console.log("Write failed: " + e.toString());
    };

    var blob = new Blob([logText.val()]);
    fileWriter.truncate(blob.size);
    fileWriter.onwriteend = function() {
      fileWriter.onwriteend = function(e) {
		filePathInput.val(theFileEntry.fullPath);
    //    handleDocumentChange(theFileEntry.fullPath);
		msgOut.html("写入成功");
        console.log("Write completed.");
		logInput.val('');
      };
      fileWriter.write(blob);
    }
  }, errorHandler);
}

//当input focus时清除提示信息
//TODO

//修改日期
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//动态时间
function tick(){
	var now = new Date().Format("yyyy-MM-dd hh:mm:ss");
	timeSpan.html(now);
	if(logInput.val()==''){
		msgOut.html('');
	}
}

setInterval(tick,1000);



