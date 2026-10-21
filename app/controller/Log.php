<?php
namespace app\controller;

use app\BaseController;
use think\facade\Db;

class Log extends BaseController
{
    function __construct()
    {
        login_Verify();
        banVisitor();
    }
    public function index()
    {
        return 0;
    }
    function login_error_log()
    {
        $res = Db::table('login_error_log')
            ->select()
            ->toArray();
        return view('loginfailed', ['data' => $res]);
    }
    function user_comments()
    {
        $res = Db::table('user_comments')
            ->select()
            ->toArray();
        return view('comments', ['data' => $res]);
    }
  
    function user_comments_data()
    {
      $res = Db::table('user_comments')
            ->select()
            ->toArray();
      return json($res);
    }

    function user_switch_log()
    {
        //已闲置
        $res = Db::table('user_switch_log')
            ->select()
            ->toArray();
        foreach ($res as $k => $row) {
            echo '<' . $k . '>' . join('&emsp;', $row) . '<br/>';
        }
    }
    function userswitchdata()
    {
        if (
            !isset($_GET['limit']) &&
            !isset($_GET['page']) &&
            !isset($_SESSION['power']) &&
            !isset($_SESSION['office'])
        ) {
            return;
        }

        if ($_SESSION['power'] === 7 && isset($_GET['userid'])) {
            if ($_GET['userid'] === 'all') {
                $list = Db::table('user_switch_log')
                    ->order('id', 'desc')
                    ->paginate([
                        'list_rows' => $_GET['limit'],
                        'var_page' => 'page',
                        'page' => $_GET['page'],
                    ])
                    ->toArray();
            } else {
                $list = Db::table('user_switch_log')
                    ->where('userid', $_GET['userid'])
                    ->order('id', 'desc')
                    ->paginate([
                        'list_rows' => $_GET['limit'],
                        'var_page' => 'page',
                        'page' => $_GET['page'],
                    ])
                    ->toArray();
            }
        } elseif ($_SESSION['power'] === 7) {
            $list = Db::table('user_switch_log')
                ->order('id', 'desc')
                ->paginate([
                    'list_rows' => $_GET['limit'],
                    'var_page' => 'page',
                    'page' => $_GET['page'],
                ])
                ->toArray();
        } elseif ($_SESSION['power'] === 5 && isset($_GET['userid'])) {
            if ($_GET['userid'] === 'all') {
                $list = Db::table('user_switch_log')
                    ->where('office', $_SESSION['office'])
                    ->order('id', 'desc')
                    ->paginate([
                        'list_rows' => $_GET['limit'],
                        'var_page' => 'page',
                        'page' => $_GET['page'],
                    ])
                    ->toArray();
            } else {
                $list = Db::table('user_switch_log')
                    ->where([
                        ['office', '=', $_SESSION['office']],
                        ['userid', '=', $_GET['userid']],
                    ])
                    ->order('id', 'desc')
                    ->paginate([
                        'list_rows' => $_GET['limit'],
                        'var_page' => 'page',
                        'page' => $_GET['page'],
                    ])
                    ->toArray();
            }
        } elseif ($_SESSION['power'] === 5) {
            $list = Db::table('user_switch_log')
                ->where('office', $_SESSION['office'])
                ->order('id', 'desc')
                ->paginate([
                    'list_rows' => $_GET['limit'],
                    'var_page' => 'page',
                    'page' => $_GET['page'],
                ])
                ->toArray();
        } else {
            $list = ['error' => "You don't have permission to view it"];
        }

        $list['count'] = $list['total'];
        $list['msg'] = 'User switching log data';
        $list['code'] = 0;
        $res = json($list);

        return $res;
    }
    function userswitch()
    {
        return view('userswitch');
    }

    function webcodesafe()
    {
        $res = Db::table('webcodesafe_log')
            ->select()
            ->toArray();
        foreach ($res as $k => $row) {
            unset($row['id']);
            echo '<' . $k . '>' . join('=>', $row) . '<br/>';
        }
    }
    function webcodesafedata()
    {
        if (!(array_key_exists('limit',$_GET) &&
            array_key_exists('page',$_GET))) 
        {
            return json(["msg"=>"request error"]);
        }
        $list = Db::table('safe_log')
                ->order('id', 'desc')
                ->paginate([
                    'list_rows' => $_GET['limit'],
                    'var_page' => 'page',
                    'page' => $_GET['page'],
                ])
                ->toArray();
        $list['count'] = $list['total'];
        $list['msg'] = 'webcodesafe log data';
        $list['code'] = 0;
        $res = json($list);

        return $res;
    }
    function websafe()
    {
        /*
        $res = Db::table('safe_log')
            ->order('date', 'desc')
            ->select()
            ->toArray();
        */
        return view('websafe');
    }
    function visit_detail_data()
    {
        if(!isGetReq()) {
            return 'only get';
        }
        if (!array_key_exists('limit', $_GET) || !array_key_exists('page',$_GET)) 
        {
            return json(["msg"=>"visit detail request error"]);
        }
        $dateTimeRange = isset($_GET['dateTime']) ? $_GET['dateTime'] : '';
        $dateTimeRange = trim($dateTimeRange);
        $pickDate = false;
        $start = "";
        $end = "";
        if($dateTimeRange){
            $dates = extractDateRange($dateTimeRange);
            if($dates){
                $start = $dates["start"];
                $end = $dates["end"];
                $pickDate = true;
            }
        }
        $map = [];
        if($pickDate){
            if($start !== $end){
                $map[] = ['dateTime', 'between time', [$start, $end]];
            }else{
                $map[] = [Db::raw('DATE(dateTime)'), '=', $start];
            }
        }
        $ip = isset($_GET['ip']) ? $_GET['ip'] : '';
        $ip = trim($ip);
        if($ip){
            $map[] = ['ip', '=', $ip];
        }
        $isHuman = isset($_GET['isHuman']) ? $_GET['isHuman'] : '';
        if($isHuman !== ''){
            $map[] = ['isHuman', '=', $isHuman];
        }
        $visitType = isset($_GET['visitType']) ? $_GET['visitType'] : '';
        if($visitType !== ''){
            $map[] = ['visitorType', '=', $visitType];
        }
        $pageUrl = isset($_GET['pageUrl']) ? $_GET['pageUrl'] : '';
        $pageUrl = trim($pageUrl);
        if($pageUrl !== ''){
            $pageUrl = "%".$pageUrl."%";
            $map[] = ['entryPage', 'like', $pageUrl];
        }
        $model = Db::table('visit_detail');
        $list = $model->where($map)->order('id', 'desc')
                ->paginate([
                    'list_rows' => $_GET['limit'],
                    'var_page' => 'page',
                    'page' => $_GET['page'],
                ])
                ->toArray();
        if($isHuman !== 'true'){
            $map[] = ['isHuman', '=', 1];
            $humanCount = $model->where($map)->count();
        }else{
            $humanCount = $list['total'];
        }
        $total = $list['total'];
        $list['count'] = $total;
        $list['msg'] = 'visit_detail list';
        $list['code'] = 0;
        $list['humanCount'] = $humanCount;
        $percentage = 100;
        if($total !== 0){
            $percentage = intval(($humanCount / $total) * 100);
        }
        $list['totalRow'] = ["visitor"=>["human"=>$humanCount, "total"=>$total, "prop"=>$percentage."%"]];
        $res = json($list);
        return $res;
    }
    function visit_detail()
    {
        return view('visitdetail');
    }
}
