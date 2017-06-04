layui.use(['element', '_fetch', '_config', '_route'], function(exports) {
    var element = layui.element() //导航的hover效果、二级菜单等功能，需要依赖element模块
    , _route = layui._route
    ,_fetch = layui._fetch
     ,api = layui._config.api;

    _fetch(api + 'user/login', {
        "phone": "15298765432",
        "password": "123456"
    }).then(function(data) {
        // console.log("data", data);
    }, function(err) {
        console.log("err", err);
    });
    //监听导航点击
    element.on('nav(demo)', function(elem) {
        var mUrl = elem.attr('qqm-menu');
        !_.isEmpty(mUrl) && _route.go(mUrl);
    });

});
