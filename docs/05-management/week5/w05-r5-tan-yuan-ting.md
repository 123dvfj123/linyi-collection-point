# Week 5 任務單 — Tan Yuan Ting（R5 前端開發）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | Tan Yuan Ting / @Christine049 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

把 P0 修正後的使用者流程測過、錄下來，並補上缺少的前端測試。

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

### 任務 1：與 R4 一起走真實流程

**怎麼做**

1. 使用 R10 起的 Compose 或 `npm run dev` + 本地 backend。
2. 測試成功路徑：register → success message 有 pickup code → location occupied → pickup verify → confirm。
3. 測試錯誤路徑：重複 waybill、occupied location、錯誤 pickup code、已使用 code。

**完成標準**

- 每個路徑都有預期結果與實際結果。
- 錯誤訊息不是空白或 generic error。

**證據**

- 截圖/錄影
- 錯誤訊息文字

### 任務 2：補前端測試

**怎麼做**

1. 檢查 `frontend/tests/unit/parcel-create.spec.js` 是否已 assert `pickupCode` 與 location refresh；若沒有，補上。
2. 檢查 `pickup-view.spec.js` 是否覆蓋 invalid/expired/used/not-on-shelf；不足就補。
3. 跑 `npm run test:run` 與 `npm run lint`。

**完成標準**

- 新增的 assertion 在舊 code 會 fail、在新 code 會 pass（若能做到）。
- 全部 test 綠。

**證據**

- test diff
- 指令輸出

### 任務 3：375px 與無障礙檢查

**怎麼做**

1. 用 devtools 375px 寬度走一次 register/pickup。
2. 確認 pickup code input、success message、confirm dialog 都在 viewport 內。
3. 確認主要按鈕可以用 keyboard 操作。

**完成標準**

- 沒有 horizontal scroll。
- 沒有被截斷的按鈕或文字。

**證據**

- 截圖

### 任務 4：支援 R8 的 acceptance 觀察

**怎麼做**

1. 找 3 位沒有用過系統的人，每人做一次「register a parcel and confirm its pickup code」。
2. 記錄：完成時間、卡住的地方、是否需要協助。
3. 把紀錄交給 R8，不要自己寫成 pass。

**完成標準**

- 3 份紀錄有日期、物件型別、結果。
- 卡住的地方有具體描述。

**證據**

- acceptance 紀錄


## 5. 與 P0 修復的配合（圖 2 的內容）

- R4：前端架構與 review。
- R8：acceptance 與 test report。
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

- 不要只測 happy path。
- 不要把 mock test 當成 browser test。

## 9. 需要誰協助

- R4：前端架構與 review。
- R8：acceptance 與 test report。
- R10：環境。
