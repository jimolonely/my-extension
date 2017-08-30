

var App = {
	
}


var btn_open_dir = $('#btn_open');
var ul_file_list = $('#file_list');
var li_root = $('#li_root');

var fileEntry = null;
var entries = [];
var dir = [];
var files = [];


function errorHandler(e) {
  console.error(e);
}


//选择文件夹并读取
btn_open_dir.on('click',function(){
	chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(theEntry) {
    if (!theEntry) {
      //output.textContent = 'No Directory selected.';
      return;
    }
    // 本地存储
 //   chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
    loadDirEntry(theEntry);
  });
})

//递归的读取文件夹
//这里应该是深度遍历,然而我做不到^0^
//既然现在是BFS，如何将下面的列表转化为文件列表树？
//我使用了记录文件和目录的两个队列
function loadDirEntry(_chosenEntry) {
  chosenEntry = _chosenEntry;
  console.log(chosenEntry)
  li_root.html(chosenEntry.name);
  if (chosenEntry.isDirectory) {
    var dirReader = chosenEntry.createReader();
	entries.length = 0;//clear array
	dir.length=0;
	files.length=0;
	
	var reg = new RegExp("^/$","g");
    var bfsReadEntries = function(reader) {
	   reader.readEntries (function(results) {
		  results.forEach(function(item) { 
			//entries.push(item.fullPath.replace(reg,""))
			entries.push(item);
			if(item.isDirectory){	
				bfsReadEntries(item.createReader());
				//console.log(item.fullPath)
				dir.push(item);
				
			}else{
				//console.log(item.fullPath)
				files.push(item);
			}			
		  });
	   }, errorHandler);
    };
    bfsReadEntries(dirReader); // 
	
	setTimeout(makeMenu,100);
//	setTimeout(displayEntryData,1000);
  }
}

//根据路径构建菜单列表
function makeMenu(){
	ul_file_list.empty();
	console.log(dir)
	console.log(files)
	var tmp = [];
	while(dir.length>0){
		var dEntry = dir.shift();
		appendDirItem(dEntry);
		for(var j=0;j<files.length;j++){
			var fEntry = files[j];
			if(isDirsFile(dEntry.fullPath,fEntry.fullPath)){
				appendFileItem(fEntry);
				tmp.push(j);
			}else{
				
			}
		}
	}
	//追加最顶层的文件
	for(var k=0;k<files.length;k++){
		if(tmp.indexOf(k)<0){
			appendTopFileItem(files[k]);
		}
	}
}
//判断该文件是否是该文件夹的
function isDirsFile(d_path,f_path){
	return f_path.substr(0,f_path.lastIndexOf('/'))==d_path;
}

//产生一个目录菜单
function appendDirItem(dEntry){
	ul_file_list.append("<li class='li-dir'><strong>"+dEntry.fullPath+"</strong></li>");
}

//产生一个文件菜单
function appendFileItem(fEntry){
	ul_file_list.append("<li class='li-file'><a href='javascript:;'>"+fEntry.name+"</a></li>");
}

//产生一个顶层文件菜单
function appendTopFileItem(fEntry){
	ul_file_list.append("<li class='li-file li-file-top'><a href='javascript:;'>"+fEntry.name+"</a></li>");
}

function displayEntryData() {
	entries.sort(function(a,b){
		return a.fullPath > b.fullPath;
	})
	//console.log(entries)
	/*console.log(theEntry)
  if (theEntry.isFile) {
    chrome.fileSystem.getDisplayPath(theEntry, function(path) {
      //document.querySelector('#file_path').value = path;
    });
    theEntry.getMetadata(function(data) {
      //document.querySelector('#file_size').textContent = data.size;
    });    
  }
  else {
    //document.querySelector('#file_path').value = theEntry.fullPath;
    //document.querySelector('#file_size').textContent = "N/A";
  }*/
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

//setInterval(tick,1000);



