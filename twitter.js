var picId = null

document.onmousedown = function(img) {
  var isValid = false
  var tweet = {
    picId: picId,
    userId: null,
    userName: null,
    fullName: null,
    timestamp: null,
    tweetText: null,
    tweetId: null,
    imgUrl: null,
  }

  if (
    img.target.parentNode.classList.contains('AdaptiveMedia-photoContainer')
  ) {
    isValid = true

    var content =
      img.target.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode
    picId = 0

    if (content.classList.contains('AdaptiveMediaOuterContainer')) {
      content = content.parentNode
      img.target.parentNode.parentNode.parentNode
        .querySelectorAll('img')
        .forEach(function(o, i) {
          o.picId = i
        })
      picId = img.target.picId
    }

    if (content.classList.contains('AdaptiveMedia')) {
      content = content.parentNode.parentNode
      img.target.parentNode.parentNode.parentNode
        .querySelectorAll('img')
        .forEach(function(o, i) {
          o.picId = i + 1
        })
      picId = img.target.picId
    }

    tweet.picId = picId

    tweet.userId = content
      .querySelector('.account-group')
      .getAttribute('data-user-id')
    tweet.userName = content.querySelector('.username b').textContent
    tweet.fullName = content.querySelector('.fullname').textContent
    tweet.timestamp = content
      .querySelector('._timestamp')
      .getAttribute('data-time-ms')
    tweet.tweetText = content
      .querySelector('.tweet-text')
      .innerHTML.replace(/<img class="Emoji.+? alt="(.+?)".+?>/g, '$1')
      .replace(
        /<a .+? data-expanded-url="https?:\/\/(.+?)" .+?>.+?<\/a>/g,
        '$1',
      )
      .replace(/<a .+?><s>(#|@)<\/s><b>(.+?)<\/b><\/a>/g, '$1$2')
      .replace(
        /<a href="https:\/\/t.co\/\w+" class="twitter-timeline-link u-hidden".+?>.+?<\/a>$/g,
        '',
      )
      .replace(/&(amp|lt|gt|quot|#39|#x2F|#x60);/g, function(all, a) {
        return {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          '#39': "'",
          '#x2F': '/',
          '#x60': '`',
        }[a]
      })
    tweet.tweetId = content
      .querySelector('.time a')
      .getAttribute('data-conversation-id')

    tweet.imgUrl = img.target.src
  } else if (
    img.target.classList.contains('media-image') ||
    img.target.classList.contains('GalleryNav')
  ) {
    isValid = true

    var content

    if (img.target.classList.contains('media-image')) {
      content = img.target.parentNode.parentNode.querySelector('.content')
      tweet.imgUrl = img.target.src.replace(':large', '')
    } else {
      content = img.target.parentNode.querySelector('.content')
      tweet.imgUrl = img.target.parentNode
        .querySelector('.media-image')
        .src.replace(':large', '')
      img.target.parentNode.querySelector(
        '.GalleryNav--prev',
      ).onclick = function(a) {
        if (a.target.classList.contains('enabled')) picId -= 1
      }
      img.target.parentNode.querySelector(
        '.GalleryNav-handle--prev',
      ).onclick = function(a) {
        if (a.target.classList.contains('enabled')) picId -= 1
      }
      img.target.parentNode.querySelector(
        '.GalleryNav--next',
      ).onclick = function(a) {
        if (a.target.classList.contains('enabled')) picId += 1
      }
      img.target.parentNode.querySelector(
        '.GalleryNav-handle--next',
      ).onclick = function(a) {
        if (a.target.classList.contains('enabled')) picId += 1
      }
    }

    tweet.picId = picId

    tweet.userId = content
      .querySelector('.account-group')
      .getAttribute('data-user-id')
    tweet.userName = content.querySelector('.username b').textContent
    tweet.fullName = content.querySelector('.fullname').textContent
    tweet.timestamp = content
      .querySelector('._timestamp')
      .getAttribute('data-time-ms')
    tweet.tweetText = content
      .querySelector('.tweet-text')
      .innerHTML.replace(/<img class="Emoji.+? alt="(.+?)".+?>/g, '$1')
      .replace(
        /<a .+? data-expanded-url="https?:\/\/(.+?)" .+?>.+?<\/a>/g,
        '$1',
      )
      .replace(/<a .+?><s>(#|@)<\/s><b>(.+?)<\/b><\/a>/g, '$1$2')
      .replace(
        /<a href="https:\/\/t.co\/\w+" class="twitter-timeline-link u-hidden".+?>.+?<\/a>$/g,
        '',
      )
      .replace(/&(amp|lt|gt|quot|#39|#x2F|#x60);/g, function(all, a) {
        return {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          '#39': "'",
          '#x2F': '/',
          '#x60': '`',
        }[a]
      })
    tweet.tweetId = content
      .querySelector('.time a')
      .getAttribute('data-conversation-id')
  }

  chrome.runtime.sendMessage({
    type: 'twiContent',
    isValid: isValid,
    tweet: tweet,
  })
}
