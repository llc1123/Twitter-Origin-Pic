document.body.onmousedown = function (img){

	var isValid = false;
	var tweet = {
		'picId': null,
		'userId': null,
		'userName': null,
		'fullName': null,
		'timestamp': null,
		'tweetText': null,
		'tweetId': null
	}

	if (img.target.parentNode.classList.contains("AdaptiveMedia-photoContainer")){
		
		isValid = true;

		var content = img.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		tweet.picId = 0;

		if (content.classList.contains("AdaptiveMediaOuterContainer")){
			content = content.parentNode;
		}

		if (content.classList.contains("AdaptiveMedia")){
			content = content.parentNode.parentNode;
			img.target.parentNode.parentNode.parentNode.querySelectorAll("img").forEach(function(o,i){
				o.picId = i+1;
			})
			tweet.picId = img.target.picId;
		}

		tweet.userId = content.querySelector(".account-group").getAttribute('data-user-id');
		tweet.userName = content.querySelector(".username b").textContent;
		tweet.fullName = content.querySelector(".fullname").textContent;
		tweet.timestamp = content.querySelector("._timestamp").getAttribute("data-time-ms");
		tweet.tweetText = content.querySelector(".tweet-text").innerHTML
								.replace(/<img class="Emoji.+? alt="(.+?)".+?>/g,'$1')
								.replace(/<a .+? data-expanded-url="https?:\/\/(.+?)" .+?>.+?<\/a>/g,'$1')
								.replace(/<a .+?><s>(#|@)<\/s><b>(.+?)<\/b><\/a>/g,'$1$2')
								.replace(/<a href="https:\/\/t.co\/\w+" class="twitter-timeline-link u-hidden".+?>.+?<\/a>$/g,'');
		tweet.tweetId = content.querySelector(".time a").getAttribute("data-conversation-id");
	}

	chrome.runtime.sendMessage({
	    type: "twiContent",
	    isValid: isValid,
	    tweet: tweet
	})
}

