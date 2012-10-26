phantom.outputEncoding = 'System';

var testResultDirectName = "test";	// 测试报告存放目录名

var page = require('webpage').create();
var fs = require("fs");
var system = require('system');


if (system.args.length === 1) {
    console.log('请使用: test.js <目标地址>');
    phantom.exit(1);
}else{
	page.address = system.args[1];
	page.resources = [];
    page.viewportSize = { width: 1024, height: 768 };

    var fileList = fs.list("tools"),
        fileLen = fileList.length;

    for(var i = 0; i < fileLen; i++){
        if(fs.isFile("tools/"+fileList[i])){
            phantom.injectJs("tools/"+fileList[i])
        }
    }

	var nowDirect = dateTime.formatCurrentDate("yyyy-MM-dd");
    var fileName = dateTime.formatCurrentDate("HH-mm-ss");

	if(!fs.isDirectory(testResultDirectName)){	// 创建测试报告目录
		fs.makeDirectory(testResultDirectName);
	}
	fs.changeWorkingDirectory(testResultDirectName);

	if(!fs.isDirectory(nowDirect)){
		fs.makeDirectory(nowDirect);
	}
	fs.changeWorkingDirectory(nowDirect);

	page.onLoadStarted = function () {
        page.startTime = new Date();
    };

    page.onResourceRequested = function (req) {
        page.resources[req.id] = {
            request: req,
            startReply: null,
            endReply: null
        };
    };

    page.onResourceReceived = function (res) {
        if (res.stage === 'start') {
            page.resources[res.id].startReply = res;
        }
        if (res.stage === 'end') {
            page.resources[res.id].endReply = res;
        }
    };
    
    page.open(page.address, function (status) {
        if (status !== 'success') {
            console.log('请求失败，请检查重试！');
        }
    });

    page.onLoadFinished = function(){
        page.endTime = new Date();
        page.title = page.evaluate(function () {
            return document.title;
        });
        var har = createHAR(page.address, page.title, page.startTime, page.resources);
        fs.write(fileName + ".har", JSON.stringify(har, undefined, 4), "w");  // 将默认检查内容写入日志

        page.evaluate(function(){$("html,body").css({
            "max-width": "1024px",
            "width": "1024px"
        });})

        fs.makeDirectory(fileName);
        fs.changeWorkingDirectory(fileName);


        var modleList = fs.list("../../../modle"),
            modleLen = modleList.length;

        for(var i = 0; i < fileLen; i++){
            if(fs.isFile("../../../modle/"+modleList[i])){
                var modleDirectName = modleList[i].toLowerCase().replace(".js","");
                fs.makeDirectory(modleDirectName);
                fs.changeWorkingDirectory(modleDirectName);
                phantom.injectJs("../../../../modle/"+modleList[i]);
                fs.changeWorkingDirectory("../");
            }
        }
        console.log("it's complate! gl!");
        phantom.exit();
    }
}