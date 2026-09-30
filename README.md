# 邻驿（LinYi）社区包裹代收点管理系统

> COMP 3500SEF Software Engineering 小组项目 ｜ 10 人团队
> 面向社区/校园的包裹代收点管理系统：收件入库 → 库位管理 → 取件核销 → 计费结算 → 经营报表。
> **本系统为纯软件 Web 系统，不含任何物理设备控制。**

<!-- CI 徽章：仓库建好后替换为真实徽章 -->
<!-- ![CI](https://github.com/<用户名>/<仓库名>/actions/workflows/ci.yml/badge.svg) -->

---

## 一、快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/<用户名>/<仓库名>.git
cd <仓库名>

# 2. 安装依赖（W7 前后端骨架就绪后再执行）
cd backend  && npm install && cd ..
cd frontend && npm install && cd ..

# 3. 配置环境变量（从示例复制，不要提交 .env）
cp backend/.env.example backend/.env

# 4. 启动（docker-compose.yml 就绪后）
docker compose up -d
```

> 完整启动说明在 Sprint 2（W7）完成后补全到本节。

---

## 二、组员分工

| 角色 | 姓名 | GitHub | 负责范围 | 主要目录 |
|---|---|---|---|---|
| R1 组长 | （填写） | @ | 进度/评审/报告过程章节 | `docs/05-management/`、`docs/07-report/` |
| R2 产品负责人 | （填写） | @ | Backlog/优先级/计费规则确认 | `docs/01-requirements/specification/` |
| R3 需求文档官 | （填写） | @ | SRS/RTM/需求获取 | `docs/01-requirements/` |
| R4 前端组长 | （填写） | @ | 前端架构/设计系统/UML | `docs/02-design/`、`frontend/src/components/` |
| R5 前端开发 | （填写） | @ | 居民端/员工端/后台页面 | `frontend/src/views/` |
| R6 后端组长 | Hu Qing Kai | @123dvfj123 | 架构/数据模型/API/推荐算法 | `backend/src/`、`docs/03-api/` |
| R7 后端开发 | （填写） | @ | 库位/取件/计费/盘点模块 | `backend/src/modules/` |
| R8 测试组长 | （填写） | @ | 测试计划/用例/缺陷/验收 | `docs/04-testing/` |
| R9 文档与质量 | （填写） | @ | 报告统稿/手册/术语表 | `docs/07-report/` |
| R10 基础设施 | （填写） | @ | CI/Docker/Fake 服务/部署 | `.github/`、根目录配置 |

---

## 三、文档导航

| 目录 | 放什么 | 谁负责 |
|---|---|---|
| `docs/01-requirements/` | 调研问卷、访谈记录、竞品分析、SRS、Backlog、RTM | R2、R3 |
| `docs/02-design/` | 架构图、UML（.puml 源码）、ER 图、表结构、ADR | R4、R6 |
| `docs/03-api/` | OpenAPI 规格（openapi.yaml） | R6 |
| `docs/04-testing/` | 测试计划、测试用例表、缺陷表、测试报告 | R8 |
| `docs/05-management/` | 会议纪要、风险登记册、变更日志、甘特图、每周贡献截图 | R1 |
| `docs/06-logbook/` | **每人一份个人日志**（`YYYYMMDD_姓名_Logbook.md`） | 全员 |
| `docs/07-report/` | 报告章节 Markdown 源 + 图表 + 导出 PDF | R9、R1 |

---

## 四、协作规范

- 分支模型、提交规范、PR 流程：见 [CONTRIBUTING.md](CONTRIBUTING.md)
- 每周工作上传节奏：见 `docs/05-management/plans/README.md`
- 遇到问题：先在本仓库开 Issue，不要在群里口头提了就忘

---

## 五、当前状态

| Sprint | 周期 | 目标 | 状态 |
|---|---|---|---|
| Sprint 0 | W1–W2 | 选题、建仓、调研、竞品分析 | 进行中 |
| Sprint 1 | W3–W6 | 需求与设计基线 | 未开始 |
| Sprint 2 | W7–W9 | 入库→上架→取件核心闭环 | 未开始 |
| Sprint 3 | W10–W12 | 通知/异常件/盘点/后台 + 进度复审 | 未开始 |
| Sprint 4 | W13–W14 | 计费/报表/审计 + 全量测试 | 未开始 |
