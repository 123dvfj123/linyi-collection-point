# Week 5 任務單 — Huang Wei Jia（R7 後端開發）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | Huang Wei Jia / @Allen06914 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

協助驗證 pickup code 的資料完整性與併發行為，讓 P0 修正不是隻在單一 happy path 成立。

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

### 任務 1：Review pickup code issuance

**怎麼做**

1. 逐行看 `PickupCodeIssuanceService`、`PickupCodeGenerator`、`ParcelShelvingService`。
2. 檢查：code 唯一、parcel 只能有一個 code、expiry 為未來、transaction rollback 不會留下 orphan。
3. 把發現寫成 PR review comment；不要直接改 R6 的 code，除非 R6 同意。

**完成標準**

- 至少 3 個具體 review 點。
- 沒有 orphan code 或重複 code 的風險被忽略。

**證據**

- PR review comment

### 任務 2：併發/碰撞測試

**怎麼做**

1. 用兩個並行請求對同一個 location 上架，確認只有一個成功，另一個得到合理錯誤。
2. 用同一個 parcel 連續上架兩次，確認第二次被拒絕。
3. 若時間允許，補一個 integration test；不要只用手動測試。

**完成標準**

- 資料庫最後只有一個 parcel 佔用該 location。
- 錯誤不是 500。

**證據**

- test 名稱/輸出

### 任務 3：V4 demo data 檢查

**怎麼做**

1. 用 SQL 檢查 `48210001/48210002` 的 status/expires_at/used_at。
2. 確認 V4 不會把 `48210003`（used）改回 active。
3. 把查詢與結果貼到 issue。

**完成標準**

- 兩個 demo code 可用，used code 不可用。
- 查詢有 before/after。

**證據**

- SQL 結果

### 任務 4：支援 R6 的 Docker run

**怎麼做**

1. 與 R6 約時間跑 `mvnw -B verify`；若失敗，先判斷是 code、test 還是環境。
2. 把失敗的 test name、stack trace 前 20 行貼給 R6。

**完成標準**

- 至少參與一次完整 backend verify。
- 失敗有具體分析，不是「我這邊也不行」。

**證據**

- 指令輸出


## 5. 與 P0 修復的配合（圖 2 的內容）

- R6：backend review 與 Docker run。
- R8：test evidence。
- R10：環境。

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

- 不要只說「看起來沒問題」；給 test 或 SQL 證據。
- 不要改 schema 來繞過 constraint。

## 9. 需要誰協助

- R6：backend review 與 Docker run。
- R8：test evidence。
- R10：環境。
