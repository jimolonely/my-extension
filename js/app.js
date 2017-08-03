
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
	logText.val(log+"\n"+logText.val());
	
	var title = timeSpan.html()+".log";
	
	saveOneLog(title);
})

function saveOneLog(title){
  if (fileEntry) {
    writeEditorToFile(fileEntry);
  } else {
	  var config = {type: 'saveFile', suggestedName: title};
    chrome.fileSystem.chooseEntry({type:'saveFile'}, function(theFileEntry){
	  console.log(theFileEntry)
	  fileEntry = theFileEntry;
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
      };
      fileWriter.write(blob);
    }
  }, errorHandler);
}

//当input focus时清除提示信息

