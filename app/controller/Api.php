<?php

namespace app\controller;

use app\BaseController;
use app\model\Web;
use app\model\User;
use think\facade\Log;
use think\facade\Db;
use think\facade\Request;

use app\Cryptox;

class Api extends BaseController
{
    function __construct()
    {
        // header('Access-Control-Allow-Origin: *'); //解决远程无法访问控制器问题
        // header('Access-Control-Allow-Headers: *'); //解决远程无法访问控制器问题
        // if (strpos($_SERVER['SERVER_NAME'], 'cat') == false) {
        //     die();
        // }
        Log::close();
    }

    //line业务号数据接口
    function linedata()
    {
        if (!$_GET || !isset($_SERVER['HTTP_REFERER'])) {
            return '<h1><center>嗨！別來無恙啊！</center></h1>' .
                "<script>console.info('嗨！別來無恙啊！')</script>";
        }
        $web = new Web();
        $user = new User();
        $url = '';

        if (empty($url)) {
            $url = isset($_SERVER['HTTP_WEB_URL']) ? $_SERVER['HTTP_WEB_URL'] : '';
        }
        if (empty($url)) {
            $url = isset($_GET['weburl']) ? $_GET['weburl'] : '';
        }
        if (empty($url)) {
            $url = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
        }
        if (empty($url)) {
            $url = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        }
        if (empty($url)) {
            $url = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        }
        if (empty($url)) {
            $url = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
        }
        if (empty($url)) {
            $url = isset($_GET['weburl']) ? $_GET['weburl'] : '';
        }
        if (empty($url)) {
            return '<h1><center>嗨！別來無恙啊！</center></h1>' .
                "<script>console.info('嗨！別來無恙啊！')</script>";
        }


        // 提取域名
        $host = parse_url($url, PHP_URL_HOST);
        // 提取路径
        $path = parse_url($url, PHP_URL_PATH);
        //组合
        $url = $host . $path;

        $exist = false;
        $current_url = $url;
        //遍历每一个目录，路径查找
        while ($url !== '') {
            //查询该url所在平台
            $web_paas = $web->get_Url_paas($url);
            if (is_numeric($web_paas)) { //找到了
                $exist = true;
                $current_url = $url;
                break;
            }
            // 去除最右边的目录
            $last_url = dirname($url);
            if ($last_url === $url) {
                break;
            }
            $url = $last_url;
        }
        if (!$exist) { //没找到
            $web_paas = $web->get_Url_paas($host);
            if (is_numeric($web_paas)) { //找到了
                $exist = true;
                $current_url = $host;
            } else {
                //主域名查找，获取主域名
                $domain = implode('.', array_slice(explode('.', $host), -2));
                if ($domain !== $host) {
                    $web_paas = $web->get_Url_paas($domain);
                    if (is_numeric($web_paas)) { //找到了
                        $exist = true;
                        $current_url = $domain;
                    }
                }
            }
        }

        $jsPlugin = "";
        if (!$exist) { //没找到
            //当status = 5 时，将跳转至我们的落地页
            $data = [
                //'status'=>"5",
                'state' => 404,
                'line_id' => '系統未添加該網站',
                'line_url_mb' => "javascript:alert('系統未添加該網站')",
                'line_url_pc' => "javascript:alert('系統未添加該網站')",
                'code1' => '',
                'code2' => '',
                'code3' => '',
                'js_plugin' => '',
                'web_url' => $current_url,
            ];
            return json($data);
        } else { //找到了
            $code1 = get_code($web_paas, 'code1');
            $code2 = get_code($web_paas, 'code2');
            $code3 = get_code($web_paas, 'code3');
            $jsPlugin = get_url_data($url)?get_url_data($url)['js_plugin']:"";
        }

        $user_arr = $user->paas_get_user($web_paas); //获取平台内的在线的业务号
        if (empty($user_arr) || count($user_arr) == 0) {
            $data = [
                'state' => 404,
                'line_id' => '該網站未放置業務號！',
                'line_url_mb' => "javascript:alert('該網站未放置業務號')",
                'line_url_pc' => "javascript:alert('該網站未放置業務號')",
                'code1' => $code1,
                'code2' => $code2,
                'code3' => $code3,
                'web_url' => $current_url,
            ];
            return json($data);
        }
        $data_arr = [];
        foreach ($user_arr as $row) {
            $data_arr[$row['id']] = $row; //获取所有的业务号ID
        }

        ///开始概率抽取///
        $result = [];
        $prob_arr = [];
        foreach ($data_arr as $key => $val) {
            $prob_arr[$key] = $val['prob'];
        }
        $prob_Sum = array_sum($prob_arr); ///计算总幸运值
        asort($prob_arr); //对数组升序排序
        foreach ($prob_arr as $userid => $aProb) {
            $randNum = mt_rand(0, $prob_Sum); ////取出一个随机数
            if ($randNum <= $aProb) {
                $result = $data_arr[$userid];
                break;
            } else {
                $prob_Sum -= $aProb;
            }
        }
        $line_id = trim($result['account']);
        $line_url_mb = trim($result['link_mb']);
        $line_url_pc = trim($result['link_pc']);
        $data = [
            'state' => 200,
            'line_id' => $line_id,
            'line_url_mb' => $line_url_mb,
            'line_url_pc' => $line_url_pc,
            'code1' => $code1,
            'code2' => $code2,
            'code3' => $code3,
            'js_plugin' => $jsPlugin,
            'web_url' => $current_url,
        ];
        return json($data);
    }

    //评论接口
    function usercomment()
    {
        if (!isPostReq()) {
            return 'only post';
        }
        //$data = request()->param();

        $url = $_POST['url'];
        $comment = $_POST['content'];
        $type = $_POST['type'];
        $ip = getHostIp();
        $topic = isset($_POST['topic']) ? $_POST['topic'] : null;
        //$commentdata = '【'.$url.'】【'.$type.'】【'.$comment.'】';
        //writeComment($commentdata);
        $data = [
            'type' => $type,
            'content' => $comment,
            'weburl' => $url,
            'ip' => $ip,
            'topic' => $topic,
        ];
        //print_r($data);
        Db::name('user_comments')->save($data);
        return 'comment success';
    }

    function lineverify()
    {
        if (!Request::instance()->isPost() || !isset($_POST['lineid'])) return json(['code' => 0, 'data' => ['msg' => 'Request Errors !']]);
        $lineid = $_POST['lineid'];
        $res = Db::name('user')->getByAccount($lineid);
        $has = !!$res;
        if (!$has) { //如果不存在
            // 以 lineid 结尾
            $data = Db::name('user')->where('name', 'like', "%$lineid")->find();
            $has = !empty($data);
            print_r($res);
        }
        $msg = $has ? "Found" : "Not Found";
        $code = $has ? 1 : 0;
        return json(['code' => $code, 'data' => ['msg' => $msg]]);
    }
    
    public function skintest()
    {
        if (!isPostReq()) {
            return 'only post';
        }
        $origin = $_POST['origin'];
        $paper = $_POST['paper'];
        $code = substr(md5(time() . mt_rand(1, 1000000)), 8, 8);
        $ip = getHostIp();
        $data = [
            'code' => $code,
            'paper' => $paper,
            'origin' => $origin,
            'ip' => $ip,
        ];
        Db::name('skintestpaper')->save($data);
        $res = [
            'code' => $code,
            'msg' => "successful test"
        ];
        return json($res);
    }
    
    public function searchskintest()
    {
        if (!isGetReq()) {
            return 'error';
        }
        $code = $_GET['code'];
        $res = Db::table('skintestpaper')->where('code', $code)->find();
        if ($res == null) {
            return json(['result' => null, 'msg' => '沒有找到！']);
        }
        return json(['result' => $res, 'msg' => '找到了！']);
    }
    
    function addvisitdetail()
    {
        if (!isPostReq()) {
            return 'only post';
        }
        $strdata = isset($_POST['data']) ? $_POST['data'] : '';
        if(!$strdata){
            $res = [
                'code' => 400,
                'msg' => 'data field cannot be equal to nil',
                'data' => null,
            ];
            return json($res);
        }
        $jsondata = Cryptox::decrypt($strdata, true);
        $postdata = json_decode($jsondata);
        if($postdata===null){
            $res = [
                'code' => 400,
                'msg' => 'data decode error',
                'data' => null,
            ];
            return json($res);
        }
        if(!isset($postdata->entryPage)){
            $res = [
                'code' => 400,
                'msg' => 'entryPage field does not exist',
                'data' => null,
            ];
            return json($res);
        }
        $entryPage = $postdata->entryPage;
        $entryPage = trim($entryPage);
        if(!$entryPage){
            $res = [
                'code' => 400,
                'msg' => 'entryPage field cannot be equal to nil',
                'data' => null,
            ];
            return json($res);
        }
        $timestamp = time();
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $browser = getBrowserInfo($userAgent);
        $browserName = $browser['browser'];
        $browserVersion = $browser['version'];
        if (!empty($browserVersion)) {
          // 连接浏览器名称和版本
            $browserInfo = $browserName . ' ' . $browserVersion;
        } else {
          // 只显示浏览器名称
            $browserInfo = $browserName;
        }
        $uuid = md5(uniqid(mt_rand(), true));
        if(!isset($postdata->srcUrl)){
            $res = [
                'code' => 400,
                'msg' => 'srcUrl field does not exist',
                'data' => null,
            ];
            return json($res);
        }
        $srcUrl = $postdata->srcUrl;
        $srcUrl = trim($srcUrl);
        if(!$srcUrl) {
            $srcUrl = '直接访问';
        }
        $isBot = $postdata->isBot;
        
        $model = Db::name('visit_detail');
        $ip = getHostIp();
        $pageUrl = removeUrlParameters($entryPage);
        //枚举，0新访客,1老访客,2爬虫,3机器人
        $visitorType = 0;
        $isHuman = 2; //2表示未知
        //case 1: 判断是否为爬虫或者机器人
        //监测UA是否为爬虫
        if(strpos($browserInfo, "AdsBot") !== false){
            //是搜索引擎爬虫
            $visitorType = 2;
        }else if($isBot == true){
            //是机器人
            $visitorType = 3;
            $isHuman = 0; //不是人类
        }
        //case 2:判断是否为新用户或者老用户
        if($visitorType === 0){
            //如果ip相同、或者访问了相同的不包含参数的url，则是老访客
            //ip可能会不同，但设备码可能会相同
            $result = $model->where([
                ['ip',"=", $ip],
                ['entryPage', "like", $pageUrl."?%"]
                ])->limit(1)->select();
            //该ip的用户访问了多次该页面的广告
            if(count($result) !== 0){
                //老访客了
                $visitorType = 1;
            }
        }
        // $visitorValue = "";
        // switch ($visitorType) {
        //     case 0:
        //         $visitorValue = "新访客";
        //         break;
        //     case 1:
        //         $visitorValue = "老访客";
        //         break;
        //     case 2:
        //         $visitorValue = "爬虫";
        //         break;
        //     case 3:
        //         $visitorValue = "机器人";
        //         break;
        //     default:
        //         $visitorValue = "新访客";
        //         break;
        // }
        $data = [
            'uuid'=> $uuid,
            'time' => date("H:i:s", $timestamp),
            'region' => queryIpCountry($ip),
            'isp' => '',
            'visitorType' => $visitorType,
            'ip' => $ip,
            'srcUrl' => $srcUrl,
            'entryPage' => $entryPage,
            'isHuman' => $isHuman,
            'pv' => 0,
            'duration' => 0,
            'browser' => $browserInfo,
            'dateTime' => date("Y:m:d H:i:s", $timestamp),
            'block' => 0,
            'userId' => '',
            'sessionId' => ''
        ];

        $model->insert($data);
        $res = [
                'code' => 200,
                'msg' => 'Record successful',
                'data' => ["uuid"=>$uuid],
            ];
        return json($res);
    }
    
    function putvisitdetail()
    {
        if (!isPostReq()) {
            return 'only post';
        }
        $strdata = isset($_POST['data']) ? $_POST['data'] : '';
        if(!$strdata){
            $res = [
                'code' => 400,
                'msg' => 'data field cannot be equal to nil',
                'data' => null,
            ];
            return json($res);
        }
        $jsondata = Cryptox::decrypt($strdata, true);
        $postdata = json_decode($jsondata);
        if($postdata===null){
            $res = [
                'code' => 400,
                'msg' => 'data decode error',
                'data' => null,
            ];
            return json($res);
        }
        if(!isset($postdata->uuid)){
            $res = [
                'code' => 400,
                'msg' => 'uuid field does not exist',
                'data' => null,
            ];
            return json($res);
        }
        $uuid = $postdata->uuid;
        $uuid= trim($uuid);
        if(!$uuid){
            $res = [
                'code' => 400,
                'msg' => 'uuid field cannot be equal to nil',
                'data' => null,
            ];
            return json($res);
        }
        $isBot = $postdata->isBot;
        $model = Db::name('visit_detail');
        $visit = $model->where('uuid', $uuid)->find();
        if($visit === null) {
            $res = [
                'code' => 400,
                'msg' => 'does not exist',
                'data' => null,
            ];
            return json($res);
        }
        $duration = get_seconds_elapsed($visit["dateTime"]);
        if ($duration === 0) {
            //非正常人类产生的时差
            $model->where([['uuid', "=", $uuid]])->update(['duration' => $duration, 'isHuman'=> 0, 'visitorType'=> 3 ]);
        }else{
            //正常情况下，能触发此方法的，基本上可以判定为人类
            //但难免有些比较只能得机器人也会触发
            if($isBot == true){
                //如果检测出来是机器人，那一定是机器人
                $model->where([['uuid', "=", $uuid]])->update(['duration' => $duration, 'isHuman'=> 0, 'visitorType'=> 3 ]);
            }else if($isBot == false){
                //如果检测出来不是机器人，那一定是人类
                $model->where([['uuid', "=", $uuid]])->update(['duration' => $duration, 'isHuman'=> 1]);
                //避免出现第一次检测是机器人，后面检测是人类的情况，将机器人类型修改为人类
                $model->where([['uuid', "=", $uuid], ['visitorType', "=", 3]])->update(['visitorType'=> 0]);
            }else if($isBot == null){
                //无法判断
                $model->where([['uuid', "=", $uuid], ['visitorType', "<>", 2]])->update(['duration' => $duration, 'isHuman'=> 2]);
            }
        }
       
        $res = [
            'code' => 200,
            'msg' => 'update successful',
            'data' => null,
        ];
        return json($res);
    }
}
