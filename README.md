# 享购企业数字化运营工作台

**xg-workbench** 是基于 PHP / ThinkPHP 6 的企业数字化运营工作台，包含账号管理、项目与落地页管理、业务订单、访问记录等模块。

## 项目结构

| 路径 | 内容 |
|---|---|
| `app/controller/` | 业务页面与接口控制器 |
| `app/model/` | 数据模型 |
| `app/middleware/` | 请求处理中间件 |
| `config/` | 应用、数据库、日志等配置 |
| `route/` | 路由定义 |
| `view/` | 页面模板 |
| `public/` | Web 入口与静态资源 |
| `sql/schema.sql` | 从 2024-07-09 备份提取的 18 张表结构，无业务数据 |
| `sql/*.sql.zip` | 2024-07-09 原始完整数据库备份，包含历史数据 |
| `db/` | GeoIP 数据文件的本地放置目录 |

## 开发准备

依赖声明见 `composer.json`，锁定版本见 `composer.lock`。项目声明 PHP `>=7.1.0`；实际环境需满足锁定依赖和应用代码的要求。

```bash
git clone https://github.com/licat233/xg-workbench.git
cd xg-workbench
cp .env.example .env
composer install
```

在本地 `.env` 中填写数据库连接，以及 `[XG_WORKBENCH]` 下的访问口令：

- `SHOP_ORDER_PASSWORD`：简易登录和订单页面访问口令。
- `LINE_API_PASSWORD`：PostApi 接口访问口令。
- `LEGACY_API_PASSWORD`：Getdata、Verify 接口的旧式访问口令。

口令为空时，对应的口令验证不会通过。这些接口访问口令需自行配置。

数据库可选择仅导入 `sql/schema.sql` 创建空表，或恢复原始 ZIP 中的完整历史数据。2024-07-09 备份包含 18 张表，已补齐旧备份缺少的 `shop_order`、`skintestpaper`、`visit_detail`。具体命令见 [数据库导入说明](sql/README.md)。仅建表时需自行创建管理员及必要初始数据；恢复历史数据后应重新设置账号密码。

如使用 IP 国家识别功能，请按 GeoIP 数据提供方的许可取得 `GeoLite2-Country.mmdb`，放入 `db/`。该第三方数据文件不随源码分发。

Web 服务器的网站根目录应指向 `public/`。ThinkPHP 命令行入口为 `php think`，具体部署配置以运行环境为准。

## 源码说明

本仓库从 `newworkbench.com_20240708_101839` 目录的当前文件制作首次提交，包含其中尚未提交到原 Git 的源码修改和新增文件。

公开版本保留应用源码、页面模板、静态资源和框架许可证，并按项目所有者要求提供 2024-07-09 原始完整数据库 ZIP 及单独提取的表结构。运行缓存、独立访问日志、其他旧备份、Composer 依赖目录、原源码中的部署口令及原 Git 历史未导入本仓库。完整数据库 ZIP 保持原样，包含历史业务记录与账号相关数据。

原 ThinkPHP 框架说明保留在 [README.thinkphp.md](README.thinkphp.md)，许可信息见 [LICENSE.txt](LICENSE.txt)。
