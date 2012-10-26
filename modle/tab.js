// 该实例测试的是首页左侧Tab标签

// 初始化的一些准备
var boxtOffset = page.evaluate(function() {
    return $("#searchBox").find("ul.searchBoxUl a").eq("0").offset(); 
});
page.sendEvent('click', boxtOffset.left + 1, boxtOffset.top + 1);	// 先点击到第一个tab标签
page.sendEvent('click', 1, 1);	// 点击到外围区域

// 测试1 点击第一个tab
var elementOffset = page.evaluate(function() {
    return $("#searchBox").find("ul.searchBoxUl a").eq("0").offset(); 
});

var boxOffset = page.evaluate(function(){
	return $("#searchBox").offset();
})

var boxWH = page.evaluate(function(){
	return { width: $("#searchBox").outerWidth(), height: $("#searchBox").outerHeight()}
})

page.clipRect = { top: boxOffset.top, left: boxOffset.left, width: boxWH.width, height: boxWH.height };

page.sendEvent('click', elementOffset.left + 1, elementOffset.top + 1);
page.render('01.jpg');


// 测试2 点击第二个tab
var elementOffset = page.evaluate(function() {
    return $("#searchBox").find("ul.searchBoxUl a").eq("1").offset(); 
});

page.sendEvent('click', elementOffset.left + 1, elementOffset.top + 1);
page.render('02.jpg');


// 测试3 点击第三个tab
var elementOffset = page.evaluate(function() {
    return $("#searchBox").find("ul.searchBoxUl a").eq("2").offset(); 
});

page.sendEvent('click', elementOffset.left + 1, elementOffset.top + 1);
page.render('03.jpg');