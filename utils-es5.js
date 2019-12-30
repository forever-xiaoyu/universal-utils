var utils = {
  ready: function (fn) {
    if (document.addEventListener) { // not IE
      document.addEventListener("DOMContentLoaded", eventHandler, false)
    } else if (document.attachEvent) { // IE
      document.onreadystatechange = function() {
        if (document.readyState == 'complete') {
          document.onreadystatechange = null
          document.attachEvent("onreadystatechange", eventHandler)
        }
      }
    }

    function eventHandler () {
      if (document.addEventListener) {
        document.removeEventListener("DOMContentLoaded", eventHandler, false)
      } else if (document.attachEvent) {
        document.detachEvent("onreadystatechange", eventHandler)
      }
      fn()
    }
  },

  toLoginPage: function (returnUrl) {
    var redirectUrl = passport + '?returnurl=' + encodeURIComponent(returnurl || '')
    window.location.href = redirectUrl
  },

  getCookie: function (key) {
    var arrStr = document.cookie.split('; ')
    for (var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split('=')
      if (temp[0] == key) {
        return decodeURIComponent((temp[1] || '').trim())
      }
    }
    return ''
  },

  getQueryVariable: function (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=")
      if(pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  },

  toast: function (msg, duration) {
    duration = duration || 1000
    var m = document.createElement('div')
    m.innerHTML = msg
    m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 1000;background: rgba(0, 0, 0,.5);font-size: 16px;"
    document.body.appendChild(m)
    setTimeout(function() {
      var d = 0.5
      m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in'
      m.style.opacity = '0'
      setTimeout(function() {
        document.body.removeChild(m)
      }, d * 1000)
    }, duration);
  },

  replaceUrl: function (url) {
    if (url) {
      return url
        .replace(/https:\/\//g, '')
        .replace(/http:\/\//g, '')
        .replace(/\/\//g, '')
        .replace(/\?.*/g, '')
    }
    return ''
  },

  loadJs: function (url, callback) {
    var script = document.createElement('script')
    script.setAttribute('src', url)
    document.body.appendChild(script)
    script.onload = function () {
      callback && callback()
    }
  },
  
  isSafari: function () {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  },
  
  addClass: function ($el, className) {
    if ($el.className.indexOf(className) <= -1) {
      $el.className += ' ' + className
    }
  },

  hasClass: function ($el, className) {
    return $el.className.indexOf(className) > -1
  },

  removeClass: function ($el, className) {
    if ($el.length) { // 数组
      $el.forEach(function (el) {
        remove(el)
      })
    } else { // 对象
      remove($el)
    }

    function remove (el) {
      if (el.className.indexOf(className) > -1) {
        var reg = new RegExp(className)
        el.className = el.className.replace(reg, '')
      }
    }
  },
  
  parents: function ($el, className) {
    var el = $el
    while (el.className) {
      if (el.className.indexOf(className) > -1) {
        return el
        break;
      }
      el = el.parentNode || {}
    }
  }
}
