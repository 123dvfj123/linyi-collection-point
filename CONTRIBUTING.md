# 协作规范（CONTRIBUTING）

> 本文档是本组的“法律”。所有组员在第一次提交前必须读完整篇。

## 1. 分支模型

| 分支 | 用途 | 规则 |
|---|---|---|
| `main` | 始终可部署、可演示 | **受保护**，禁止直接 push，只能通过 `release/*` 或 `hotfix/*` 的 PR 合入 |
| `develop` | 集成主干 | **受保护**，只能通过 `feature/*`、`fix/*`、`docs/*` 的 PR 合入 |
| `feature/<模块号>-<简述>` | 功能开发 | 例 `feature/M3-location-recommend`，从 `develop` 切出，合并后删除 |
| `fix/<issue号>-<简述>` | 缺陷修复 | 例 `fix/87-pickup-idempotency` |
| `docs/<简述>` | 文档 | 例 `docs/srs-v0.2` |
| `release/v<x>.<y>` | 单个 Sprint 的发布 | 冻结功能，只修缺陷，合 `main` 后打 tag |
| `hotfix/<简述>` | 演示前紧急修复 | 直接合 `main` 并回合并 `develop` |

## 2. 提交信息规范（Conventional Commits）

格式：

    <type>(<scope>): <subject> [<TASK-ID>]

| type | 含义 |
|---|---|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `docs` | 文档 |
| `test` | 测试 |
| `refactor` | 重构（不改变行为） |
| `chore` | 构建/依赖/CI |
| `style` | 格式调整 |

示例：

    feat(pickup): generate one-time pickup code [M4-FR-4.1]
    fix(pickup): make verification idempotent under concurrency [M4-FR-4.4]
    docs(srs): add NFR-9 idempotency metric [M-REQ]
    test(billing): add 20 exhaustive fee cases [M6-FR-6.2]

**硬性要求**：subject 用英文，且**必须带任务号**（`[T-42-04]` 或 `[M4-FR-4.1]`）。
这是需求可追溯性的工程级证据，也是个人贡献的凭据。

## 3. 提交粒度

- 一个 commit 只做一件事，工作量约 10–30 分钟。
- **禁止**一次性提交 50 个文件。
- **禁止**用 `update`、`fix bug`、改空格来凑提交数。

## 4. PR 流程

1. 从最新 `develop` 切出分支
2. 小步提交
3. 推送 `git push -u origin <分支名>`
4. 在 GitHub 开 Pull Request，**base 选 `develop`**，按模板填写
5. 至少 1 名非作者 Approve + CI 变绿，才能合并
6. 合并后删除远程分支，并在对应 Issue 里说明

## 5. 每周必须做的事

- 每周至少 **2 次**有意义的提交
- 每周日 21:00 前更新自己的 `docs/06-logbook/` 文件并提交
- 每次工作完成后 **48 小时内**写入 Logbook
- 每个 Sprint 至少 Review 1 个别人的 PR

## 6. 绝对不要提交

- `.env`、密钥、密码、token
- `node_modules/`、`dist/`、`build/`
- 数据库文件、日志文件
- Office 临时文件（`~$xxx.docx`）

## 7. 遇到冲突

    git switch develop
    git pull
    git switch feature/your-branch
    git merge develop
    # 手工解决冲突后
    git add .
    git commit -m "chore: resolve merge conflict with develop"
    git push

**不要**使用 `git push --force`。确需使用时先在群里说明，且只对自己的分支使用。
