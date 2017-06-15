'use strict';

(function() {

    /**
     * 加载模块
     */

    layui.config({
        version: true,
        base: 'layui_modules/'
    }).extend({ //设定模块别名
        _fetch: '_fetch',
        _config: '_config',
        _route: '_route',
        _view: '_view',
        _tab: '_tab',
        _common: '_common',
        _method: '_method',
        echarts: 'echarts'
    });
    // 设定子页面加载模式
    layui.use(['_route', '_config'], function() {
        var _route = layui._route,
            _config = layui._config;
        _route.config.base = 'modules/{0}/index.html';

        // 开启模拟数据
        _config.isMock = true;
    });
})();
