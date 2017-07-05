function createMenu(){
	chrome.contextMenus.create({
		"title": "Download Origin", 
		"id": "downloader", 
		"contexts": ["image"],
		"documentUrlPatterns": ["https://twitter.com/*"]
	});
}

function doSearch(info, tab){
	var src = info.srcUrl;

	if (src.indexOf('data:') == 0) {
		// incompatible
		alert("Not Yet Compatible With Data URIs");
	}else{
		var url = src+":orig";
		chrome.downloads.download({
		  url: url,
		  filename: src.replace(/^.*\//, ''),
		  saveAs: true
		});
	}
	return true;
}

function initialize(){
	createMenu();
}

chrome.runtime.onInstalled.addListener(initialize);
chrome.runtime.onStartup.addListener(initialize);
chrome.contextMenus.onClicked.addListener(doSearch);