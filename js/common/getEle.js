/**
 * Created by ZhenyanHU on 2016/9/6.
 */
define(function () {
    var test = "test";
    var getById = function (id) {
        return document.getElementById(id);
    };
    var getByClass = function (className, parent) {
        var Oparent = typeof parent == "string" ? parent.getElementById(parent) : document,
            resultEles = [];
        if (parent) {
            if (parent.nodeType && parent.nodeType == 1) {
                Oparent = parent;
            }
        }
        var elements = Oparent.getElementsByTagName("*");
        for (var i in elements) {
            if (elements[i].className == className || (elements.className + "").indexOf(className) > -1) {
                resultEles.push(elements[i]);
            }
        }
        return resultEles;
    };
    return {
        test: test,
        getById: getById,
        getByClass: getByClass
    };
});