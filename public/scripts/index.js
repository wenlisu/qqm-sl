  layui.use(['layer', 'util', 'element', '_route', 'form', '_tab'], function() {
      var layer = layui.layer,
          util = layui.util,
          element = layui.element(),
          form = layui.form(),
          _route = layui._route,
          tab = layui._tab;

      window.$ = layui.jquery;
      tab = tab({
          elem: '.admin-nav-card' //设置选项卡容器
              ,
          contextMenu: true
      });
      // 监听修改密码点击
      $('#updatePassword-btn').on('click', function() {
          layer.open({
              type: 1,
              shadeClose: true,
              title: '修改密码',
              offset: '20%',
              content: $('#updatePassword')
          });
      });

      // 监听导航点击
      element.on('nav(menu)', function(elem) {
          var mUrl = elem.attr('qqm-menu') || null,
              mTitle = elem.attr('qqm-title') || null,
              mT = {
                  title: mTitle,
                  url: mUrl
              };
          !_.isEmpty(mUrl) && _route.go(mUrl);
          if (mT.title && mT.url) {
              tab.tabAdd(mT);
          }
      });
      element.on('tab(admin-tab)', function(data) {
          var tabUrl = $(this).attr("lay-id");
          !_.isEmpty(tabUrl) && _route.go(tabUrl);

      });
      // 监听修改密码提交
      form.on('submit(updatePassword)', function(data) {
          var username = $("#email").val();
          var oldPassword = $("#oldPassword").val();
          var password = $("#password").val();
          var confirmPassword = $("#confirmPassword").val();
          if (confirmPassword !== password) {
              layer.alert("两密码不一致，请重新输入！", {
                  icon: 2
              });
          }
          var registData = {
              "uname": username,
              "opwd": oldPassword,
              "newpwd": password,
              "cfpwd": confirmPassword
          };
          $.ajax({
              url: '/updatePassword',
              type: 'post',
              data: registData,
              success: function(data) {
                  if (data.status == 0 && data.err !== null) {
                      layer.alert(data.err, {
                          icon: 2
                      });
                  } else if (data.status == 0 && !data.err) {
                      layer.alert("密码修改成功！", {
                              icon: 1
                          },
                          function(index) {
                              layer.closeAll();
                          });
                  }
              },
              error: function(data) {
                  layer.alert(data.err, {
                      icon: 2
                  });
              }
          });
          return false;
      });

      // 初始化欢迎页面
      _route.setBreadcrumb(null, {
          hide: true
      });

      $('#qqm-content').css('height', $(window).height() - 200);
      $(window).resize(function() {
          $('#qqm-content').css('height', $(window).height() - 200);
      });

  });
