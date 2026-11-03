# Week 5 任務單 — 袁崇俊（R4 前端主管 / 產品架構 A）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | 袁崇俊 / Yuan Chong Jun / @RookieVENENO |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

確認 P0 修正後的前端真的能走完流程，並把 resident path 的取捨寫清楚。

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

### 任務 1：瀏覽器端到端驗證

**怎麼做**

1. 用 `docker compose --profile full up -d --build --wait` 起完整 stack（若 Docker 不可用，與 R10 約時間）。
2. 開 `http://localhost:80`，用 `demo_staff_1 / password` 登入。
3. 走：register（選 available location）→ 確認 success message 顯示 pickup code → 確認 location board 變成 occupied → pickup verify → confirm。
4. 在 375px viewport 再走一次，確認沒有 horizontal scroll。

**完成標準**

- 每一步都有截圖或螢幕錄影。
- 成功訊息同時有 location code 與 pickup code。
- 重新載入 location board 後，該庫位是 occupied。

**證據**

- 截圖/錄影路徑
- console 錯誤（應為空）

### 任務 2：前端測試與 build

**怎麼做**

1. 跑 `cd frontend && npm ci && npm run lint && npm run test:run && npm run build`。
2. 冷啟動再跑一次 test（先清 `node_modules/.vite`），確認 router-guard 不再 timeout。
3. 若 pickup code 顯示沒有測試，補一個 `parcel-create.spec.js` assertion。

**完成標準**

- lint/build exit 0。
- test 68/68 或更多，冷啟動也過。

**證據**

- 指令輸出

### 任務 3：resident read path 的取捨

**怎麼做**

1. 與 R2/R6 開 20 分鐘會：resident pages 是要做最小 read path，還是本 release 明確 descope？
2. 如果做：只做 `/my-parcels` + `/my-parcels/:id` + pickup code，不擴 owner/admin。
3. 如果不做：寫一頁 decision，說明原因與風險，並讓 R2 用 CR 記錄。

**完成標準**

- 有一個明確的 go/no-go。
- 如果 no-go，SRS/RTM/報告都用同一說法。

**證據**

- decision 連結

### 任務 4：更新 page map 與前端檔案

**怎麼做**

1. 把 `/parcels/new`、`/locations`、`/pickup` 的狀態改成 implemented against real API（若已驗證）。
2. 更新 `frontend/README.md` 的 status，不要再說 mock login。
3. 把新的截圖放到 `docs/05-management/week5/evidence/`（新資料夾）。

**完成標準**

- page map 與 router/實際頁面一致。
- README 沒有 stale 的 mock 說法。

**證據**

- page map diff


## 5. 與 P0 修復的配合（圖 2 的內容）

- R5：一起做 UI 驗證與測試。
- R6：後端 response 的 pickupCode/status 語意。
- R8：acceptance 觀察與 test evidence。
- R10：Compose 環境。

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

- 不要為了 demo 好看而 hardcode 資料。
- 不要把 resident path 偷做成半成品。

## 9. 需要誰協助

- R5：一起做 UI 驗證與測試。
- R6：後端 response 的 pickupCode/status 語意。
- R8：acceptance 觀察與 test evidence。
- R10：Compose 環境。
