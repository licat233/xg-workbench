layui.use(['table', 'form'], function () {
    var table = layui.table
        , form = layui.form;
    table.render({
        elem: '#web'
        , url: '/weblist/webdata'
        , cellMinWidth: 80
        , cols: [[
            {type:'numbers'}
            , { field: 'id', title: 'ID',width:60 }
            , { field: 'url', title: '链接' }
            , { field: 'paas_name', title: '平台'}
        ]]
    });

    table.on('row(web)', function(obj){
        // alert(obj.tr) //得到当前行元素对象
        // console.log(obj.data) //得到当前行数据
        //obj.del(); //删除当前行
        //obj.update(fields) //修改当前行数据
        var webdata = obj.data;
        var select = 'dd[lay-value=' + webdata.paas_id + ']';
        layer.open({
            type: 1
            ,title:['链接信息']
            ,btn:['确定','取消']
            ,closeBtn: 0
            ,anim: 0
            ,btnAlign: 'c'
            ,shadeClose:true
            ,maxmin:false
            ,skin: 'layui-layer-rim' //加上边框
            ,area: ['375px', 'auto'] //宽高
            ,content: $('#editwebwindow')
            ,success:function(index){
                $('#editpaas_id').siblings("div.layui-form-select").find('dl').find(select).click();
              $('#editid').val(webdata.id);
              $('#editurl').val(webdata.url);
              $('#editpaas_id').val(webdata.paas_id);
              $('#editplugin').val(webdata.js_plugin);
            }
            ,yes:function(index){
              if(!($('#editurl').val()).trim()){
                layer.msg("链接不能为空！",{time:2000});
                return;
              }
              $.post('/paaslist/editurl',{
                  id:webdata.id
                  ,paas_id:$('#editpaas_id').val()
                  ,url:$('#editurl').val()
                  ,js_plugin:$('#editplugin').val()
              }
            ,function(index){
                layer.msg('编辑成功',{time:2000});
                window.location.reload();
            })
           }
        });
      });

});

function deleteweb()
{
  layer.confirm("<span style='color:red;font-weight:bold'>警告：该操作不可恢复！确定删除吗？</span>",{title:'删除确认'}, function(index){
    $.post('/paaslist/delurl',{id:$('#editid').val()},function(ret){
        layer.msg('删除成功',{time:2000});
        layui.use(['table'], function () {
                  var table = layui.table;
                  table.reload('web');
                });
    })
  layer.close(index);
});
}

function addweburl()
{
  layer.open({
            type: 1
            ,title:['添加链接']
            ,btn:['确定','取消']
            ,closeBtn: 0
            ,anim: 0
            ,btnAlign: 'c'
            ,shadeClose:true
            ,maxmin:false
            ,skin: 'layui-layer-rim' //加上边框
            ,area: ['375px', 'auto'] //宽高
            ,content: $('#addwebwindow')
            ,success:function(index){
              $('#addurl').val('');
              $('#addpaas_id').val('');
              $('#addplugin').val('');
            }
            ,yes:function(index){
              if(!($('#addurl').val()).trim()){
                layer.msg("链接不能为空！",{time:2000});
                return;
              }
              $.post('/paaslist/addurl',{
                  paas_id:$('#addpaas_id').val()
                  ,url:$('#addurl').val()
                  ,js_plugin:$('#addplugin').val()
              }
            ,function(data){
                if(data == 3){
                  layer.msg('添加失败，原因：该链接已存在！',{time:4000});
                }else{
                  layer.msg('添加成功',{time:2000});
                  window.location.reload();
                }
            })
           }
        });
  
}