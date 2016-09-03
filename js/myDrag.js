/**
 * Created by zhangchi on 16/9/2.
 */


/**
 * 事件处理公共类
 * @type {{addHandler: eventUtil.addHandler, removeHandler: eventUtil.removeHandler, getEvent: eventUtil.getEvent, getElement: eventUtil.getElement, getType: eventUtil.getType, stopBubble: eventUtil.stopBubble, stopDefault: eventUtil.stopDefault}}
 */
var eventUtil = {
    addHandler: function (ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        }
        else if (ele.attachEvent) {
            ele.attachEvent('on' + type, handler);
        }
        else {
            ele['on' + type] = handler;
        }
    },
    removeHandler: function (ele, type, handler) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        }
        else if (ele.detachEvent) {
            ele.detachEvent('on' + type, handler);
        }
        else {
            ele['on' + type] = null;
        }
    },
    getEvent: function (e) {
        return e ? e : window.event;
    },
    getElement: function (e) {
        return e.target ? e.target : e.srcElement
    },
    getType: function (e) {
        return e.type;
    },
    stopBubble: function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else if (e.cancelBubble) {
            e.cancelBubble = true;
        }
    },
    stopDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        else if (e.returnValue) {
            e.returnValue = false;
        }
    }
};

/**
 * 封装根据类名获取元素的方法
 * @param className
 * @param parent
 * @returns {Array}
 */
function getByClass(className, parent) {
    var oParent = parent ? document.getElementById(parent) : document,
        resultEles = [],
        elements = oParent.getElementsByTagName('*');
    for (var i in elements) {
        if (elements[i].className == className) {
            resultEles.push(elements[i]);
        }
    }
    return resultEles;
}

/**
 *拖动实现三个步骤
 * 需要点击后触发拖动的元素
 * 鼠标按下触发的事件
 * 鼠标松开触发的事件
 */
window.onload = drag;
function drag() {
    var dElement = getByClass("login_logo_webqq", "loginPanel")[0],
        body = document.documentElement || document.body,
        loginBox = document.getElementById("loginPanel");

    eventUtil.addHandler(dElement, "mousedown", function (e) {
        var dstX = e.clientX - loginBox.offsetLeft,
            dstY = e.clientY - loginBox.offsetTop;
        var dragHandler = function (e) {
            var l = e.clientX - dstX;
            var t = e.clientY - dstY;
            var maxw = body.clientWidth - loginBox.clientWidth;
            var maxh = body.clientHeight - loginBox.clientHeight;
            if (l < 0) {
                l = 0;
            }
            else if (l > maxw) {
                l = maxw - 10;
            }
            if (t < 0) {
                t = 10;
            }
            if (t > maxh) {
                t = maxh;
            }

            loginBox.style.left = l + "px";
            loginBox.style.top = t + "px";
        };
        eventUtil.addHandler(document, "mouseover", dragHandler);
        eventUtil.addHandler(document, "mouseup", function () {
            eventUtil.removeHandler(document, "mouseover", dragHandler);
            // eventUtil.removeHandler(document,"mouseup");
        })
    })
}