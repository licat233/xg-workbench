function IsMB() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

function Resetall(){
  $('#name').val('');
  $('#account').val('');
  $('#status').val('');
  $('#paas_id').val('');
  $('#link_pc').val('https://line.me/R/ti/p/');
  $('#link_mb').val('line://ti/p/');
  $('#office').val('');
}

function reloadOffice(tableIns,office){
    // var officeNumber = parseInt(office);
    tableIns.reload({
  where: {
    office
  }
  ,page: {
    curr: 1 //重新从第 1 页开始
  }
});
}

layui.use(['form','table','slider'], function(){
    var form = layui.form //获取form模块
    ,slider = layui.slider
  ,table = layui.table; //获取table模块
  // var user_json_url = "/static/json/user.json";//?timestamp=" + Math.random();
  var user_json_url = "/userlist/userdata";
  var tableIns =  table.render({
      skin:'line'
      ,even:false///隔行背景
      ,elem: '#user'
      ,size:IsMB()?"sm":null
      ,page:true
      ,limit:90
      ,method:"get"
      ,url:user_json_url
      ,toolbar: '#Usertoolbar' //开启头部工具栏，并为其绑定左侧模板
      ,defaultToolbar: ['707','412','filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        title: '提示'
        ,layEvent: 'LAYTABLE_TIPS'
        ,icon: 'layui-icon-tips'
      }]
      ,title: '业务号数据表'
      ,btnAlign: 'c'
      ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      ,cols: [[
      {type: 'checkbox'}
      ,{field:'id', title:'ID', width:60, unresize: true, hide:true}
        ,{field:'name', title: '姓名' ,minWidth:140} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        ,{field:'account',title: '账号',hide:IsMB()}
        ,{field:'paas_name',minWidth:140, title: '平台',templet: '#paasstyle'}
        ,{field:'prob_PCT',width:80,  templet: '#probstyle',  title: '概率'} //单元格内容水平居中
        ,{field:'datetime', title: '时间',hide:IsMB()} //单元格内容水平居中
        ,{field:'link_pc', title: 'PC链接',hide:true}
        ,{field:'link_mb', title: 'MB链接',hide:true}
        ,{title:'操作', toolbar: '#Userbar',width:80}
        ,{field:'lock', title:'状态', templet: '#switchTpl', unresize: true,width:100}
      ]]
      ,done: function(res, curr, count){
          if(res.code === 403){
              return false;
          }
        
        let activeBtnE = window.document.querySelector(`button[lay-office='${res.office}']`);
        activeBtnE&&activeBtnE.classList.add("btn-active");
        
        let that = this.elem.next();
        if(!Array.isArray(res.data)) return;
        if(res.data.length===0) return;
        res.data.forEach(function (item, index) {
                let tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']");
                if(item.status){
                  tr.attr({"style":"background-color:"+item.color+"3d"});
                  //tr.attr({"style":"background-image: linear-gradient(180deg, "+item.color+"3d 0%, #ffffff 100%)"});
                }else{
                  tr.attr({"style":"color:"+item.color});
                }
            });
        //$(".layui-table-tool").attr({"style":"background-image: linear-gradient(90deg, #007aff 0%, #007aff2d 100%)"});
        $(".layui-table-header tr").attr({"style":"background-image: linear-gradient(90deg, #007aff 0%, #007aff2d 100%);color:white"});
        $(".layui-table-header tr th").attr("style","font-weight:bold");
      }
    });
  // user_json_url = '';
  //监听单元格编辑
  // table.on('edit(user)', function(obj){
  //     var value = obj.value //得到修改后的值
  //     ,data = obj.data //得到所在行所有键值
  //     ,field = obj.field; //得到字段
  //     layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
  //   });

  /*
  //监听单元格事件
 table.on('tool(user)', function(obj){
   var data = obj.data;
 if(obj.event === 'setPaas'){
     alert("llllll");
     // layer.prompt({
     //   formType: 2
    //   ,title: '修改 ID 为 ['+ data.paas_id +'] 的用户签名'
    //   ,value: data.paas_id
    // }, function(value, index){
    //   layer.close(index);
        
    //   //这里一般是发送修改的Ajax请求
        
   //   //同步更新表格和缓存对应的值
    //   obj.update({
   //     paas_id: value
   //   });
  // });
  //   }
});
  */
 
  
  table.on('checkbox(user)', function(obj){
    //console.log(obj.tr.class);
    if(obj.checked){
      obj.tr.attr({"class":"checkstyle"});  //被选中的行变色
      obj.tr.css("background-color",obj.data.color);
    }else{
      obj.tr.attr({"class":""});
      if(obj.data.status){
        obj.tr.css("background-color",obj.data.color+"3d");
      }else{
        obj.tr.css("background-color","#fff");
      }
    }
});
  
table.on('rowDouble(user)', function(obj){
  let index = obj.tr.attr('data-index');
  let tableBox = $(this).parents('.layui-table-box');
  if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length>0) {
        tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
    } else {
        tableDiv = tableBox.find(".layui-table-body.layui-table-main");
    }
  let checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
  if (checkCell.length>0) checkCell.click();
});

  //监听上线操作
  form.on('switch(user)', function(obj){
    // var status = obj.elem.checked==true ? '在线':'离线';
    // layer.tips(this.name + '：'+ obj.elem.checked, obj.othis);
    $.post('/userlist/mdfstatus',{id:this.value,status:obj.elem.checked});
  });
  
  //批量修改事件
  table.on('toolbar(user)', function(obj){
      var checkStatus = table.checkStatus(obj.config.id);
      switch(obj.event){
        case 'getCheckData':
          var data = checkStatus.data;
          var idarr = [];
          for(var i=0;i<data.length;i++){
            idarr.push(data[i].id);
          }
          if(data.length==0){
            layer.alert("<h4 text-align='center'>请选择你要修改的账号，至少选择一个！</h4>");
          }else{
            layer.open({
              type:1
              ,title:['批量修改']
              ,btn:['确定','取消']
            //   ,skin: 'layui-layer-rim'
              ,closeBtn: 0 //不显示关闭按钮
              ,area: ['370px', '400px']
              ,shadeClose:true
              ,shade:0
              ,btnAlign: 'c'
              ,anim: 0 //弹出动画
              ,maxmin:false //是否显示最大最小化
              ,content: $('#batchuserwindow')
              ,yes:function(index,layero){
                $.post('/userlist/batchedituser',{
                    id:idarr
                    ,status:$('#batchstatus').val()
                    ,paas_id:$('#batchpaas_id').val()
                    ,prob:$('#batchprob').val()
                   // ,datetime:$('#batchdatetime').val()
                    //,timenow:datetime
                },function(data){
                  layer.close(index);
                  layer.msg('修改成功',{time:2000});
                  table.reload('user');
                })
              }
          })
        }
        break;
        case 'addUser':
            var prob = 100
            slider.render({
              elem:'#prob_PCT'
              ,min:1
              ,max:100
              ,value:100
              // ,step:0.1
              ,input:true
              ,height:200
              ,disabled:true
              ,setTips:function(value){return value;}
            });
          layer.open({
            type:1
            ,title:['添加账号']
            ,btn:['确定','取消']
          //   ,skin: 'layui-layer-rim'
            ,closeBtn: 0 //不显示关闭按钮
            ,area: ['370px', 'auto']
            ,shadeClose:true
            ,shade:0
            ,btnAlign: 'c'
            ,anim: 0 //弹出动画
            ,maxmin:false //是否显示最大最小化
            ,content: $('#userwindow')
            ,success:function(){
              $('#name').val("");
              $('#account').val("");
              $('#status').val(0);
              // $('#paas_id').val("");
              // $('#prob_PCT').val("");
             // $('#datetime').val(datetime);
              $('#link_pc').val("https://line.me/R/ti/p/");
              $('#link_mb').val("line://ti/p/");
              ($('#office')[0])&&($('#office').val(""));
            }
            ,yes:function(index,layero){
                if(!($('#name').val()).trim()){
                  layer.msg("姓名不能为空！",{time:2000});
                  return;
                }else if(!($('#account').val()).trim()){
                  layer.msg("账号不能为空！",{time:2000});
                  return;
                }
              $.post('/userlist/adduser',{
                  name:$('#name').val()
                  ,account:$('#account').val()
                  ,paas_id:$('#paas_id').val()
                  ,status: $('#status').val()
                  ,prob:prob
                  ,datetime:$('#datetime').val()
                  ,link_pc:$('#link_pc').val()
                  ,link_mb:$('#link_mb').val()
                  ,office:($('#office')[0]?$('#office').val():null)
              },function(data){
                layer.close(index);
                Resetall();
                layer.msg('添加成功',{time:2000});
                table.reload('user');
              })
          }
          ,btn2:function(){
            Resetall();
          }
          });
        break;
        case 'batchDelete':
            var data = checkStatus.data;
            var idarr = [];
            for(var i=0;i<data.length;i++){
              idarr.push(data[i].id);
              if(data[i].id ==0){
                layer.alert("<h4 text-align='center'>Sorry！调试账号不可删除!</h4>");
                return;
              }
            }
            if(data.length==0){
              layer.alert("<h4 text-align='center'>请选择你要删除的账号，至少选择一个！</h4>");
            }else{
          layer.confirm("<span style='color:red;font-weight:bold'>警告：该操作不可恢复！确定删除吗？</span>",{title:'批量删除'}, function(index){
            $.post('/userlist/deluser',{id:idarr},function(ret){
                layer.msg("已删除",{time:2000});
                table.reload('user');
            })
          // layer.close(index);
        });}
        break;
        
        // //自定义头工具栏右侧图标 - 提示
        case 'LAYTABLE_TIPS':
          layer.alert('如发现BUG有问题请上报管理员');
        break;
        case 'probReset':
          var data = checkStatus.data;
          var idarr = [];
          for(var i=0;i<data.length;i++){
            idarr.push(data[i].id);
          }
          if(data.length==0){
            layer.alert("<h4 text-align='center'>你还没有选择账号，至少一个！</h4>");
          }else{
            $.post('/userlist/probreset',{id:idarr},function(ret){
                layer.msg("概率已重置",{time:2000});
                table.reload('user');
            })
          }
          break;
        case 'xianggou':
            reloadOffice(tableIns,'412');
            break;
        case 'newde':
            reloadOffice(tableIns,'707');
            break;
        case 'wuxing':
            reloadOffice(tableIns,'808');
            break;
      };
    });
    
    //监听行工具事件————编辑账户
    table.on('tool(user)', function(obj){
      var data = obj.data;
      //console.log(obj)
      if(obj.event === 'del'){
        layer.confirm("<span style='color:red;font-weight:bold'>真的删除该账号吗？</span>",{title:'删除'}, function(index){
            $.post('/userlist/deluser',{id:data.id},function(ret){
                layer.msg("已删除",{time:2000});
                table.reload('user');
            })
          // layer.close(index);
        });
      } else if(obj.event === 'edit'){
        prob_PCT=data.prob_PCT==null?100:data.prob_PCT;
        slider.render({
          elem:'#prob_PCT'
          ,min:1
          ,max:100
          ,value:prob_PCT
          // ,step:0.1
          ,input:true
          ,height:200
          ,disabled:false
          ,setTips:function(value){return value;}
          ,change:function(value){prob_PCT = value;}
        });
        var select = 'dd[lay-value=' + data.paas_id + ']';
        layer.open({
          type:1
          ,title:['编辑信息']
          ,btn:['确定','取消']
        //   ,skin: 'layui-layer-rim'
          ,closeBtn: 0 //不显示关闭按钮
          ,area: ['370px', '650px']
          ,shadeClose:true
          ,shade:0
          ,btnAlign: 'c'
          ,anim: 0 //弹出动画
          ,maxmin:false //是否显示最大最小化
          ,content: $('#userwindow')
          ,success:function(layero,index){
            $('#paas_id').siblings("div.layui-form-select").find('dl').find(select).click();
            $('#name').val(data.name);
            $('#account').val(data.account);
            setTimeout($('#status').val(data.status));
            $('#paas_id').val(data.paas_id);
            $('#prob_PCT').val(prob_PCT);
           // $('#datetime').val(data.datetime);
            $('#link_pc').val(data.link_pc);
            $('#link_mb').val(data.link_mb);
            ($('#office')[0])&&($('#office').val(data.office));
          }
          ,yes:function(index,layero){
            if(!($('#name').val()).trim()){
              layer.msg("姓名不能为空！",{time:2000});
              return;
            }else if(!($('#account').val()).trim()){
              layer.msg("账号不能为空！",{time:2000});
              return;
            }
              $.post('/userlist/edituser',{
                  id:data.id
                  ,name:$('#name').val()
                  ,account:$('#account').val()
                  ,status:$('#status').val()
                  ,paas_id:$('#paas_id').val()
                  ,prob_PCT:prob_PCT  //$('#prob_PCT').val()
                  //,datetime:$('#datetime').val()
                  ,link_pc:$('#link_pc').val()
                  ,link_mb:$('#link_mb').val()
                  ,office:($('#office')[0]?$('#office').val():data.office)
              },function(data){
                      layer.close(index);//关闭弹出层
                      Resetall();
                      layer.msg('编辑成功',{time:1000});
                      table.reload('user');
                      // setTimeout(window.location.reload(),1000);
                //   }
              })
              
          },btn2:function(){
            Resetall();
          }
        });
      }
    });
  //监听工具条
  // table.on('tool(user)', function(obj){
  //     var data = obj.data;
  //     if(obj.event === 'del'){
  //       layer.confirm('真的删除行么', function(index){
  //         obj.del();
  //         layer.close(index);
  //       });
  //     } else if(obj.event === 'edit'){
  //       layer.alert('编辑行：<br>'+ JSON.stringify(data))
  //     }
  //   });
  });
 
