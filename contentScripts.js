window.oncontextmenu = function (tweet){

	var isValid = false;

	if (tweet.target.parentNode.classList.contains("AdaptiveMedia-photoContainer")){

		isValid = true;

		// console.log(tweet);

		var content = tweet.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

		var picId = 0;

		if (content.classList.contains("AdaptiveMediaOuterContainer")){
			content = content.parentNode;
		}

		if (content.classList.contains("AdaptiveMedia")){
			content = content.parentNode.parentNode;
			tweet.target.parentNode.parentNode.parentNode.querySelectorAll("img").forEach(function(o,i){
				o.picId = i+1;
			})
			picId = tweet.target.picId;
		}

		// console.log(content);

		// console.log(picId);

		var userId = content.querySelector(".account-group").getAttribute('data-user-id');

		// console.log(userId);

		var userName = content.querySelector(".username b").textContent;

		// console.log(userName);

		var fullName = content.querySelector(".fullname").textContent;

		// console.log(fullName);

		var timestamp = content.querySelector("._timestamp").getAttribute("data-time-ms");

		// console.log(timestamp);

		var tweetText = content.querySelector(".tweet-text").textContent;

		// console.log(tweetText);

		var tweetId = content.querySelector(".time a").getAttribute("data-conversation-id");

		// console.log(tweetId);
	}

	chrome.runtime.sendMessage({
	    type: "content",
	    isValid: isValid
	})

	chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	    if (request.type == 'initialize') {
	        return true;
	    }
	});

}

