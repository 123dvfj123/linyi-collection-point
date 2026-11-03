# Week 5 任務單 — Chan Sung Ming William（R10 基礎設施與整合 DevOps）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | Chan Sung Ming William / @smcheese9731-sys |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

證明 production Compose 真的可用，並讓 CI 的 smoke test 覆蓋前端代理路徑。

## 1. 本週目標

本週只做「收斂與證據」，不新增功能，也不做 progress review 的簡報、臺詞或排練。review 相關產出依組長決定在 11 月 14 日開始；在那之前，請把工程與檔案證據補到可以支撐 review 的程度。

## 2. 先讀這些

- `docs/05-management/plans/progress-review-12-day-plan.md`：小組的 12 天安排與角色分工。
- `docs/05-management/process-model.md`：本專案採用的 hybrid process 與理由。
- `docs/04-testing/defect-log.md`：目前已記錄的 P0/P1 缺陷。
- `docs/05-management/change-log.md` 的 CR-034、CR-035、CR-036：本次 P0 修正的決策紀錄。
- 分支 `fix/p0-reachability`：目前已包含 3 個 commit，尚未合併。

## 3. 背景：這次 P0 修正了什麼

- 單件入庫帶 `locationId` 時，現在會在同一個 transaction 內完成上架、佔用庫位、發出 pickup code。
- 應用程式現在會產生 pickup code；不再只靠測試或 seed 的 SQL。
- `V4__refresh_demo_pickup_codes.sql` 會把 demo 的兩個過期 code 更新到未來 30 天。
- `PATCH /api/parcels/{id}/location` 已加入 staff 許可權規則。
- production 前端已加入 Nginx `/api` 反向代理，`docker-smoke` 改為經由 `http://localhost:80` 登入。
- 這些修正尚未經過 Docker/Testcontainers 與完整 Compose 驗證；本週要把這個缺口補上。


## 4. 必做任務

### 任務 1：Compose full stack 驗證

**怎麼做**

1. `docker compose --profile full up -d --build --wait --wait-timeout 300`。
2. 確認 4 個 services running；`curl http://localhost:8080/api/health` 與 `curl http://localhost/api/health` 都 ok。
3. 開 `http://localhost:80`，用 `demo_staff_1/password` 登入；確認 Nginx 有轉發 `/api`。

**完成標準**

- 四個 services healthy。
- port 80 登入成功，不是 404/502。

**證據**

- compose ps
- curl 輸出
- 截圖

### 任務 2：CI smoke 與 branch 驗證

**怎麼做**

1. 確認 `.github/workflows/ci.yml` 的 docker-smoke 是經由 `http://localhost/api/auth/login`。
2. push 分支後看 PR 的 CI；五個 job 都要綠。
3. 若 docker-smoke 失敗，先看 service logs，不要直接重跑掩蓋。

**完成標準**

- PR 上五個 job 綠。
- 失敗有 log 分析。

**證據**

- CI run 連結

### 任務 3：Migration/seed 與 backup

**怎麼做**

1. 在乾淨 volume 與已有 volume 各跑一次 compose，確認 V4 不會讓 Flyway checksum 失敗。
2. 準備一個 local backup（DB dump 或 volume snapshot）與啟動指令。
3. 把步驟寫進 `docs/05-management/plans/` 或 README。

**完成標準**

- 兩種 volume 都能啟動。
- backup 可以還原到可登入狀態。

**證據**

- 指令/截圖

### 任務 4：Branch 清理

**怎麼做**

1. 合併後刪掉已 merged 的 remote branches；先列出清單，不要刪未合併的。
2. 把清理結果記到 risk register RSK-12。

**完成標準**

- remote branch 數量下降。
- 沒有刪到未合併工作。

**證據**

- branch 清單


## 5. 與 P0 修復的配合（圖 2 的內容）

- R6：backend image/health。
- R8：smoke/test。
- R1：merge/CI。
- R4：frontend build。

## 6. 完成回報格式

請在 2026-11-10（二）21:00 前，把以下內容貼到你的 logbook 與對應的 GitHub issue：

```text
完成：
- ...
未完成：
- ...（原因與下一步）
證據：
- PR / commit / 指令輸出 / 截圖路徑
阻礙：
- ...（需要誰協助）
```

## 7. Logbook 提醒

- 每次小組會議都要有 agenda、plans、participation、summary（≤200 字）與我的貢獻（≤100 字）。
- 每個任務都要有 task ID 與可點開的 evidence；不要留 `[screenshot]`、`will be filed`、`pending`。
- 本週結束前補上「report / presentation contribution」欄位；presentation 的內容可以等 11 月 14 日再填，但欄位要先存在。

## 8. 不要做

- 不要用 `docker compose up` 起半套然後說完整。
- 不要手動改 DB 讓 demo 過。

## 9. 需要誰協助

- R6：backend image/health。
- R8：smoke/test。
- R1：merge/CI。
- R4：frontend build。
