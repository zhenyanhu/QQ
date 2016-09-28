/**
 * Created by ZhenyanHU on 2016/9/6.
 */
require.config({
    baseUrl: "js",
    paths: {
        getEle: "common/getEle",
        event: "common/eventUtil",
        drag: "drag",
        slide: "slide"
    }
});
require(["event", "getEle", "drag"], function (event, ele, d) {
    /* console.log(ele.test);
     console.log(ele.getById("loginPanel"));
     console.log(ele.getByClass("login-state-down",e.getById("loginState")));*/
    var i = 0;
    var bottomDiv = ele.getByClass("bottomDiv")[0];
    var loginBtn = ele.getByClass("btn", bottomDiv)[0];
    var handler = function (evt) {
        console.log("I am login button");
        event.stopDefault(evt);
        if (i > 1) {
            event.stopBubble(evt);
        }
        if (i > 3) {
            event.removeEvent(loginBtn, "click", handler);
            console.log("My click event is removed");
        }
        i++;
    };
    var parentHandler = function () {
        console.log("I am parent");
    };
    event.addEvent(loginBtn, "click", handler);

    event.addEvent(bottomDiv, "click", parentHandler);
});