function setHtmlSize(){
  var pageWidth = window.innerWidth;
  if(typeof pageWidth != "number"){ 
    if(document.compatMode == "number"){ 
      pageWidth = document.documentElement.clientWidth;
    } else { 
      pageWidth = document.body.clientWidth; 
    } 
  } 
  console.log(window.innerWidth < 1920)
  var fontSize = (window.innerWidth * 100) / 1920;
  if (window.innerWidth > 1280 && window.innerWidth < 1920) {
    fontSize = (1920 * 100) / 1920;
  }
  if (window.innerWidth < 1280) {
    fontSize = (1280 * 100) / 1920;
  }
  //根据屏幕大小确定根节点字号
  document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
}
function resize() {
  setHtmlSize();
}
if (window.attachEvent) { 
  window.attachEvent("resize", resize);
} else if (window.addEventListener) { 
  window.addEventListener("resize", resize, false);   
}
setHtmlSize();