'use strict';

layui.use(['_config','_route','_fetch','jquery'], function () {
  var _route = layui._route
    , _fetch = layui._fetch
    , layer = layui.layer
    ,_fetch = layui._fetch
    ,$ = layui.jquery;
		// _fetch('/monitorBaseDataPost',
  //           { date0: "2016-08-08",
  //       	date1: "2016-08-08" 
  //       }).then(function(data) {
  //           $("#monitorView").html(data.formData);
  //       }, function(err) {
  //           layer.alert(err, { icon: 2 });
  //       });

  // 初始化当前位置
  _route.setBreadcrumb(['运营数据检测', '运营基础数据统计']);


});