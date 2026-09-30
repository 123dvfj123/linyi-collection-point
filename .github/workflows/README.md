# CI 说明

- `ci.yml`：W1–W6 只做仓库结构自检与敏感文件检查，保证流水线是“绿”的。
- W7（Sprint 2）之后由 R10 扩展为：`npm ci` → `npm run lint` → `npm test -- --coverage` → `npm run build`。
- 每次扩展 CI 都要单独提交，commit message 用 `chore(ci): ...`。
