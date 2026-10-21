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

function getFans(lineid){
  $.get("https://api.licat.work/?lineid="+lineid, function(data, status){
     if(status === "success"){
       if(data.code != 200){
         setInnerText(document.getElementById(lineid),data.msg)
       }else{
         setInnerText(document.getElementById(lineid),data.res)
       }
     }else{
       setInnerText(document.getElementById(lineid),"error")
     }
  },"json");
}

function setInnerText(element, text) {
            if (typeof element.textContent == 'undefined') {
                element.innerText = text;
            } else {
                element.textContent = text;
            }
        }

function getInnerText(element) {
            if (typeof element.textContent == 'undefined') {
                return element.innerText;
            } else {
                return element.textContent;
            }
}

function renderFans(res){
  for (i in res.data) {
    let d = res.data[i].account;
    getFans(d);
  }
}

layui.use(['table'], function(){
  var table = layui.table; //获取table模块
  var user_json_url = "/fans/userdata";
    table.render({
      skin:'line'
      ,even:false///隔行背景
      ,elem: '#user'
      ,size:IsMB()?"sm":null
      ,page:false
      ,method:"get"
      ,url:user_json_url
      ,toolbar: '#Usertoolbar' //开启头部工具栏，并为其绑定左侧模板
      ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        title: '提示'
        ,layEvent: 'LAYTABLE_TIPS'
        ,icon: 'layui-icon-tips'
      }]
      ,title: '业务号数据表'
      ,btnAlign: 'c'
      ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      ,cols: [[
         {field:'id', title:'ID', width:60, unresize: true, sort: true,hide:IsMB()}
        ,{field:'name', title: '姓名' ,minWidth:140} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        ,{field:'account',title: '账号'}
        ,{field:'fans', title: '粉丝数' , templet: '#fansstyle'}
        ,{field:'paas_name',minWidth:140, title: '平台',style:'cursor: pointer;',templet: '#paasstyle',hide:(window.isVisitor||IsMB())}
        ,{field:'prob_PCT',width:80,  templet: '#probstyle',  title: '概率',hide:IsMB()} //单元格内容水平居中
        ,{field:'datetime', title: '时间',hide:IsMB()} //单元格内容水平居中
        ,{field:'link_pc', title: 'PC链接',hide:true}
        ,{field:'link_mb', title: 'MB链接',hide:true}
      ]]
      ,done: function(res, curr, count){
        let that = this.elem.next();
        res.data.forEach(function (item, index) {
                let tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']");
                tr.attr({"style":"color:"+item.color+"!important"});
            });
        renderFans(res);
      }
    });
});