-- Table definitions only; no production records or default credentials.
SET NAMES utf8;

CREATE TABLE IF NOT EXISTS `admin` (
  `id` tinyint(3) NOT NULL,
  `office` varchar(8) NOT NULL COMMENT '辦公室編號',
  `photo` varchar(60) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(60) NOT NULL COMMENT '密码',
  `power` tinyint(2) NOT NULL DEFAULT '1',
  `email` varchar(100) DEFAULT NULL,
  `ps` varchar(100) DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员';
CREATE TABLE IF NOT EXISTS `auditpage` (
  `id` int(11) unsigned NOT NULL,
  `projectid` int(8) NOT NULL,
  `releasedate` date NOT NULL,
  `screenshot` text NOT NULL,
  `status` int(8) NOT NULL,
  `html` text NOT NULL,
  `lastupdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='审核页表';
CREATE TABLE IF NOT EXISTS `landingpage` (
  `id` int(11) unsigned NOT NULL,
  `projectid` int(8) NOT NULL,
  `releasedate` date NOT NULL,
  `author` varchar(100) NOT NULL,
  `grade` varchar(20) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `screenshot` text NOT NULL,
  `description` varchar(400) NOT NULL,
  `status` int(8) NOT NULL,
  `html` text NOT NULL,
  `safehtml` text,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='落地页表格';
CREATE TABLE IF NOT EXISTS `login_error_log` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(8) NOT NULL DEFAULT 'failed',
  `login_ip` varchar(30) NOT NULL,
  `login_info` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `login_log` (
  `id` int(11) NOT NULL,
  `login_ip` varchar(30) NOT NULL,
  `login_info` varchar(100) DEFAULT NULL,
  `login_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `success_count` int(11) DEFAULT '0',
  `error_count` int(11) NOT NULL DEFAULT '0',
  `main_mark` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='登录日志';
CREATE TABLE IF NOT EXISTS `paas` (
  `id` int(6) unsigned NOT NULL COMMENT '编号',
  `name` varchar(20) NOT NULL COMMENT '平台名字',
  `admine` varchar(20) DEFAULT NULL COMMENT '管理人',
  `status` varchar(20) NOT NULL DEFAULT '0' COMMENT '状态',
  `ps` text COMMENT '描述',
  `code1` text,
  `code2` text,
  `code3` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='平台信息';
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `teacher` varchar(100) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  `gravatar` varchar(300) NOT NULL DEFAULT 'https://storage.licat.work/gravatar/defavatar.png',
  `office` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目表';
CREATE TABLE IF NOT EXISTS `safe` (
  `id` int(8) unsigned NOT NULL,
  `tz_code` int(8) NOT NULL DEFAULT '1' COMMENT '跳转代码：当等于5时，会发生跳转',
  `tz_url` varchar(100) DEFAULT NULL COMMENT '跳转地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `safe_log` (
  `id` int(32) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `count` int(32) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(6) unsigned NOT NULL COMMENT '编号',
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `account` varchar(30) NOT NULL COMMENT '业务号',
  `link_pc` varchar(1000) NOT NULL COMMENT '电脑链接',
  `link_mb` varchar(1000) NOT NULL COMMENT '手机链接',
  `paas_id` int(30) NOT NULL DEFAULT '0' COMMENT '平台项目',
  `last_paas_id` int(6) NOT NULL DEFAULT '0',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `datetime` datetime DEFAULT NULL COMMENT '时间',
  `prob` int(6) NOT NULL DEFAULT '100' COMMENT '幸运值',
  `ps` text COMMENT '描述',
  `hide` int(8) NOT NULL DEFAULT '0',
  `office` varchar(16) DEFAULT '412' COMMENT '会员所在办公室'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号表';
CREATE TABLE IF NOT EXISTS `user_backup` (
  `id` int(6) unsigned NOT NULL COMMENT '编号',
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `account` varchar(30) NOT NULL COMMENT '业务号',
  `link_pc` varchar(100) NOT NULL COMMENT '电脑链接',
  `link_mb` varchar(100) NOT NULL COMMENT '手机链接',
  `paas_id` int(30) NOT NULL DEFAULT '0' COMMENT '平台项目',
  `last_paas_id` int(6) NOT NULL DEFAULT '0',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `datetime` datetime DEFAULT NULL COMMENT '时间',
  `prob` int(6) NOT NULL DEFAULT '100' COMMENT '幸运值',
  `ps` text COMMENT '描述'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号表';
CREATE TABLE IF NOT EXISTS `user_comments` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(16) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `weburl` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `topic` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='落地頁用戶留言';
CREATE TABLE IF NOT EXISTS `user_switch_log` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(30) NOT NULL,
  `account` varchar(30) NOT NULL,
  `content` varchar(200) NOT NULL,
  `office` varchar(16) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `web` (
  `id` int(6) unsigned NOT NULL COMMENT '编号',
  `paas_id` int(30) NOT NULL COMMENT '平台项目',
  `url` varchar(100) NOT NULL COMMENT '落地页链接',
  `web_online` int(6) NOT NULL DEFAULT '0' COMMENT '在线人数',
  `ps` text COMMENT '备注',
  `campaigns` text,
  `statistic_code` text,
  `code1` longtext,
  `code2` longtext,
  `code3` longtext,
  `js_plugin` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='落地页链接';
CREATE TABLE IF NOT EXISTS `webcodesafe_log` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(100) NOT NULL,
  `weburl` varchar(300) NOT NULL,
  `count` int(32) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
