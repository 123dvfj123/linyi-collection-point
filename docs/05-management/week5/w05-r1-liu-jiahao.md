# Week 5 任務單 — Liu JiaHao（R1 組長 / 專案經理）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | Liu JiaHao / @Django-coder6 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

把 P0 分支安全合併、把 Week 5 的範圍與計劃定下來，並確保每個人的證據都能被追蹤。

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

### 任務 1：主持 11/04 的 30 分鐘決策會議

**怎麼做**

1. 確認 `fix/p0-reachability` 的三個 commit 是否接受；逐項看 CR-034/035/036。
2. 確認本週凍結功能範圍：只修 P0，不新增功能。
3. 確認 Week 5/6 壓縮方案：11/04–11/10 收斂證據，11/11–11/13 完成報告與 logbook，11/14 才開始 review 產出。
4. 把決策寫進 `docs/05-management/minutes/20261104_week5-decision.md`（新檔）與 `change-log.md`。

**完成標準**

- 會議紀錄有日期、出席、決議、負責人、截止日。
- 每個決議都連到一個 issue 或 CR。

**證據**

- 會議紀錄連結
- change-log 版本

### 任務 2：開 PR 並取得非作者審查

**怎麼做**

1. 把 `fix/p0-reachability` push 到 GitHub。
2. 用 `docs/05-management/pr-requests/20261103_p0-reachability.md` 的內容開 PR，base 是 `develop`。
3. 指定 R6、R10 為 reviewer；要求正式 GitHub approve，不要只在留言說 LGTM。
4. CI 綠、R6/R10 驗證透過後才合併；不要直接 push develop。

**完成標準**

- PR 已開、有 reviewer、CI 綠、至少一個非作者 approve。
- 合併後 develop 的 CI 綠。

**證據**

- PR 連結
- CI run 連結

### 任務 3：更新計畫與里程碑

**怎麼做**

1. 如果 11/04 會議同意壓縮，更新 `PLAN.md` 的 Sprint 3A/3B 與 `README.md` 的 Sprint status。
2. 在 GitHub 建立/確認 `Sprint 3` milestone；把 Week 5 issues 放進去。
3. 確認 `week: 5` label 已建立（目前 repo 只有 week 1–4）。

**完成標準**

- PLAN、README、milestone、label 一致。
- Issue 都有 assignee、label、milestone。

**證據**

- PLAN 連結
- milestone 連結

### 任務 4：檔案與數字一致性

**怎麼做**

1. 跑 `python scripts/check_doc_versions.py .` 與 `python scripts/check_table_columns.py .`。
2. 抽查 5 個數字：backend test methods、frontend tests、FK 數、CR 數、report 字數。
3. 確認 README 的啟動指令是 `docker compose --profile full up -d --build --wait`。

**完成標準**

- 兩個 script 都 exit 0。
- 抽查數字與當前 repo 一致。

**證據**

- script 輸出
- 抽查清單

### 任務 5：自己的 logbook 與 review 邊界

**怎麼做**

1. 補 meeting log 與 report/presentation contribution 欄位。
2. 把 `[path to topic submission screenshot]` 等 placeholder 換成真實 evidence，或明確標成未取得。
3. 11/14 前不要做 review 簡報；先把工程證據顧好。

**完成標準**

- logbook 沒有 placeholder。
- 每個會議都有個人貢獻。

**證據**

- logbook 連結


## 5. 與 P0 修復的配合（圖 2 的內容）

- R2/R3：確認 scope cut 與 SRS/RTM 的 Must 數字。
- R6/R10：P0 的 Docker/Compose 驗證與 PR review。
- R9：report 數字與 PDF 編排。
- R8：defect log 與 test report。

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

- 不要代替 R6/R10 說 Docker 已驗證。
- 不要在 11/14 前做 slides。
- 不要讓 PR 沒有正式 approve 就合併。

## 9. 需要誰協助

- R2/R3：確認 scope cut 與 SRS/RTM 的 Must 數字。
- R6/R10：P0 的 Docker/Compose 驗證與 PR review。
- R9：report 數字與 PDF 編排。
- R8：defect log 與 test report。
