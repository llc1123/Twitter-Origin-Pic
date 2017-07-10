var site;
var content;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}

function download(){

	var fn;
	var url;

	if (site === "twitter")	{
		url = content.imgUrl+":orig";
		var filename = content.imgUrl.replace(/^.*\//, "");
        var name = filename.replace(/\.[^/.]+$/, "");
        var ext = filename.replace(name+'.',"");

        var date = new moment(content.timestamp, "x");

        fn = localStorage["fn-twitter"].replaceAll("%picid%", content.picId)
                                       .replaceAll("%userid%", content.userId)
                                       .replaceAll("%username%", content.userName)
                                       .replaceAll("%fullname%", content.fullName.replaceAll(/\//,'_'))
                                       .replaceAll("%time%", date.format(localStorage["time-format"]))
                                       .replaceAll("%tweettext%", content.tweetText.replaceAll(/\//,'_'))
                                       .replaceAll("%tweetid%", content.tweetId)
                                       .replaceAll("%filename%", name)
                                       .replaceAll('\n',' ')
                                       .replaceAll(/[\\:\*\?"<>\|]/,'_')
                                       .replaceAll(/ *\/ */,'/')
                                       .replace(/\/$/, '')
                                       +"."+ext;

	}

	chrome.downloads.download({
        url: url,
        filename: fn,
        saveAs: localStorage["save-as"]==="true"
	});
}

function createMenu(isValid){
    chrome.contextMenus.removeAll();
    if (isValid){
        chrome.contextMenus.create({
            "title": "Download Origin", 
            "id": "downloader", 
            "contexts": ["all"],
            "onclick": download
        });
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.type == 'twiContent') {
        site = "twitter";
        createMenu(request.isValid);
        content = request.tweet;
    }
});

function initialize(){
    if(localStorage.getItem("subfolder") === null) localStorage["subfolder"] = "twitter-origin-pic";
    if(localStorage.getItem("fn-twitter") === null) localStorage["fn-twitter"] = "%filename%";
    if(localStorage.getItem("time-format") === null) localStorage["time-format"] = "YYYY-MM-DD HH-mm-ss";
}

chrome.tabs.onActivated.addListener(function(){createMenu(false)})
chrome.tabs.onUpdated.addListener(function(){createMenu(false)})
chrome.runtime.onInstalled.addListener(initialize);
chrome.runtime.onStartup.addListener(initialize);