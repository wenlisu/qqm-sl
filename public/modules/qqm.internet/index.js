
layui.use(['form', 'laypage', '_config', '_route', '_fetch', '_view'], function() {
'use strict';
    var _route = layui._route,
    form = layui.form(),
    _view = new layui._view('#internetView');
 // 初始化当前位置
  _route.setBreadcrumb(['机房服务器监控', '高志大厦20楼网络连通性']);
  // 渲染表单
  form.render();
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    _view.render($("#internetView"),data);
    return false;
  });

});
