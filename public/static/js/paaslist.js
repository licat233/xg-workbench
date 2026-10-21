layui.use(['table','form'], function(){
    var table = layui.table
    ,form = layui.form;
    // table.render({
    //   elem: '#paas'
    //   ,url:'/static/json/paas.json'
    //   ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    //   ,cols: [[
    //     {field:'id', title: 'ID'}
    //     ,{field:'name', title: '名称'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
    //     ,{field:'admine', title: '管理员'}
    //     ,{field:'status', title: '状态'}
    //     ,{field:'ps', title: '备注'}
    //   ]]
    // }); 
});

///添加链接
  function addwebwindow(obj) {
    var id = obj;
    layer.open({
              type: 1
              ,title:['添加新链接']
              ,btn:['确定','取消']
              ,closeBtn: 0
              ,anim: 0
              ,btnAlign: 'c'
              ,shadeClose:false
              ,shade:false
              ,maxmin:false
              ,skin: 'layui-layer-rim' //加上边框
              ,area: ['375px', 'auto'] //宽高
              ,content: $('#addwebwindow')
              ,success:function(layero,index){
                // $('#url').val(id);
              }
              ,yes:function(index,layero){
                if(!($('#url').val()).trim()){
                  layer.msg("链接不能为空！",{time:2000});
                  return;
                }
                $.post('/paaslist/addurl',{
                    paas_id:id
                    ,url:$('#url').val()
                    ,plugin:$('#plugin').val()
                }
              ,function(data){
                  if(data == 3){
                  layer.msg('添加失败，原因：该链接已存在！',{time:4000});
                }else{
                  layer.close(index);
                  layer.msg('添加成功',{time:2000});
                  window.location.reload();
                }
              })
             }
          });
  }


///编辑链接
  function editwebwindow(urlid) {
    // var json_url="/static/json/web.json";//?timestamp=" + Math.random();
    var json_url="/paaslist/webdata";
    $.getJSON(json_url,function(jsondata){
      $.each(jsondata.data, function(i, item) {
         if(item.id==urlid){
           webdata = item;
         }
       });
       var select = 'dd[lay-value=' + webdata.paas_id + ']';
    layer.open({
              type: 1
              ,title:['链接信息']
              ,btn:['确定','取消']
              ,closeBtn: 0
              ,anim: 0
              ,btnAlign: 'c'
              ,shadeClose:false
              ,shade:false
              ,maxmin:false
              ,skin: 'layui-layer-rim' //加上边框
              ,area: ['375px', '550px'] //宽高
              ,content: $('#editwebwindow')
              ,success:function(layero,index){
                $('#editpaas_id').siblings("div.layui-form-select").find('dl').find(select).click();
                $('#editid').val(urlid);
                $('#editurl').val(webdata.url);
                $('#editpaas_id').val(webdata.paas_id);
                $('#editplugin').val(webdata.js_plugin);
              }
              ,yes:function(index,layero){
                if(!($('#editurl').val()).trim()){
                  layer.msg("链接不能为空！",{time:2000});
                  return;
                }
                $.post('/paaslist/editurl',{
                    id:urlid
                    ,paas_id:$('#editpaas_id').val()
                    ,url:$('#editurl').val()
                    ,js_plugin:$('#editplugin').val()
                }
              ,function(data){
                layer.close(index);
                  layer.msg('编辑成功',{time:2000});
                   window.location.reload();
              })
             }
          });
        })
  }

  function addpaaswindow() {
    $("#delpaas").css('display','none');
    layer.open({
              type: 1
              ,title:['添加新平台/项目']
              ,btn:['确定','取消']
              ,closeBtn: 0
              ,anim: 0
              ,btnAlign: 'c'
              ,shadeClose:false
              ,shade:false
              ,maxmin:false
              ,skin: 'layui-layer-rim' //加上边框
              ,area: ['375px', 'auto'] //宽高
              ,content: $('#addpaaswindow')
              ,success:function(layero,index){
                 $('#name').val("");
                 $('#admine').val("");
                 $('#code1').val("");
                 $('#code2').val("");
                 $('#code3').val("");
              }
              ,yes:function(index,layero){
                if(!($('#name').val()).trim()){
                  layer.msg("平台名字不能为空！",{time:2000});
                  return;
                }
                $.post('/paaslist/addpaas',{
                  name:$('#name').val()
                  ,admine:$('#admine').val()
                  ,code1:$('#code1').val()
                  ,code2:$('#code2').val()
                  ,code3:$('#code3').val()
                }
              ,function(data){
                  layer.close(index);
                  layer.msg('添加成功',{time:2000});
                   window.location.reload();
              })
             }
          });
  }

function editpaaswindow(paas_id) {
  $("#delpaas").css('display','block');
    // var json_url="/static/json/paas.json";///如果有缓存则加上：?timestamp=" + new Date().getTime();;
    var json_url="/paaslist/paasdata";
    $.getJSON(json_url,function(jsondata){
      $.each(jsondata.data, function(i, item) {
         if(item.id==paas_id){
          paasdata = item;
         }
       });
    layer.open({
              type: 1
              ,title:['平台/项目信息']
              ,btn:['确定','取消']
              ,closeBtn: 0
              ,anim: 0
              ,btnAlign: 'c'
              ,shadeClose:false
              ,shade:false
              ,maxmin:false
              ,skin: 'layui-layer-rim' //加上边框
              ,area: ['375px', 'auto'] //宽高
              ,content: $('#addpaaswindow')
              ,success:function(layero,index){
                 $('#paasid').val(paas_id);
                 $('#name').val(paasdata.name);
                 $('#admine').val(paasdata.admine);
                 $('#code1').val(paasdata.code1);
                 $('#code2').val(paasdata.code2);
                 $('#code3').val(paasdata.code3);
              }
              ,yes:function(index,layero){
                if(!($('#name').val()).trim()){
                  layer.msg("平台名字不能为空！",{time:2000});
                  return;
                }
                $.post('/paaslist/editpaas',{
                	id:paas_id
                   ,name:$('#name').val()
                  ,admine:$('#admine').val()
                  ,code1:$('#code1').val()
                  ,code2:$('#code2').val()
                  ,code3:$('#code3').val()
                }
              ,function(data){
                  layer.close(index);
                  layer.msg('编辑成功',{time:2000});
                  window.location.reload();
              })
             }
          });
      });
  }

function deleteweb()
{
  layer.confirm("<span style='color:red;font-weight:bold'>警告：该操作不可恢复！确定删除吗？</span>",{title:'删除确认'}, function(index){
    $.post('/paaslist/delurl',{id:$('#editid').val()},function(ret){
        layer.msg('删除成功',{time:2000});
        window.location.reload();
    })
  layer.close(index);
});
}

function deletepaas()
{
  layer.confirm("<span style='color:red;font-weight:bold'>警告：该操作不可恢复！确定删除吗？</span>",{title:'删除确认'}, function(index){
    $.post('/paaslist/delpaas',{id:$('#paasid').val()},function(ret){
        layer.msg('删除成功',{time:2000});
        window.location.reload();
    })
  layer.close(index);
});
}