// 该实例测试的是点击首页左侧城市选择框
var cityOffset = page.evaluate(function(){ return $("#criteriaSelect").next().offset()});

// 初始化的一些准备
var boxtOffset = page.evaluate(function() {
    return $("#searchBox").find("ul.searchBoxUl a").eq("0").offset(); 
});
page.sendEvent('click', boxtOffset.left + 1, boxtOffset.top + 1);	// 先点击到第一个tab标签
page.sendEvent('click', 1, 1);	// 点击到外围区域

var bodyHeight = page.evaluate(function(){ return $("body").outerHeight(true)});
page.clipRect = { top: 0, left: 0, width: 1024, height: bodyHeight };

// 测试1 点开城市选择框
page.sendEvent('click', cityOffset.left + 1, cityOffset.top + 1);
page.render('01.jpg');

// 测试2 鼠标点击任意城市
page.evaluate(function(){ $("#"+$("#criteriaSelect").next().attr("id").replace("selhead","selroot")).find("li").eq(3).trigger("click") });
page.render('02.jpg');

// 测试3 点击城市选择框输入sy

// 测试4 点击城市选择框输入sanya

// 测试5 点击城市选择框输入s，按键盘下3次，上2次
