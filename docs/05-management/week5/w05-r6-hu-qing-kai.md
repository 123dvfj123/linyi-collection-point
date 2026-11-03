# Week 5 任務單 — 胡慶凱（R6 後端主管 / 產品架構 B）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | 胡慶凱 / Hu Qing Kai / @123dvfj123 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

用 Docker 驗證 P0 修正的 transaction、migration 與 endpoint 可達性，並把後端契約檔案補到與 code 一致。

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

### 任務 1：Docker/Testcontainers 全量驗證

**怎麼做**

1. `cd backend && ./mvnw -B verify`（Windows 用 `mvnw.cmd`），確認 91 個 test methods 中沒有 failure，Testcontainers 不再 skip。
2. 確認 `ParcelRegistrationIntegrationTest.registersAndShelvesWithPickupCodeInOneRequest` 真的跑過。
3. 把 Surefire/JaCoCo 輸出貼到 PR。

**完成標準**

- BUILD SUCCESS，0 failure/error。
- 27 個 integration tests 不再 skip。

**證據**

- CI run / Surefire 輸出

### 任務 2：V4 migration 與 demo data

**怎麼做**

1. 在乾淨 DB 跑 Flyway：V1→V2→V3→V4，確認 `48210001/48210002` 的 expires_at 是未來。
2. 在已有 DB 再跑一次 V4，確認不會把 used code 重新啟用。
3. 確認 `parcels.pickup_code_id` 與 `pickup_codes.parcel_id` 的 FK/unique 約束都成立。

**完成標準**

- 兩個 code 在 demo 當天仍 active。
- used code 保持 used。
- 沒有 orphan code/parcel。

**證據**

- SQL 查詢結果

### 任務 3：契約與模型同步

**怎麼做**

1. 確認 `POST /parcels` 帶 locationId 的行為已寫進 OpenAPI；若 ERD/state machine 仍說「register 只會 registered」，更新文字。
2. 確認 `ParcelResponse.pickupCode` 只出現在 issuance response；list/detail 不洩漏。
3. 把 CR-034 的實作結果補到 change-log（若尚未）。

**完成標準**

- OpenAPI/ERD/state machine 對同一行為只有一種說法。
- 沒有把 pickup code 放進 list response。

**證據**

- OpenAPI diff

### 任務 4：Endpoint vs RTM 盤點

**怎麼做**

1. 列出目前 controller 真正提供的 endpoint，與 SRS/RTM 的 Must 對照。
2. 把 5 個沒有 route 的 path 與受影響 FR 交給 R3/R2；不要自己把 FR 改成 implemented。
3. 確認 `PATCH /location` 的 staff role matrix 有測試。

**完成標準**

- 清單有 endpoint、FR、status、gap。
- R3 收到清單並更新 RTM。

**證據**

- 盤點表


## 5. 與 P0 修復的配合（圖 2 的內容）

- R7：pickup code/DB constraint review。
- R10：Compose 驗證。
- R8：integration test 與 defect closure。
- R3/R2：RTM/scope。
- R1：PR review/merge。

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

- 不要在沒有 Docker 的情況下說 integration 已驗證。
- 不要為了讓測試過而放寬 constraint。

## 9. 需要誰協助

- R7：pickup code/DB constraint review。
- R10：Compose 驗證。
- R8：integration test 與 defect closure。
- R3/R2：RTM/scope。
- R1：PR review/merge。
