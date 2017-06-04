var exec = require("child_process").exec;
var spawn = require("child_process").spawn;
var iconv = require('iconv-lite');

function execCmd(cmd, render) {
        exec(cmd,{ encoding: 'binary',
                timeout:100000,
                maxBuffer:200*1024,
                killSignal:'SIGTERM',
                cwd:null,
                env:null
                },
                function ( error, stdout, stderr) {
                        var str = iconv.decode(stdout, 'utf-8');
                        var data = iconv.encode(str, 'GBK');
                        render(str); 
        });        

}

function excuteShell(cmd,args, render, time){

        free  = spawn(cmd, args); // cmd is String, args is Array;

        free.stdout.on('data', function (data) {
            render(data);
        });
        
        free.stderr.on('data', function (data) {
            render(data);
        });
        
        free.on('exit', function (code, signal) {
            render(data);
        });
        
        setTimeout(function (time){
           process.exit(0);
        }, time * 1000);

}

function perHour(render) {

        var cmd = "curl http://10.173.45.201:56808/monitor";
        execCmd(cmd, render);
}

function baseData(render) {
        var cmd = "curl http://10.173.45.201:56808/operationData";
        execCmd(cmd, render);
}

function getTemperature(render) {
        var get_excute_path = process.cwd();
        // console.log(get_excute_path);
        console.log(__dirname);
        var cmd = __dirname + "/get_cpu_temperature.exp | grep -A5 information";
        console.log(cmd);
        execCmd(cmd, render);
}

function pingServer(render) {
        var get_excute_path = process.cwd();
        // console.log(get_excute_path);
        console.log(__dirname);
        var cmd = __dirname + "/check_local_network.bash";
        console.log(cmd);
        execCmd(cmd, render);
}

exports.perHour = perHour;
exports.baseData = baseData;
exports.getTemperature = getTemperature;
exports.pingServer = pingServer;
