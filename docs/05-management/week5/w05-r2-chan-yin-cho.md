# Week 5 任務單 — Chan Yin Cho（R2 產品負責人）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | Chan Yin Cho / @ohcyc246 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

用產品角度確認 P0 修正後的行為，並把 Week 5 的 Must/Could 範圍定清楚，讓 SRS、backlog、RTM 說同一件事。

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

### 任務 1：審查 CR-034 的產品語意

**怎麼做**

1. 確認「`POST /parcels` 帶 locationId 就立即 shelved 並回 pickupCode」是產品想要的行為，而不是隻有技術方便。
2. 確認「不帶 locationId 就維持 registered，之後再上架」仍是合法路徑。
3. 把結論寫成 CR-034 的 review comment；如不同意，提出替代方案，不要直接改 code。

**完成標準**

- CR-034 有 R2 的明確結論。
- SRS FR-14/FR-21 與實際行為一致。

**證據**

- CR-034 留言
- SRS 段落

### 任務 2：Week 5 scope re-baseline

**怎麼做**

1. 列出目前 32 個 Must FR 中，哪些真的能在 review 前做到 implemented + tested。
2. 把 resident read path、owner/admin reports、exceptions、notifications 等分成「本 release 做」與「future」；不要讓 Must 數字與 endpoint 數量脫節。
3. 把決定寫成一個 scope 表：FR ID、目前狀態、本 release 決定、理由、CR 編號。
4. 與 R3 對 RTM 的 status 欄位對齊。

**完成標準**

- 每個 Must 都有 implemented/designed/deferred 之一。
- deferred 的專案有理由與 CR。
- SRS/backlog/RTM 不再互相矛盾。

**證據**

- scope 表
- RTM diff

### 任務 3：更新 backlog 與 SRS 優先順序

**怎麼做**

1. 只改有 CR 支援的優先順序；不要靜默把 Must 改成 Could。
2. 把 backlog 的 acceptance criteria 與目前 endpoint 對齊，特別是 batch、pickup code、location。
3. 若 resident path 確定不做，把 FR-2/3/8 的 release 狀態寫清楚，並在 report 坦白。

**完成標準**

- backlog 每列都有 FR、MoSCoW、Sprint、acceptance criteria。
- 沒有「已寫 Must 但沒有 endpoint」的無聲矛盾。

**證據**

- backlog 連結
- CR 連結

### 任務 4：整理需求決策證據

**怎麼做**

1. 把 CR-003（batch 升 Must）、CR-004（recommendation 降級）、CR-005（delegated 移除）、CR-023（panel deferred）整理成一頁。
2. 每個決策寫：受訪者數字、決策、影響的 FR、證據連結。
3. 這頁是 report 第 3 節與 review 的素材，但本週不要做 slides。

**完成標準**

- 四個決策都能用 29 份問卷的數字解釋。
- 每個決策都有 CR 連結。

**證據**

- 決策表


## 5. 與 P0 修復的配合（圖 2 的內容）

- R3：RTM/SRS 的 status 與 Must 數字。
- R6：CR-034 的技術可行性與 endpoint 行為。
- R1：scope cut 寫進 PLAN 與 change-log。
- R5/R4：resident path 是否要做，給明確的產品決定。

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

- 不要用「應該可以」代替 CR。
- 不要為了讓 report 好看而把未做的 FR 說成 implemented。

## 9. 需要誰協助

- R3：RTM/SRS 的 status 與 Must 數字。
- R6：CR-034 的技術可行性與 endpoint 行為。
- R1：scope cut 寫進 PLAN 與 change-log。
- R5/R4：resident path 是否要做，給明確的產品決定。
