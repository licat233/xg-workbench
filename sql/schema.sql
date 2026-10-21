-- xg-workbench schema extracted from the 2024-07-09 MySQL backup.
-- Structure only; no business records. Import into an empty database.
SET NAMES utf8;

CREATE TABLE `admin` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `office` varchar(8) NOT NULL COMMENT '辦公室編號',
  `photo` varchar(60) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(60) NOT NULL COMMENT '密码',
  `power` tinyint(2) NOT NULL DEFAULT '1',
  `email` varchar(100) DEFAULT NULL,
  `ps` varchar(100) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `office` (`office`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员';
CREATE TABLE `auditpage` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `projectid` int(8) NOT NULL,
  `releasedate` date NOT NULL,
  `screenshot` text NOT NULL,
  `status` int(8) NOT NULL,
  `html` text NOT NULL,
  `lastupdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id_3` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='审核页表';
CREATE TABLE `landingpage` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='落地页表格';
CREATE TABLE `login_error_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(8) NOT NULL DEFAULT 'failed',
  `login_ip` varchar(30) NOT NULL,
  `login_info` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_ip` varchar(30) NOT NULL,
  `login_info` varchar(100) DEFAULT NULL,
  `login_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `success_count` int(11) DEFAULT '0',
  `error_count` int(11) NOT NULL DEFAULT '0',
  `main_mark` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='登录日志';
CREATE TABLE `paas` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(20) NOT NULL COMMENT '平台名字',
  `admine` varchar(20) DEFAULT NULL COMMENT '管理人',
  `status` varchar(20) NOT NULL DEFAULT '0' COMMENT '状态',
  `ps` text COMMENT '描述',
  `code1` text,
  `code2` text,
  `code3` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='平台信息';
CREATE TABLE `project` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `teacher` varchar(100) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  `gravatar` varchar(300) NOT NULL DEFAULT 'https://storage.licat.work/gravatar/defavatar.png',
  `office` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目表';
CREATE TABLE `safe` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `tz_code` int(8) NOT NULL DEFAULT '1' COMMENT '跳转代码：当等于5时，会发生跳转',
  `tz_url` varchar(100) DEFAULT NULL COMMENT '跳转地址',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `safe_log` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `count` int(32) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `url` (`url`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `shop_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'UID',
  `name` varchar(30) NOT NULL COMMENT '收货人姓名',
  `phone_number` varchar(30) NOT NULL COMMENT '收货人电话',
  `address` varchar(300) NOT NULL COMMENT '收货人地址',
  `pay_method` varchar(30) NOT NULL COMMENT '支付方式',
  `order_number` varchar(30) NOT NULL COMMENT '订单编号（索引）',
  `product_list` text NOT NULL COMMENT '产品清单',
  `product_num` int(8) NOT NULL COMMENT '产品数量',
  `total_price` decimal(10,2) NOT NULL COMMENT '产品总价格',
  `remark` varchar(500) NOT NULL COMMENT '留言备注',
  `submit_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `submit_ip` varchar(30) NOT NULL DEFAULT '0.0.0.0' COMMENT '提交ip',
  `brand` varchar(20) NOT NULL COMMENT '品牌',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '订单状态，0-未处理，1-已处理, 2已取消',
  `hide` tinyint(4) NOT NULL DEFAULT '0',
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商场订单';
CREATE TABLE `skintestpaper` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(20) NOT NULL COMMENT '编码，索引',
  `paper` text NOT NULL COMMENT '试卷',
  `remark` text COMMENT '评论',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `origin` varchar(100) NOT NULL COMMENT '提交地址',
  `ip` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='肌肤测试试卷';
CREATE TABLE `user` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
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
  `office` varchar(16) DEFAULT '412' COMMENT '会员所在办公室',
  PRIMARY KEY (`id`),
  KEY `paas_id` (`paas_id`),
  KEY `paas_id_2` (`paas_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号表';
CREATE TABLE `user_backup` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `account` varchar(30) NOT NULL COMMENT '业务号',
  `link_pc` varchar(100) NOT NULL COMMENT '电脑链接',
  `link_mb` varchar(100) NOT NULL COMMENT '手机链接',
  `paas_id` int(30) NOT NULL DEFAULT '0' COMMENT '平台项目',
  `last_paas_id` int(6) NOT NULL DEFAULT '0',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `datetime` datetime DEFAULT NULL COMMENT '时间',
  `prob` int(6) NOT NULL DEFAULT '100' COMMENT '幸运值',
  `ps` text COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号表';
CREATE TABLE `user_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(16) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `weburl` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `topic` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='落地頁用戶留言';
CREATE TABLE `user_switch_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(30) NOT NULL,
  `account` varchar(30) NOT NULL,
  `content` varchar(200) NOT NULL,
  `office` varchar(16) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userid` (`userid`),
  KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `visit_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uuid` varchar(32) NOT NULL COMMENT 'uuid',
  `time` time DEFAULT NULL COMMENT '时间',
  `region` varchar(255) DEFAULT NULL COMMENT '地区',
  `isp` varchar(255) DEFAULT NULL COMMENT '网络供应商',
  `visitorType` tinyint(4) DEFAULT '0' COMMENT '访客类型:0新访客,1老访客,2爬虫,3机器人',
  `ip` varchar(255) DEFAULT NULL COMMENT 'IP地址',
  `srcUrl` text COMMENT '源URL',
  `entryPage` text COMMENT '进入页面',
  `isHuman` tinyint(4) NOT NULL DEFAULT '2' COMMENT '是人类？',
  `pv` int(11) DEFAULT NULL COMMENT '页面浏览量',
  `duration` int(11) DEFAULT NULL COMMENT '持续时间',
  `browser` varchar(255) DEFAULT NULL COMMENT '浏览器',
  `dateTime` datetime DEFAULT NULL COMMENT '日期时间',
  `block` tinyint(1) DEFAULT NULL COMMENT '是否阻断',
  `userId` varchar(255) DEFAULT NULL COMMENT '用户ID',
  `sessionId` varchar(255) DEFAULT NULL COMMENT '会话ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `web` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `paas_id` int(30) NOT NULL COMMENT '平台项目',
  `url` varchar(100) NOT NULL COMMENT '落地页链接',
  `web_online` int(6) NOT NULL DEFAULT '0' COMMENT '在线人数',
  `ps` text COMMENT '备注',
  `campaigns` text,
  `statistic_code` text,
  `code1` longtext,
  `code2` longtext,
  `code3` longtext,
  `js_plugin` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `url` (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='落地页链接';
CREATE TABLE `webcodesafe_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(100) NOT NULL,
  `weburl` varchar(300) NOT NULL,
  `count` int(32) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
