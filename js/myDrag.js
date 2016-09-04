/**
 * Created by zhenyanhu on 16/9/2.
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
var getEle = {
    getById: function (id) {
        return document.getElementById(id);
    },
    getByClass: function (className, parent) {
        var oParent = parent ? document.getElementById(parent) : document,
            resultEles = [],
            elements = oParent.getElementsByTagName('*');

        for (var i in elements) {
            var cl = "" + elements[i].className;
            if (elements[i].className == className || cl.indexOf(className) > -1) {
                resultEles.push(elements[i]);
            }
        }
        return resultEles;
    }
};

/**
 *拖动实现三个步骤
 * 需要点击后触发拖动的元素
 * 鼠标按下触发的事件
 * 鼠标松开触发的事件
 */
window.onload = function () {
    drag();
    close();
    dropMenu();
};

/**
 * 拖拽方法
 */
function drag() {
    var dElement = getEle.getByClass("login_logo_webqq", "loginPanel")[0],
        body = document.documentElement || document.body,
        loginBox = getEle.getById("loginPanel");

    eventUtil.addHandler(dElement, "mousedown", function (e) {
        var dstX = e.clientX - loginBox.offsetLeft,
            dstY = e.clientY - loginBox.offsetTop;
        document.body.onselectstart = function () {
            return false
        };
        var dragHandler = function (e) {
            var l = e.clientX - dstX;
            var t = e.clientY - dstY;
            var maxw = body.clientWidth - loginBox.clientWidth - 15;
            var maxh = body.clientHeight - loginBox.clientHeight - 10;
            if (l < 0) {
                l = 0;
            }
            else if (l > maxw) {
                l = maxw;
            }
            if (t < 0) {
                t = 10;
            }
            else if (t > maxh) {
                t = maxh;
            }

            loginBox.style.left = l + "px";
            loginBox.style.top = t + "px";
        };
        eventUtil.addHandler(document, "mousemove", dragHandler);
        eventUtil.addHandler(document, "mouseup", function () {
            eventUtil.removeHandler(document, "mousemove", dragHandler);
            // eventUtil.removeHandler(document,"mouseup");
        })
    })
}

/**
 * 关闭事件
 */
function close() {
    var closeBtn = getEle.getById("ui_boxyClose");
    closeBtn.onclick = function () {
        getEle.getById("loginPanel").style.display = 'none'
    };
}

/**
 * 下拉菜单
 */
function dropMenu() {
    getEle.getById("loginState").onclick = function (e) {
        getEle.getById("loginStatePanel").style.display = "block";
        eventUtil.stopBubble(eventUtil.getEvent(e));
    };
    var stateLi = getEle.getById("loginStatePanel").getElementsByTagName("li");
    for (var i = 0; i < stateLi.length; i++) {
        !function (i) {
            stateLi[i].onmouseover = function () {
                this.style.backgroundColor = "#ccc";
            };
            stateLi[i].onmouseleave = function () {
                this.style.backgroundColor = "#fff";
            };
            stateLi[i].onclick = function (e) {
                getEle.getById("loginStatePanel").style.display = "none";
                eventUtil.stopBubble(eventUtil.getEvent(e));
                console.log(stateLi[i].firstChild.nextSibling.classList[1]);
                getEle.getByClass("login-state-show")[0].className = "login-state-show " + this.getElementsByTagName("div")[0].classList[1];
                getEle.getById("login2qq_state_txt").innerHTML = getEle.getByClass("stateSelect_text", this.getAttribute("id"))[0].innerHTML;
            };
        }(i);
    }
    document.getElementsByTagName("*")[0].onclick = function () {
        getEle.getById("loginStatePanel").style.display = "none";
    }

}
