
layui.use(['form', 'laypage', '_config', '_route', '_fetch', '_view'], function() {
'use strict';
    var _route = layui._route,
    form = layui.form(),
    _view = new layui._view('#cpuView');
 // 初始化当前位置
  _route.setBreadcrumb(['机房服务器监控', '华为三层交换机192.168.40.246']);
  // 渲染表单
  form.render();
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    _view.render($("#cpuView"),data);
    return false;
  });

});
