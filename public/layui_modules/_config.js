/**

 @Author：ls
 @Time:2017-05-26

 */

'use strict';

layui.define(function(exports) {
    var _config = {};

    /**
     * 环境变量
     */
    _config = {
        // api: 'http://api.gaozhi.queqianme.com/api/app/v3/',
        api: 'http://192.168.40.208/',
        proApi: 'http://192.168.1.118:8082/'
    };


    //输出_config接口
    exports('_config', _config);
});
