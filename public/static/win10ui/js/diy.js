function isMB(){
   return (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
}

function logout() {
    $.post('./index/logout', { logout: true }, function (data) {
        layer.msg('注销成功！', { time: 1000 }, function () {
            document.body.onbeforeunload = function () { };
            window.location.href = "./login";
            window.close();
        });
    })
}

function lock() {
    document.body.onbeforeunload = function () { };
    window.location.href = "./lock";
    window.close();
}

function openweb(url) {
    layer.open({
        type: 2,
        title: 'AD落地页',
        shadeClose: false,
        shade: false,
        area: ['375px', '812px'],
        content: String(url)
    });
}

function jisuanqiwindow() {
    layer.open({
        type: 2,
        title: '计算器',
        shadeClose: false,
        shade: false,
        area: ['550px', '510px'],
        content: './index/newredirect'
    });
}

function autoFullScreen() {
    if (deskStatusid === 0) { Win10.enableFullScreen(); }
    else if (deskStatusid === 1) { Win10.disableFullScreen(); }
    else { Win10.enableFullScreen(); }
}

function RefreshDesktop() {
    document.body.onbeforeunload = function () { };
    Win10.renderShortcuts();
    //window.location.reload();
}

function update_log() {
    layer.open({
        type: 2,
        title: '更新日志',
        shadeClose: false,
        shade: false,
        area: ['380px', '90%'],
        content: '/index/log' //iframe的url
      }); 
}

function user_comment() {
    layer.open({
        type: 2,
        title: '網友留言',
        shadeClose: false,
        shade: false,
        area: ['800px', '600px'],
        content: '/log/user_comments' //iframe的url
      }); 
}

function login_log() {
    layer.open({
        type: 2,
        title: '登录失败日志',
        shadeClose: false,
        shade: false,
        area: ['800px', '600px'],
        content: 'log/login_error_log' //iframe的url
      }); 
}
function switch_log() {
    layer.open({
        type: 2,
        title: '切换日志',
        shadeClose: false,
        shade: false,
        area: ['600px', '800px'],
        content: 'log/user_switch_log' //iframe的url
      }); 
}
function webcodesafe() {
    layer.open({
        type: 2,
        title: '防盗监测',
        shadeClose: false,
        shade: false,
        area: ['600px', '800px'],
        content: 'log/webcodesafe' //iframe的url
      }); 
}

function webonlinenum() {
  if(isMB()){
    Win10.openUrl('https://online.licat.work/?adm=licatwork','<img class=\'icon\' src=\'/static/win10ui/img/icon/onlinenum.png\'/>实时在线人数');
  }else{
    layer.open({
        type: 2,
        title: '網站在線人數監控微服務',
        shadeClose: false,
        shade: false,
        area: ['600px', '800px'],
        content: 'https://online.licat.work/?adm=licatwork' //iframe的url
      }); 
  }
}

function popincharge() {
  if(isMB()){
    Win10.openUrl('https://popin.licat.work/charge','<img class=\'icon\' src=\'/static/win10ui/img/icon/money.png\'/>POPin实时消耗');
  }else{
     layer.open({
        type: 2,
        title: 'Popin消耗面板',
        shadeClose: false,
        shade: false,
        area: ['550px', '500px'],
        content: 'https://popin.licat.work/charge' //iframe的url
      }); 
  }
}

function linecharge() {
  if(isMB()){
    Win10.openUrl('https://line.licat.work/total','<img class=\'icon\' src=\'/static/win10ui/img/icon/money.png\'/>Line实时消耗');
  }else{
     layer.open({
        type: 2,
        title: 'Line实时消耗',
        shadeClose: false,
        shade: false,
        area: ['550px', '500px'],
        content: 'https://line.licat.work/total' //iframe的url
      }); 
  }
}

function pop_log() {
    layer.open({
        type: 2,
        title: 'POPin来访IP日志',
        shadeClose: false,
        shade: false,
        area: ['500px', '90%'],
        content: 'https://www.skincare-info.com/index/pop_log' //iframe的url
    });
}

function online_ip() {
    layer.open({
        type: 2,
        title: 'POPin访问量',
        shadeClose: false,
        shade: false,
        area: ['300px', '300px'],
        content: 'https://www.skincare-info.com/index/online_ip' //iframe的url
    });
}

function jiechiSET() {
  var btnhtml = '<div class="layui-form-item"> <label class="layui-form-label">开关</label> <div class="layui-input-block"> <input type="checkbox" name="status" lay-skin="switch" lay-text="开启|关闭"> </div> </div>';
  $.getJSON("./index/getswitchdata",function(result){
    layer.open({
  type: 1
  ,title: false //不显示标题栏
  ,closeBtn: false
  ,area: '300px;'
  ,shade: 0.8
  ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
  ,resize: false
  ,btn: ['我已清楚', '默默离开']
  ,btnAlign: 'c'
  ,moveType: 1 //拖拽模式，0或者1
  ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">'+btnhtml+'<h2>使用须知：</h2><br>如果有他人盗用我方代码，可在此开启劫持流量功能。<br>可选择跳转地址，即将流量劫持到哪里去！</div>'
  ,success: function(layero){}
    });
   });
}

function jiechiSETs(){
 layer.open({    
           type: 2,    
           title: '流量劫持设置',    
           maxmin: true,
           skin: 'layui-layer-lan',    
           shadeClose: true, //点击遮罩关闭层    
           area : ['400px' , '280px'],    
           content:'jiechiset.html'//弹框显示的url,对应的页面  
       }); 
}

function nowweb(){
  if(isMB()){
    Win10.openUrl('https://licat.work/index/newestlist','<img class=\'icon\' src=\'/static/win10ui/img/icon/money.png\'/>在跑落地页');
  }else{
    layer.open({
        type: 2,
        title: '在用落地页',
        shadeClose: false,
        shade: false,
        area: ['500px', '400px'],
        content: 'https://licat.work/index/newestlist' //iframe的url
    });
  }
}
