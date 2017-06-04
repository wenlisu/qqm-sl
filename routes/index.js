var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var iconv = require('iconv-lite');
var response = require('../mongoose/response');
var monitorPerHourFind = require('../mongoose/monitorPerHourFind');

var monitor = require('./jsGetData/monitor');
var router_array_authorize = [
     '/index', '/monitorPerHours','/monitorPerHoursPost', 
    '/formExcelPost','/monitorBaseData', '/monitorBaseDataPost',
    '/getTemperature', '/getTemperaturePost', 
    '/pingServer', '/pingServerPost' 
    ]; 

router.get('/', function(req, res) {
    res.render('login', { title: '缺钱么运维支撑管理系统-登陆' });
})
router.get('/registered', function(req, res) {
    res.render('registered', { title: '缺钱么运维支撑管理系统-注册' });
})
router.get(router_array_authorize, checknotLogin);
// router.get('/index', checknotLogin)
router.get('/index', function(req, res) {
	console.log(req.url);
    res.render('index', { title: '缺钱么运维支撑管理系统-首页' });      
});

router.get('/logout', function(req, res) {
    // login_flag = 0;
    req.session.user = null;
    res.redirect('login');
});

router.get('/onTimeLog', function(req, res) {
    res.render('../views/onTimeLog', { title: 'onTimeLog'});
});
 
router.get('/getTemperature', function(req, res) {
    res.render('../views/machineServer/getTemperature', { title: 'getTemperature'});
});

router.post('/getTemperaturePost', function(req, res) {
    monitor.getTemperature(function (str) {                 
            console.log(str);
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(str);
            res.end();
    });
});

router.get('/pingServer', function(req, res) {
    res.render('../views/machineServer/pingServer.html', { title: 'pingServer'});
});

router.post('/pingServerPost', function(req, res) {
     monitor.pingServer(function (str) {                
            console.log(str);
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(str);
            res.end();
    });
});


 router.get('/monitorPerHours', function(req, res) {
        // monitor.perHour(function (str) {
            res.render('monitorPerHours', { title: '缺钱么运维支撑管理系统', monitorPerHours: " "}); 
        // }); 
 });

 router.post('/monitorPerHoursPost', function(req, res) {
            var objdata = {
                date0: req.body.date0,
                date1: req.body.date1
            };
            var download = 0;
            monitorPerHourFind.getResultByFindDate(objdata, res, response.responseData, download);
 });

  router.post('/testPost', function(req, res) {
            var objdata = {
                // date0: "2016-08-08",
                // date1: "2016-08-08"
                date0: String(req.body.date0),
                date1: String(req.body.date1)               
            };
            console.log(req.body.date0);
            var download = 0;
            monitorPerHourFind.getResultByFindDate(objdata, res, response.responseData, download);
 });

 router.post('/formExcelPost', function(req, res) {
            var objdata = {
                date0: String(req.body.date0),
                date1: String(req.body.date1)               
            };
            var download = 1;
            monitorPerHourFind.getResultByFindDate(objdata, res, response.responseData, download);
 });


router.get('/monitorBaseData', function(req, res) {
           res.render('monitorBaseData', { title: '缺钱么运维支撑管理系统', monitorBaseData: " " }); 
});

router.post('/monitorBaseDataPost', function(req, res) {

        monitor.baseData(function (str) {
            var a = String(str);
            var b = a.split("\n");
            var delete0 = b.shift();
            var str1 = new String();
            var strArr = new Array();
            for(var i=0;i<b.length - 1; i++) {
                  var arr = String(b[i]).split(/\s+/);
                  var arr0 = arr[0];
                   strArr[i] = "<tr>" + 
                                 "<td align=center>" + arr[0] + "</td>" + 
                                 "<td align=center>" + arr[1] + "</td>" +
                                 "<td align=center>" + arr[2] + "</td>" +
                                 "<td align=center>" + arr[3] + "</td>" +
                                 "<td align=center>" + arr[4] + "</td>" +
                                 "<td align=center>" + arr[5] + "</td>" +
                                 "<td align=center>" + arr[6] + "</td>" +
                                 "<td align=center>" + arr[7] + "</td>" +
                                 "<td align=center>" + arr[8] + "</td>" +
                                 "<td align=center>" + arr[9] + "</td>" +
                                 "<td align=center>" + arr[10] + "</td>" +
                                 "<td align=center>" + arr[11] + "</td>" +
                                 "<td align=center>" + arr[12] + "</td>" +
                                 "<td align=center>" + arr[13] + "</td>" +
                                 "<td align=center>" + arr[14] + "</td>" +
                               "</tr>"

                   str1 = str1 + String(strArr[i]);
            }
            console.log(str1);
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(str1);
            res.end();
        });

});



// router.get('/tools', checknotLogin)
router.get('/tools', function(req, res) {
    res.render('tools', { title: 'tools' });
});

router.post('/authorize',function(req, res){
    var user = {
        email: 'qqm@queqianme.com',
        password: '123456'
    };
    var loginStatus = {
	success: 700,
	failed:  744
    };
    console.log(req.body)
    if(req.body.email === user.email && req.body.password === user.password){
        req.session.user = req.body.email;
        console.log(req.session);
        console.log(req.url);
        console.log(req.params);

        if(req.session.user){ 
	   loginStatus.success = 800;
           req.flash("ok", 'good');
        } 
    } else {
	   loginStatus.failed = 844;
        console.log('login failed test');
    }
    var loginJson = JSON.stringify(loginStatus);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(loginJson);
    res.end();

});

router.get('/show', function(req, res) {
        console.log("Request /ma 'ma64' was called.");
        console.log("Request /ma 'start' was called.");
        var cmd = "cat package.json";
        exec(cmd,{ encoding: 'binary',
                timeout:100000,
                maxBuffer:200*1024,
                killSignal:'SIGTERM',
                cwd:null,
                env:null
                },
                function ( error, stdout, stderr) {
                        var str = iconv.decode(stdout, 'utf-8');
                        var str1 = iconv.encode(str, 'GBK');
                        var strjson = JSON.stringify(stdout);
                        var jsonstr = JSON.parse(strjson);

                        res.render('show', { data: jsonstr + strjson + str1});
                        // res.writeHead(200, {"Content-Type": "text/plain"});
                        // res.write(str1);
                        // res.write(strjson);
                    
                        // res.write(jsonstr);                      
                        // res.end();
        });
});

function checknotLogin(req, res, next) {
    if(req.session.user){
        next();
    } else {
        return res.redirect('login'); 
    }
    
}

module.exports = router;

