chrome.contextMenus.create({
  title: 'フルサイズで保存',
  id: 'awalker-down-menu',
  contexts: ['link', 'image'],
  targetUrlPatterns: ['http://dcimg.awalker.jp/img1.php?id=*', 'http://dcimg.awalker.jp/img2.php?sec_key=*']
})

function nextLetter(c){
  var code= c.charCodeAt(0);
  switch(code){
    case 122: return 'a';
    default: return String.fromCharCode(++code);
  }
}

function todayStr() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yy = today.getYear();
  if (yy > 100) { // well I don't believe this plugin to live for more than 100 years
    yy -= 100;
  }
  if (yy == 0) {
    yy = '00';
  } else if (yy < 10) {
    yy = '0' + yy;
  }
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return yy + mm + dd;
}

function download(img5Url) {
  chrome.storage.local.get({lastDay: todayStr(), nextChar: 'a'}, function(data) {
    var thisChar = data.nextChar;
    var nextChar = 'b';
    if (data.lastDay == todayStr()) {
      nextChar = nextLetter(thisChar);
    } else {
      thisChar = 'a';
    }
    chrome.storage.local.set({lastDay: todayStr(), nextChar: nextChar}, function() {
      chrome.downloads.download({
        url: img5Url,
        saveAs: true,
        filename: todayStr() + thisChar + ".jpg"
      })
    });
  });
}

function downloadFromImg1(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  var img5Url = url.replace(/dcimg\.awalker\.jp\/img1\.php\?id=/, 'dcimg.awalker.jp/img5.php?sec_key=');
  download(img5Url);
}

function downloadFromImg2(url) {
  var img5Url = url.replace(/dcimg\.awalker\.jp\/img2\.php\?sec_key=/, 'dcimg.awalker.jp/img5.php?sec_key=');
  download(img5Url);
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "awalker-down-menu") {
    if (!(info.linkUrl === undefined) && info.linkUrl != "") {
      downloadFromImg1(info.linkUrl);
    } else if (!(info.srcUrl === undefined) && info.srcUrl != "") {
      downloadFromImg2(info.srcUrl);
    }
  }
})