var site;
var content;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}

function download(info){

	var fn;
	var url;

	if (site === "twitter")	{
		url = info.srcUrl+":orig";
		var filename = info.srcUrl.replace(/^.*\//, "");
        var name = filename.replace(/\.[^/.]+$/, "");
        var ext = filename.replace(name+'.',"");

        var date = new moment(content.timestamp, "x");

        fn = localStorage["fn-twitter"].replaceAll("%picid%", content.picId)
                                       .replaceAll("%userid%", content.userId)
                                       .replaceAll("%username%", content.userName)
                                       .replaceAll("%fullname%", content.fullName)
                                       .replaceAll("%time%", date.format("YYYY-MM-DD HH-mm-ss"))
                                       .replaceAll("%tweettext%", content.tweetText)
                                       .replaceAll("%tweetid%", content.tweetId)
                                       .replaceAll("%filename%", name)
                                       .replaceAll('\n',' ')
                                       .replaceAll(/[\\\/:\*\?"<>\|]/,'_')
                                       +"."+ext;

	}

	chrome.downloads.download({
        url: url,
        filename: fn,
        saveAs: true
	});
}

function initialize(isValid){
    if(localStorage.getItem("fn-twitter") === null) localStorage["fn-twitter"] = "%filename%";
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
        initialize(request.isValid);
        content = request.tweet;
    }
});