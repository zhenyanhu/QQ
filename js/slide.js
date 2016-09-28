/**
 * Created by ZhenyanHU on 2016/9/5.
 */


seajs.config({
    baseUrl: "js/common",
    path: {
        eventUtil: "eventUtil",
        getEle: "getEle"
    }
});
seajs.use(["eventUtil", "getEle"], function (event, getEle) {
    var slideNum = 6;
    initial();
    function initial() {
        var box = getEle.getByClass("slide_box")[0];
        var record = getEle.getByClass("record", box)[0];
        console.log(record.nodeType);
        var secondImgNode = createImage("images/lunhuan1.jpg", box, record);
        for (var i = 0; i < slideNum; i++) {
            var spanNode = document.createElement("span");
            record.appendChild(spanNode);
            (function (i) {
                spanNode.onmouseover = function () {
                    if (!box.getElementsByTagName("a")[i]) {
                        createImage("images/lunhuan" + (i) + ".jpg", box, record);
                    }
                    if (!box.getElementsByTagName("a")[i + 1] && i < 5) {
                        box.getElementsByTagName("img")[i].style.display = "block";
                        hideOthersImages(box, i)
                        createImage("images/lunhuan" + (i + 1) + ".jpg", box, record);
                    }
                };
            }(i))
        }
    }

    function hideOthersImages(parentNode, index) {
        var children = parentNode.childNodes;
        for (var i in children - 1) {
            if (i !== index) {
                parentNode[index].style.display = 'none';
            }
        }
    }

    function createImage(src, parentNode, beforeNode) {
        var aNode = document.createElement("a");
        aNode.setAttribute("href", "#");
        var imgNode = document.createElement("img");
        imgNode.setAttribute("src", src);
        imgNode.style.display = "none";
        aNode.appendChild(imgNode);
        parentNode.insertBefore(aNode, beforeNode);
    }
});
