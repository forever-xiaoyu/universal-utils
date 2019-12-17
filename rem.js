/**
 * 设置 rem 规则
 */
(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  function recalc () {
    var designUIWidth = 750 // 默认是 UI 全屏宽度为 750px
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = (100 * clientWidth) / designUIWidth + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
