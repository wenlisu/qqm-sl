
layui.use(['form', 'laypage', '_config', '_route', '_fetch', '_view'], function() {
'use strict';
    var _route = layui._route,
    form = layui.form(),
    _view = new layui._view('#logView');
 // 初始化当前位置
  _route.setBreadcrumb(['后台log日志', '后端log实时日志']);
  // 渲染表单
  form.render();
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    _view.render($("#logView"),data);
    return false;
  });

});
