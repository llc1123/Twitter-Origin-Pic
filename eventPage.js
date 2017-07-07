function doSearch(info){

	var site;
	var filename;
	var url;

	if (info.pageUrl.match(/https:\/\/twitter\.com\/.*/)) site = "twitter";
	else if (info.pageUrl.match(/https:\/\/pawoo\.net\/.*/)) site = "pawoo";

	if (site === "twitter")	{
		url = info.srcUrl+":orig";
		filename = info.srcUrl.replace(/^.*\//, '');
	}
	else if (site === "pawoo") {
		url = info.linkUrl;
		filename = info.linkUrl.replace(/^.*\//, '');
	}

	chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
	});

	return true;
}

function initialize(isValid){
	if (isValid){
		chrome.contextMenus.removeAll();
		chrome.contextMenus.create({
			"title": "Download Origin", 
			"id": "downloader", 
			"contexts": ["image", "link"],
			"documentUrlPatterns": ["https://twitter.com/*", "https://pawoo.net/*"]
		});
	}else{
		chrome.contextMenus.removeAll();
	}

	chrome.runtime.sendMessage({
	    type: "initialize"
	})
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.type == 'content') {
        callback(initialize(request.isValid));
    }
});

chrome.contextMenus.onClicked.addListener(doSearch);