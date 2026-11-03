# Week 5 任務單 — 吳科浩（R8 QA 主管）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | 吳科浩 / Wu Kehao / @fannaodawang |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

把 P0 修正變成可重複的測試證據，讓 defect log、test report 與 coverage 都反映目前 commit。

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

### 任務 1：全量測試與環境紀錄

**怎麼做**

1. 用 Docker 跑 `cd backend && ./mvnw -B verify`；記錄 test methods、failures、skipped。
2. 跑 `cd frontend && npm ci && npm run lint && npm run test:run && npm run build`。
3. 把指令、commit SHA、日期、環境寫進 interim test report。

**完成標準**

- backend 沒有 failure/error，integration 不再 skip。
- frontend 68/68 或更多。

**證據**

- test report
- CI 連結

### 任務 2：Defect log 收尾

**怎麼做**

1. DEF-PARC-001/002、DEF-SEC-001、DEF-OPS-001 只有在對應 test 真的 pass 後才改成 Closed。
2. DEF-DOC-001/UI-001 已有證據，確認狀態正確。
3. 新增的 bug 用 `DEF-<MODULE>-nnn`，不要用形容詞當 ID。

**完成標準**

- 每個 Closed 都有 test name 或指令輸出。
- 沒有 Open 的 P0。

**證據**

- defect log diff

### 任務 3：System / acceptance 證據

**怎麼做**

1. 寫 3 條 system test：register→shelve→verify→confirm、duplicate waybill、used code。
2. 做 3 次 acceptance 觀察（可請 R5 找人），記錄完成時間與卡點。
3. 把結果放進 `docs/04-testing/reports/`，不要只放在聊天。

**完成標準**

- 3 條 system test 有步驟、預期、實際、verdict。
- 3 次 acceptance 有日期與物件型別。

**證據**

- report 連結

### 任務 4：Coverage 與 test plan 校正

**怎麼做**

1. 重算 JaCoCo，記錄 commit；確認 pickup 已進 denominator。
2. 如果沒有 `jacoco:check`，不要說 60% 是 hard floor。
3. 更新 test plan 的 current status。

**完成標準**

- coverage 數字有 commit。
- test plan 沒有 stale claim。

**證據**

- JaCoCo 輸出


## 5. 與 P0 修復的配合（圖 2 的內容）

- R6/R10：Docker 與 CI。
- R5：acceptance。
- R9：report 數字。
- R1：defect/issue 狀態。

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

- 不要把 component test 當 system test。
- 不要用舊 coverage 數字。

## 9. 需要誰協助

- R6/R10：Docker 與 CI。
- R5：acceptance。
- R9：report 數字。
- R1：defect/issue 狀態。
