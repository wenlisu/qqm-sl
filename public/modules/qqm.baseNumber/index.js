'use strict';

layui.use(['form', 'laypage', '_config','_route', '_fetch', '_view'], function () {
  var form = layui.form()
    , laypage = layui.laypage
    , _route = layui._route
    , _fetch = layui._fetch
    ,api = layui._config.api
    , layer = layui.layer
    , _view = new layui._view('#qqm-tpl');

  _fetch(api + 'user/login', {
        "phone": "15298765432",
        "password": "123456"
    }).then(function(data) {
        // console.log("data", data);
    }, function(err) {
        // console.log("err", err);
        layer.alert(err);
    });
        layer.alert('err', {icon: 2});


  // 初始化当前位置
  _route.setBreadcrumb(['运营数据检测', '运营基础数据统计']);

  // 渲染表单
  form.render();

  // 自定义验证规则
  form.verify({
    username: function (value) {
      if (value.length > 20) {
        return '用户名称过长，请重新输入';
      }
    },
    phone: function (value) {
      if (value && (value.length > 11 || value.length < 6)) {
        return '请输入正确的联系方式';
      }
    }
  });

  // 分页初始化
  laypage({
    cont: 'qqm-page-default'
    , pages: 20
    , first: 1
    , jump: function (data) {
      // layer.msg('显示第' + data.curr + '页');
    }
  });


});