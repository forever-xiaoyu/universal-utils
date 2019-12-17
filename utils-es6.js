
/**
 * @description 绑定事件 on(element, event, handler)
 */

export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 interval 毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const throttle = (fn, interval = 300) => {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, interval)
  }
}

/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const debounce = (fn, interval = 300) => {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

/**
 * @description: 判断是否是iphoneX系列机型，现在 iPhone 在 iPhone X 之后的机型都需要适配，所以可以对 X 以后的机型统一处理，我们可以认为这系列手机的特征是 ios + 长脸
 * @returns
 */
export const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}

/**
 * @description: 判断是否是iphone
 * @returns {boolean}
 */
export const isIphone = () => {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent)
  }
  return false
}

/**
 * @description: 判断是否是微信环境
 * @returns {boolean}
 */
export const isWX = () => {
  if (typeof window !== 'undefined' && window) {
    return /MicroMessenger/gi.test(window.navigator.userAgent)
  }
  return false
}

/**
 * 是否在微信环境
 * @returns {boolean}
 */
export const isInWeixin = () => {
  return window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1
}

/**
 * @description：判断小程序
 * @returns {boolean}
 */
export const isMiniProgram = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  return ua.includes('miniprogram')
}

/**
 * @description: 禁止页面滚动/允许页面滚动
 * @param {type}
 * @returns
 */
export const lockMaskScroll = (bodyCls => {
  let scrollTop
  return {
    afterOpen: function () {
      scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -scrollTop + 'px'
    },
    beforeClose: function () {
      if (document.body.classList.contains(bodyCls)) {
        document.body.classList.remove(bodyCls)
        document.scrollingElement.scrollTop = scrollTop
      }
    }
  }
})('dialog-open')

/**
 * @description: 平滑滚动到指定位置
 * @param position
 */
export const scrollSmoothTo = (position) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      return setTimeout(callback, 17)
    }
  }
  // 当前滚动高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 滚动step方法
  var step = function () {
    // 距离目标滚动距离
    var distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position)
    } else {
      window.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}

/**
 * @description: 跳转到登录页
 * @param {type} 会跳地址
 * @returns
 */
export const toLoginPage = (returnUrl) => {
  const redirectUrl = `//demo.com?returnurl=${encodeURIComponent(returnUrl || window.location.href)}`
  window.location.href = redirectUrl
}

/**
 * @description: 将对象转化成url参数
 * @param {type}
 * @returns
 */
export const queryParams = obj => {
  let qs = Object.keys(obj)
    .map(key => {
      let val = obj[key]
      if (val) {
        if (typeof val === 'object') {
          val = JSON.stringify(val)
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val)
      }
    }).filter(Boolean)
    .join('&')

  return qs
}

/**
 * @description: 判断元素是否在可视范围内
 * @param {type} partiallyVisible为是否为完全可见
 * @return:
 */
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const {
    top,
    left,
    bottom,
    right
  } = el.getBoundingClientRect()

  return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

/**
 * @description: getCookie
 * @param objName
 * @returns {string}
 */
export const getCookie = (objName) => {
  let arrStr = document.cookie.split('; ')
  for (let i = 0; i < arrStr.length; i++) {
    let temp = arrStr[i].split('=')
    if (temp[0] === objName) return decodeURIComponent((temp[1] || '').trim())
  }
  return ''
}

/**
 * @description: 微信分享
 * @param obj
 */
export const shareWX = (obj) => {
  try {
    if (wx) {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '', // 必填，签名
        jsApiList: [] // 必填，需要使用的JS接口列表
      })
      // config 信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
      // config 是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
      // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.ready(function () {
        // 自定义'分享给朋友'及'分享到QQ'按钮的分享内容
        wx.updateAppMessageShareData({
          title: '', // 分享标题
          desc: '', // 分享描述
          link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 设置成功
          }
        })

        // 自定义'分享到朋友圈'及'分享到QQ空间'按钮的分享内容
        wx.updateTimelineShareData({
          title: '', // 分享标题
          link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      })
    }
  } catch (e) {}
}

/**
 * @description: 懒加载 js
 * @param url
 * @param callback
 */
export const loadJs = (url, callback) => {
  let script = document.createElement('script')
  script.setAttribute('src', url)
  document.body.appendChild(script)
  script.onload = function () {
    callback && callback()
  }
}
