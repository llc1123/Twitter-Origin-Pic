function createMenu(){
	chrome.contextMenus.create({
		"title": "Download Origin", 
		"id": "downloader", 
		"contexts": ["image", "link"],
		"documentUrlPatterns": ["https://twitter.com/*", "https://pawoo.net/*"]
	});
}

function doSearch(info, tab){

	var site;
	var src;
	var url;

	if (info.pageUrl.match(/https:\/\/twitter\.com\/.*/)) site = "twitter";
	else if (info.pageUrl.match(/https:\/\/pawoo\.net\/.*/)) site = "pawoo";

	if (site === "twitter")	{
		src = info.srcUrl;
		url = src+":orig";
	}
	else if (site === "pawoo") {
		src = info.linkUrl;
		url = src;
	}

	if (src.indexOf('data:') == 0) {
		// incompatible
		alert("Not Yet Compatible With Data URIs");
	}else{
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