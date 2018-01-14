chrome.contextMenus.create({
  title: 'フルサイズで保存',
  id: 'awalker-down-menu',
  contexts: ['link','image'],
  targetUrlPatterns: ['http://dcimg.awalker.jp/img1.php?id=*','http://dcimg.awalker.jp/img2.php?sec_key=*']
})

function downloadFromImg1(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  var img5Url = url.replace(/dcimg\.awalker\.jp\/img1\.php\?id=/,'dcimg.awalker.jp/img5.php?sec_key=');
  chrome.downloads.download({
    url: img5Url,
    saveAs: true
  })
}

function downloadFromImg2(url) {
  var img5Url = url.replace(/dcimg\.awalker\.jp\/img2\.php\?sec_key=/,'dcimg.awalker.jp/img5.php?sec_key=');
  chrome.downloads.download({
    url: img5Url,
    saveAs: true
  })
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log("WTF");
  if (info.menuItemId === "awalker-down-menu") {
    console.log(info);
    if (!(info.linkUrl === undefined) && info.linkUrl != "") {
      downloadFromImg1(info.linkUrl);
    } else if (!(info.srcUrl === undefined) && info.srcUrl != "") {
      downloadFromImg2(info.srcUrl);
    }
  }
})