# 每周工作上传指南

## 一、每周你要把东西放哪里

| 你负责的内容 | 上传到哪 | 文件命名示例 |
|---|---|---|
| 代码 | `backend/src/modules/` 或 `frontend/src/views/` | `location.ts`、`LocationBoard.vue` |
| 需求文档 | `docs/01-requirements/specification/` | `SRS.md` |
| 调研问卷与访谈 | `docs/01-requirements/elicitation/` | `20260305_问卷结果.xlsx` |
| 设计图（UML/ER） | `docs/02-design/uml/`、`docs/02-design/database/` | `usecase-intake.puml` |
| 架构决策 | `docs/02-design/adr/` | `ADR-001-选择关系型数据库.md` |
| 接口规格 | `docs/03-api/` | `openapi.yaml` |
| 测试用例与报告 | `docs/04-testing/test-cases/`、`.../reports/` | `test-cases-pickup.xlsx` |
| 会议纪要 | `docs/05-management/minutes/` | `20260305_周例会.md` |
| 周贡献截图 | `docs/05-management/weekly/` | `W05_contributors.png` |
| **个人 Logbook** | `docs/06-logbook/` | `20260000_姓名_Logbook.md` |
| 报告章节 | `docs/07-report/chapters/` | `03-requirements.md` |

## 二、每周标准动作（组员）

```bash
# 1. 同步主干
git switch develop
git pull

# 2. 切自己的分支（分支名带任务号）
git switch -c docs/W05-srs-requirements

# 3. 干活 + 小步提交（一次一件事）
git add docs/01-requirements/specification/SRS.md
git commit -m "docs(srs): add functional requirements FR-2.x [T-10-06]"

# 4. 推送并开 PR
git push -u origin docs/W05-srs-requirements
```

然后在 GitHub 上开 PR（base 选 `develop`），等 1 人 Approve 后合并。

## 三、每周标准动作（组长 R1）

| 时间 | 动作 |
|---|---|
| 周一 | 开本周站会（20 分钟），更新 Projects 看板，发本周 Issue |
| 每天 | 看一眼有没有卡住的 PR |
| 周四 | 45 分钟协作时间：集中解决冲突与阻塞 |
| 周日 20:00 | 发 Logbook 提醒 Issue |
| 周日 21:30 | 检查每人本周是否有提交；导出 Contributors 截图存 `weekly/Wxx_contributors.png` |
| 周日 22:00 | 更新风险登记册与变更日志 |
