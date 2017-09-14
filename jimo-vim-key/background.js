
chrome.extension.onRequest.addListener(function(msg) {
	console.log(msg)
	//处理tab的切换
	if(msg.type=='tab'){
		switch(msg.data){
			case 'c':
			chrome.tabs.create({});
			break;
			case 'h':
			chrome.tabs.getSelected(function(tab){
				chrome.tabs.highlight({'tabs': tab.index-1}, function() {});
			})
			break;
			case 'l':
			chrome.tabs.getSelected(function(tab){
				chrome.tabs.highlight({'tabs': tab.index+1}, function() {});
			})
			break;
			case 'x':
			chrome.tabs.getSelected(function(tab){
				chrome.tabs.remove(tab.id);
			})
			break;
		}
	}else if(msg.type=='win'){
		switch(msg.data){
			case 'q':
			chrome.windows.getCurrent(function(w){
				chrome.windows.remove(w.id);
			})
			break;
		}
	}
});
