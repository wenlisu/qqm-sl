'use strict';

layui.use(['form', 'element', 'laypage', '_route', 'laydate', 'laytpl', 'echarts', '_method','_view'], function() {
    var form = layui.form(),
        element = layui.element(),
        laypage = layui.laypage,
        _route = layui._route,
        layer = layui.layer,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        echarts = layui.echarts,
        _method = layui._method,
        _view = new layui._view('#table'),
        startTime, endTime;
        // 监听时间选择
    startTime = {
        min: '1910-01-01 23:59:59',
        max: '2099-01-01 23:59:59',
        format: 'YYYY-MM-DD hh:mm:ss',
        choose: function(datas) {
            endTime.min = datas; //开始日选好后，重置结束日的最小日期
            endTime.start = datas; //将结束日的初始值设定为开始日
        }
    };

    endTime = {
        min: '1910-01-01 23:59:59',
        max: '2099-01-01 23:59:59',
        format: 'YYYY-MM-DD hh:mm:ss',
        choose: function(datas) {
            startTime.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    $('#startTime').on('click', function() {
        startTime.elem = this;
        laydate(startTime);
    });

    $('#endTime').on('click', function() {
        endTime.elem = this;
        laydate(endTime);
    });

    // 初始化当前位置
    _route.setBreadcrumb(['运营数据检测', '运营每时粒度监控']);

    // 渲染表单
    form.render();

    // 自定义验证规则
    form.verify({
        username: function(value) {
            if (value.length > 20) {
                return '用户名称过长，请重新输入';
            }
        },
        phone: function(value) {
            if (value && (value.length > 11 || value.length < 6)) {
                return '请输入正确的联系方式';
            }
        }
    });

    // 分页初始化
    laypage({
        cont: 'qqm-page-default',
        pages: 20,
        first: 1,
        jump: function(data) {
            layer.msg('显示第' + data.curr + '页');
        }
    });

    // 监听提交按钮
    form.on('submit(search)', function(data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        });
        return false;
    });

    var data = [{ time: "2017-05-01 00:00:00", registered: 370, repeat: 363, frist: 255, loansNumber: 920, loansTotal: 1089300, repaymentTotal: 148749 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 01:00:00", registered: 286, repeat: 330, frist: 208, loansNumber: 70, loansTotal: 76500, repaymentTotal: 136696 },
        { time: "2017-05-01 02:00:00", registered: 224, repeat: 238, frist: 157, loansNumber: 3, loansTotal: 3500, repaymentTotal: 74148 }
    ];
    _view.render($("#monitorView"),data);
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
    myLine.setOption(optionLine);
    myBar.setOption(optionBar);

    // 监听导出Excel
    $('#excel').on('click', function() {
        _method('tableExcel');
    });
});
