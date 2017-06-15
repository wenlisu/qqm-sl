'use strict';

layui.use(['form', 'element', 'laypage', '_route', 'laydate', 'laytpl', 'echarts', '_method', '_view', '_fetch'], function() {
    var form = layui.form(),
        element = layui.element(),
        laypage = layui.laypage,
        _route = layui._route,
        layer = layui.layer,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        echarts = layui.echarts,
        _method = layui._method,
        api = layui._config.proApi,
        _view = new layui._view('#table'),
        _fetch = layui._fetch,
        date0, date1;
    // 监听时间选择
    date0 = {
        min: '1910-01-01 23:59:59',
        max: '2099-01-01 23:59:59',
        format: 'YYYY-MM-DD hh:mm',
        choose: function(datas) {
            date0.min = datas; //开始日选好后，重置结束日的最小日期
            date0.start = datas; //将结束日的初始值设定为开始日
        }
    };

    date1 = {
        min: '1910-01-01 23:59:59',
        max: '2099-01-01 23:59:59',
        format: 'YYYY-MM-DD hh:mm',
        choose: function(datas) {
            date1.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    $('#date0').on('click', function() {
        date0.elem = this;
        laydate(date0);
    });

    $('#date1').on('click', function() {
        date1.elem = this;
        laydate(date1);
    });

    // 初始化当前位置
    _route.setBreadcrumb(['运营数据检测', '运营每时粒度监控']);

    // 渲染表单
    form.render();

    // 监听提交按钮
    form.on('submit(search)', function(data) {
        _fetch('/monitorPerHoursPost',
            data.field
        ).then(function(data) {
            if (!!data.formData) {
                $("#monitorView").html(data.formData);
            } else {
                $("#monitorView").html('<tr>\
                                            <td colspan="7">暂无数据</td>\
                                        </tr>');
            }
        }, function(err) {
            layer.alert(err, { icon: 2 });
        });
        return false;
    });
    var myLine = echarts.init(document.getElementById('chartLine'));
    var myBar = echarts.init(document.getElementById('chartBar'));
    // 指定图表的配置项和数据
    var optionLine = {
        title: {
            text: '缺钱么业务时粒度性能数据'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    var optionBar = {
        title: {
            text: '缺钱么业务时粒度性能数据'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    /*myLine.setOption(optionLine);
    myBar.setOption(optionBar);*/

    // 监听导出Excel
    $('#excel').on('click', function() {
        _method('tableExcel');
    });
});
