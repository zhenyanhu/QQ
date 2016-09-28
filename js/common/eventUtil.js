/**
 * Created by ZhenyanHU on 2016/9/6.
 */
define(function () {
    return {
        addEvent: function (ele, type, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false);
            } else if (e.attachEvent) {
                ele.attachEvent('on' + type, handler);
            }
            else {
                ele['on' + type] = handler;
            }
        },
        removeEvent: function (ele, type, handler) {
            if (ele.removeEventListener) {
                ele.removeEventListener(type, handler, false);
            }
            else if (ele.detachEvent) {
                ele.detachEvent('on' + type, handler);
            } else {
                ele['on' + type] = null;
            }
        },
        getEvent: function (e) {
            return e ? e : window.event;
        },
        getElement: function () {
            var e = this.getEvent(e);
            return e.target || e.srcElement;
        },
        getType: function () {
            var e = this.getEvent(e);
            return e.type;
        },
        stopBubble: function (e) {
            var e = this.getEvent(e);
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        },
        stopDefault: function (e) {
            var e = this.getEvent(e);
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        }
    }
});