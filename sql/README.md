# 数据库备份与导入

本目录提供两种导入来源，选择其中一种：

| 文件 | 内容 |
|---|---|
| `schema.sql` | 从 2024-07-09 备份提取的 18 张表定义，不含业务记录，移除原自增计数 |
| `work_2024-07-09_10-15-02_mysql_data_JrgER.sql.zip` | 原始完整备份，包含建表语句与历史数据，保持原文件不变 |

备份由 MySQL 5.7.34 导出，原数据库名为 `work`，字符集为 `utf8`。包含 `admin`、`auditpage`、`landingpage`、`login_error_log`、`login_log`、`paas`、`project`、`safe`、`safe_log`、`shop_order`、`skintestpaper`、`user`、`user_backup`、`user_comments`、`user_switch_log`、`visit_detail`、`web`、`webcodesafe_log`。

以下命令在仓库根目录运行，`root` 可替换为实际数据库用户；密码在本机提示中输入。

## 仅创建空表

先创建空数据库，再导入表结构：

```bash
mysql -u root -p -e 'CREATE DATABASE xg_workbench CHARACTER SET utf8;'
mysql -u root -p xg_workbench < sql/schema.sql
```

此方式需要自行创建管理员和必要初始数据。

## 恢复完整历史数据

原备份包含 `DROP TABLE IF EXISTS`，会替换目标数据库内的同名表。请恢复到新建的空数据库。

```bash
mysql -u root -p -e 'CREATE DATABASE xg_workbench CHARACTER SET utf8;'
unzip -p sql/work_2024-07-09_10-15-02_mysql_data_JrgER.sql.zip \
  work_2024-07-09_10-15-02_mysql_data_JrgER.sql > /tmp/xg-workbench-restore.sql
mysql -u root -p xg_workbench < /tmp/xg-workbench-restore.sql
rm /tmp/xg-workbench-restore.sql
```

在本地 `.env` 的 `[DATABASE]` 中设置 `DATABASE = xg_workbench` 及连接参数。完整备份包含历史业务记录与账号相关数据，恢复后应重新设置账号密码。源码中独立的接口访问口令仍由 `.env` 的 `[XG_WORKBENCH]` 配置。

原始 ZIP 的 SHA-256：

```text
4941ca291d10c1558ef8bd7f65070fe74093a51c3b73eaf0068726520dcdded3
```

已核对 ZIP 完整性、表结构提取数量与原文件哈希；尚未在 MySQL 实例中执行恢复或验证业务运行。
