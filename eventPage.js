chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'フルサイズで保存',
    id: 'awalker-down-menu',
    contexts: ['link','image'],
    targetUrlPatterns: ['http://dcimg.awalker.jp/img1.php?id=*','http://dcimg.awalker.jp/img2.php?sec_key=*']
  })
})

function downloadFromImg1(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  img5Url = url.replace(/dcimg\.awalker\.jp\/img1\.php\?id=/,'dcimg.awalker.jp/img5.php?sec_key=')
  chrome.downloads.download({
    url: img5Url
  })
}

function downloadFromImg2(url) {
  var img5Url = url.replace(/dcimg\.awalker\.jp\/img2\.php\?sec_key=/,'dcimg.awalker.jp/img5.php?sec_key=')
  chrome.downloads.download({
    url: img5Url
  })
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "awalker-down-menu") {
    if (!(info.linkUrl === undefined)) {
      downloadFromImg1(info.linkUrl)
    } else if (!(info.srcUrl === undefined)) {
      downloadFromImg2(info.srcUrl)
    }
  }
})
