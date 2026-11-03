# Week 5 任務單 — Guo Yuhui（R9 檔案與品質）

| 專案 | 內容 |
|---|---|
| 期間 | 2026-11-04（三）至 2026-11-10（二） |
| 負責人 | Guo Yuhui / @RavenG7 |
| 所屬 | COMP 3500SEF Group 23 |
| 本週主題 | 收斂 P0、補齊證據、凍結範圍；**11/14 前不做 review 簡報** |
| 工作分支 | `fix/p0-reachability`（3 個 commit，尚未合併） |

> 這份任務單是給你自己看的執行清單，不是評分檔案。完成後把「完成／未完成／證據／阻礙」貼到對應的 GitHub issue 與 logbook。

## 0. 你的本週目標

把 report 變成可提交的單一檔案，數字與 repo 一致，第一行是 GitHub link。

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

### 任務 1：組出 report 草稿

**怎麼做**

1. 把 `docs/07-report/chapters/01` 到 `09` 依序組成一份 `report-draft.md`；第一行必須是 GitHub URL。
2. 加上 title block、3 個 figure caption（process、architecture、traceability）。
3. 用 Word 或 script 數字；目標 950–980 字，不超過 1000。

**完成標準**

- 第一行是 link。
- Word count ≤1000（以最終 PDF 為準）。
- 每張圖在正文被引用。

**證據**

- report-draft.md
- word count 截圖

### 任務 2：數字與 claim 校正

**怎麼做**

1. 抽查：91 backend test methods、68 frontend tests、18 FKs、36 CRs、929 chapter words。
2. 確認沒有把 CR-013 說成 implemented。
3. 確認 coverage 是 historical，不是 current gate。

**完成標準**

- 5 個抽查數字全對。
- 沒有 overclaim。

**證據**

- checklist

### 任務 3：檔案一致性

**怎麼做**

1. 跑 `python scripts/check_doc_versions.py .` 與 `python scripts/check_table_columns.py .`。
2. 檢查 README、SRS、RTM、test plan、change log 的版本/狀態。
3. 把發現列成 issue 或直接修，不要只說「看起來可以」。

**完成標準**

- 兩個 script exit 0。
- 沒有 broken link（至少抽查主要檔案）。

**證據**

- script 輸出

### 任務 4：Logbook 格式抽查

**怎麼做**

1. 每位組員的 logbook 要有 meeting log、contribution、report/presentation contribution、reflection。
2. 抽查 3 份，確認沒有 placeholder、沒有 blank task ID。
3. 把需要補的名單交給 R1。

**完成標準**

- 3 份抽查有紀錄。
- 缺失有負責人與期限。

**證據**

- 抽查表


## 5. 與 P0 修復的配合（圖 2 的內容）

- R1：report 內容與 deadline。
- R3：requirements 段落。
- R8：測試數字。
- 全員：logbook。

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

- 不要先做 review 簡報。
- 不要用舊的 85.9% 當 current coverage。

## 9. 需要誰協助

- R1：report 內容與 deadline。
- R3：requirements 段落。
- R8：測試數字。
- 全員：logbook。
