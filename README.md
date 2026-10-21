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
| `sql/schema.sql` | 从原备份提取的 15 张表结构，无业务数据 |
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

口令为空时，对应的口令验证不会通过。仓库不提供默认账号或口令。

按实际部署版本准备数据库。`sql/schema.sql` 来自历史备份，后续模块新增的表需要结合当前代码和部署资料补齐；管理员与业务初始数据需自行配置。

如使用 IP 国家识别功能，请按 GeoIP 数据提供方的许可取得 `GeoLite2-Country.mmdb`，放入 `db/`。该第三方数据文件不随源码分发。

Web 服务器的网站根目录应指向 `public/`。ThinkPHP 命令行入口为 `php think`，具体部署配置以运行环境为准。

## 源码说明

本仓库从 `newworkbench.com_20240708_101839` 目录的当前文件制作首次提交，包含其中尚未提交到原 Git 的源码修改和新增文件。

公开版本保留应用源码、页面模板、静态资源和框架许可证；运行缓存、访问日志、数据库记录及压缩备份、Composer 依赖目录、原部署口令不随源码发布。旧备份及其 Git 历史保留在本地，未导入本仓库。

原 ThinkPHP 框架说明保留在 [README.thinkphp.md](README.thinkphp.md)，许可信息见 [LICENSE.txt](LICENSE.txt)。
