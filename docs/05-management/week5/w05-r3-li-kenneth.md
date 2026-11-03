# Week 5 任務單 — 李卓峰（R3 需求工程師）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | 李卓峰 / Li Cheuk Fung Kenneth / @Kennethli13 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

把 SRS、RTM 與實際 endpoint/test 對齊，整理出一條可展示的 requirement-to-test 證據鏈。

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

### 任務 1：修正 RTM 的 status 與 Must 覆蓋

**怎麼做**

1. 把 RTM 的 status 欄位改成目前真實狀態：implemented / designed / deferred。
2. 不要再寫「100% Must coverage」而讓讀者以為都實作了；改成「100% mapped to a design artefact and a test identifier」並加一句 implementation status separate。
3. 把 5 個沒有 backend route 的 path 列成 GAP，連到 issue 或 CR。

**完成標準**

- 每個 Must 的 status 與 code/test 對得上。
- 沒有把 reserved test ID 說成 executed test。

**證據**

- RTM v0.6 diff

### 任務 2：整理一條 traceability chain

**怎麼做**

1. 選 FR-21（verify pickup code）或 FR-12（register parcel），從 SRS → sequence diagram → OpenAPI path → service → test class 走一遍。
2. 把每個節點的路徑與行號記下來，放到 `docs/01-requirements/progress-review-re-story.md` 的對應段落。
3. 如果中間有斷點，記成 GAP，不要補想像的連結。

**完成標準**

- 五個節點都能點開。
- 至少一個節點是實際 test class，不是 reserved ID。

**證據**

- traceability 表

### 任務 3：SRS 狀態與 validation 證據

**怎麼做**

1. 處理 SRS 封面 `Complete for Sprint 1` 與 chapter 3 `Draft / R2 approval pending` 的矛盾。
2. 把 OI-1/OI-2/OI-3 的狀態寫清楚：已解、延後、或仍需決定。
3. 把 requirements walkthrough 與 3 位受訪者的 prototype confirmation 整理成 validation 證據。

**完成標準**

- SRS 只有一種 status 說法。
- validation 有日期、物件、發現、處理。

**證據**

- SRS v0.11
- validation 表

### 任務 4：CR-013 / CR-034 的 requirement 影響

**怎麼做**

1. 確認 CR-013 只是把 resident path 放進 contract，沒有實作；在 SRS/RTM/report 用一致說法。
2. 確認 CR-034 修正的是實作可達性，不是新 requirement；如果它改變 FR-14/FR-21 的行為，補一條註記。

**完成標準**

- 三份檔案對 CR-013 的說法一致。
- CR-034 不被說成新功能。

**證據**

- CR 連結


## 5. 與 P0 修復的配合（圖 2 的內容）

- R2：scope cut 與 Must/Could 決定。
- R6：endpoint/ERD 的技術事實。
- R8：哪些 test 真的 executed。
- R1：report 第 3/8 節引用。

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

- 不要修改 requirement 來遷就 code；要嘛改 code，要嘛用 CR 改 requirement。
- 不要把 mapped 說成 tested。

## 9. 需要誰協助

- R2：scope cut 與 Must/Could 決定。
- R6：endpoint/ERD 的技術事實。
- R8：哪些 test 真的 executed。
- R1：report 第 3/8 節引用。
