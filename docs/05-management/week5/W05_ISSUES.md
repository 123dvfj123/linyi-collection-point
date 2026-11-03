# Week 5 GitHub issues 內容

> 這是給組長建立 issue 用的 copy-paste 內容。
> 目前 repo 只有 `week: 1`–`week: 4` 與 Sprint 1/2；請先建立 `week: 5` label 與 `Sprint 3` milestone（due 2026-11-17）。
> 既有可用 labels：`type: code`、`type: docs`、`type: setup`、`type: research`、`prio: high`、`prio: normal`、`bug`、`documentation`。

## 快速總表

| # | 標題 | Assignees | Labels | Milestone |
|---|---|---|---|---|
| 1 | [W05][T-00-06] Week 5 決策、P0 PR 與計畫壓縮 | @Django-coder6 | `type: setup`, `prio: high`, `week: 5` | Sprint 3 |
| 2 | [W05][T-10-08] Scope re-baseline：Must/Could 與 backlog 對齊 | @ohcyc246 | `type: docs`, `prio: high`, `week: 5` | Sprint 3 |
| 3 | [W05][T-10-09] RTM/SRS 真實狀態與 traceability | @Kennethli13 | `type: docs`, `prio: high`, `week: 5` | Sprint 3 |
| 4 | [W05][T-42-09] 前端端到端流程與 resident path 決策 | @RookieVENENO | `type: code`, `prio: high`, `week: 5` | Sprint 3 |
| 5 | [W05][T-42-09] 前端測試、錯誤路徑與 acceptance | @Christine049 | `type: code`, `prio: normal`, `week: 5` | Sprint 3 |
| 6 | [W05][T-42-04] 後端 Docker 驗證、契約與 endpoint 盤點 | @123dvfj123, @smcheese9731-sys | `type: code`, `prio: high`, `week: 5` | Sprint 3 |
| 7 | [W05][T-42-04] Pickup code 資料完整性與併發 | @Allen06914 | `type: code`, `prio: normal`, `week: 5` | Sprint 3 |
| 8 | [W05][T-50-05] 全量測試、defect closure 與 interim report | @fannaodawang | `type: code`, `prio: high`, `week: 5` | Sprint 3 |
| 9 | [W05][T-50-11] Report draft、數字與檔案一致性 | @RavenG7 | `type: docs`, `prio: high`, `week: 5` | Sprint 3 |
| 10 | [W05][T-30-05] Compose/Nginx/CI smoke 與 backup | @smcheese9731-sys | `type: setup`, `prio: high`, `week: 5` | Sprint 3 |

---

## Issue 1

**Title**

[W05][T-00-06] Week 5 決策、P0 PR 與計畫壓縮

**Assignees**：@Django-coder6

**Labels**：`type: setup`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
主持 11/04 決策會議，開 P0 PR，並在團隊同意後把 Week 5/6 壓縮方案寫進計畫。

## 必做
- [ ] 11/04 開 30 分鐘會議，逐項確認 CR-034/035/036 與 `fix/p0-reachability` 三個 commit。
- [ ] 確認本週凍結功能：只修 P0，不新增 notifications/exceptions/stocktake/billing/admin。
- [ ] 確認 11/04–11/10 收斂證據、11/11–11/13 完成報告/logbook、11/14 才開始 review 產出。
- [ ] 把 `fix/p0-reachability` push 到 GitHub，依 `docs/05-management/pr-requests/20261103_p0-reachability.md` 開 PR。
- [ ] 指定 R6、R10 為 reviewer，要求正式 GitHub approve；CI 綠且 Docker/Compose 驗證透過後才合併。
- [ ] 更新 `PLAN.md`、`README.md`、milestone 與 `week: 5` label。
- [ ] 跑 `python scripts/check_doc_versions.py .` 與 `python scripts/check_table_columns.py .`。

## 完成標準
- 會議紀錄有日期、出席、決議、負責人、截止日。
- PR 有 reviewer、CI 綠、至少一個非作者 approve。
- PLAN/README/milestone/label 一致。

## 證據
- 會議紀錄連結
- PR 連結與 CI run
- PLAN/README diff

## 注意
不要在 11/14 前做 slides、臺詞或排練；不要把 PR 直接合併到 develop。

---

## Issue 2

**Title**

[W05][T-10-08] Scope re-baseline：Must/Could 與 backlog 對齊

**Assignees**：@ohcyc246

**Labels**：`type: docs`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
用產品角度確認 CR-034 的行為，並把目前 32 個 Must 收斂成「本 release 真的做得到」的範圍。

## 必做
- [ ] 審查 CR-034：`POST /parcels` 帶 `locationId` 時直接 `shelved` 並回 `pickupCode`，是否是產品想要的行為。
- [ ] 建立 scope 表：FR ID、目前狀態（implemented/designed/deferred）、本 release 決定、理由、CR。
- [ ] 把 resident read path、owner/admin reports、exceptions、notifications 等分成「本 release」與「future」。
- [ ] 只改有 CR 支援的 MoSCoW；不要靜默把 Must 改成 Could。
- [ ] 更新 `product-backlog.md` 的 acceptance criteria 與目前 endpoint 對齊。
- [ ] 與 R3 對齊 RTM 的 status 欄位。

## 完成標準
- 每個 Must 都有 implemented/designed/deferred 之一。
- 沒有「已寫 Must 但沒有 endpoint」的無聲矛盾。
- deferred 的專案有理由與 CR。

## 證據
- scope 表
- backlog diff
- CR 連結

## 注意
不要為了讓報告好看而把未做的 FR 說成 implemented；resident path 若不做，要明確記錄。

---

## Issue 3

**Title**

[W05][T-10-09] RTM/SRS 真實狀態與 traceability

**Assignees**：@Kennethli13

**Labels**：`type: docs`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
把 SRS、RTM 與實際 endpoint/test 對齊，整理出一條可展示的 requirement-to-test 證據鏈。

## 必做
- [ ] 把 RTM 的 status 改成 implemented/designed/deferred，不再用「100% Must coverage」暗示都實作。
- [ ] 列出 5 個沒有 backend route 的 OpenAPI path，連到 issue 或 CR。
- [ ] 選 FR-21 或 FR-12，從 SRS → sequence diagram → OpenAPI path → service → test class 走一遍，記下每個節點。
- [ ] 處理 SRS 封面 `Complete for Sprint 1` 與 chapter 3 `Draft / R2 approval pending` 的矛盾。
- [ ] 把 requirements walkthrough 與 3 位受訪者的 prototype confirmation 整理成 validation 證據。
- [ ] 確認 CR-013 只是 contract，沒有實作；CR-034 是實作可達性，不是新 requirement。

## 完成標準
- 每個 Must 的 status 與 code/test 對得上。
- 沒有把 reserved test ID 說成 executed test。
- 三份檔案對 CR-013 的說法一致。

## 證據
- RTM diff
- traceability 表
- SRS v0.11 / validation 表

## 注意
不要修改 requirement 來遷就 code；要嘛改 code，要嘛用 CR 改 requirement。

---

## Issue 4

**Title**

[W05][T-42-09] 前端端到端流程與 resident path 決策

**Assignees**：@RookieVENENO

**Labels**：`type: code`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
確認 P0 修正後的前端真的能走完流程，並把 resident read path 的取捨寫清楚。

## 必做
- [ ] 用 `docker compose --profile full up -d --build --wait` 起完整 stack，開 `http://localhost:80`。
- [ ] 用 `demo_staff_1 / password` 登入，走 register（選 available location）→ 確認 success message 有 pickup code → location 變 occupied → pickup verify → confirm。
- [ ] 在 375px viewport 再走一次，確認沒有 horizontal scroll。
- [ ] 跑 `cd frontend && npm ci && npm run lint && npm run test:run && npm run build`。
- [ ] 清 `node_modules/.vite` 後再跑 test，確認 router-guard 不再 timeout。
- [ ] 與 R2/R6 開 20 分鐘會，決定 resident read path 是 go 還是 no-go，並寫一頁 decision。

## 完成標準
- 每一步有截圖或錄影，console 沒有錯誤。
- 成功訊息同時有 location code 與 pickup code。
- 重新載入 location board 後，該庫位是 occupied。
- resident path 有明確 go/no-go。

## 證據
- 截圖/錄影
- 指令輸出
- decision 連結

## 注意
不要為了 demo 好看而 hardcode 資料；不要把 resident path 偷做成半成品。

---

## Issue 5

**Title**

[W05][T-42-09] 前端測試、錯誤路徑與 acceptance

**Assignees**：@Christine049

**Labels**：`type: code`, `prio: normal`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
把 P0 修正後的成功與錯誤路徑測過、錄下來，並補上缺少的前端測試。

## 必做
- [ ] 測成功路徑：register → success message 有 pickup code → location occupied → pickup verify → confirm。
- [ ] 測錯誤路徑：重複 waybill、occupied location、錯誤 pickup code、已使用 code。
- [ ] 檢查 `parcel-create.spec.js` 是否 assert `pickupCode` 與 location refresh；不足就補。
- [ ] 檢查 `pickup-view.spec.js` 是否覆蓋 invalid/expired/used/not-on-shelf；不足就補。
- [ ] 找 3 位沒用過系統的人做 acceptance：register + confirm pickup code；記錄時間、卡點、是否需協助。

## 完成標準
- 成功與錯誤路徑都有預期/實際結果。
- 新增 assertion 在舊 code 會 fail、新 code 會 pass（若能做到）。
- 3 份 acceptance 紀錄有日期、物件型別、結果。

## 證據
- 截圖/錄影
- test diff 與指令輸出
- acceptance 紀錄

## 注意
不要只測 happy path；不要把 mock test 當成 browser test。

---

## Issue 6

**Title**

[W05][T-42-04] 後端 Docker 驗證、契約與 endpoint 盤點

**Assignees**：@123dvfj123, @smcheese9731-sys

**Labels**：`type: code`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
用 Docker 驗證 P0 修正的 transaction、migration 與 endpoint 可達性，並把後端契約檔案補到與 code 一致。

## 必做
- [ ] `cd backend && ./mvnw -B verify`（Windows 用 `mvnw.cmd`），確認 91 個 test methods 沒有 failure，27 個 Testcontainers 不再 skip。
- [ ] 確認 `ParcelRegistrationIntegrationTest.registersAndShelvesWithPickupCodeInOneRequest` 真的跑過。
- [ ] 在乾淨 DB 跑 V1→V2→V3→V4，確認 demo code 的 `expires_at` 是未來；在既有 DB 再跑一次 V4，確認 used code 不會復活。
- [ ] 確認 `POST /parcels` 帶 locationId 的行為已寫進 OpenAPI；ERD/state machine 若仍說「register 只會 registered」，更新文字。
- [ ] 確認 `ParcelResponse.pickupCode` 只出現在 issuance response，list/detail 不洩漏。
- [ ] 列出 controller 真正提供的 endpoint 與 RTM Must 對照，把 5 個沒有 route 的 path 交給 R3/R2。
- [ ] 確認 `PATCH /location` 的 staff role matrix 有測試。

## 完成標準
- BUILD SUCCESS，0 failure/error，integration 不再 skip。
- OpenAPI/ERD/state machine 對同一行為只有一種說法。
- 沒有 orphan code/parcel。

## 證據
- CI/Surefire 輸出
- SQL 查詢結果
- OpenAPI diff
- endpoint 盤點表

## 注意
不要在沒有 Docker 的情況下說 integration 已驗證；不要為了讓測試過而放寬 constraint。

---

## Issue 7

**Title**

[W05][T-42-04] Pickup code 資料完整性與併發

**Assignees**：@Allen06914

**Labels**：`type: code`, `prio: normal`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
協助驗證 pickup code 的資料完整性與併發行為，讓 P0 修正不是隻在單一 happy path 成立。

## 必做
- [ ] Review `PickupCodeIssuanceService`、`PickupCodeGenerator`、`ParcelShelvingService`。
- [ ] 檢查：code 唯一、parcel 只能有一個 code、expiry 為未來、transaction rollback 不會留下 orphan。
- [ ] 用兩個並行請求對同一個 location 上架，確認只有一個成功，另一個得到合理錯誤。
- [ ] 用同一個 parcel 連續上架兩次，確認第二次被拒絕。
- [ ] 檢查 V4 不會把 `48210003`（used）改回 active。
- [ ] 與 R6 跑一次 `mvnw -B verify`，失敗時提供 test name 與 stack trace 前 20 行。

## 完成標準
- 至少 3 個具體 review 點。
- 資料庫最後只有一個 parcel 佔用該 location。
- 錯誤不是 500。
- Demo code 可用，used code 不可用。

## 證據
- PR review comment
- test/SQL 輸出

## 注意
不要只說「看起來沒問題」；給 test 或 SQL 證據。不要改 schema 來繞過 constraint。

---

## Issue 8

**Title**

[W05][T-50-05] 全量測試、defect closure 與 interim report

**Assignees**：@fannaodawang

**Labels**：`type: code`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
把 P0 修正變成可重複的測試證據，讓 defect log、test report 與 coverage 都反映目前 commit。

## 必做
- [ ] 用 Docker 跑 `cd backend && ./mvnw -B verify`，記錄 test methods、failures、skipped。
- [ ] 跑 `cd frontend && npm ci && npm run lint && npm run test:run && npm run build`。
- [ ] 只有在對應 test 真的 pass 後，才把 DEF-PARC-001/002、DEF-SEC-001、DEF-OPS-001 改成 Closed。
- [ ] 寫 3 條 system test：register→shelve→verify→confirm、duplicate waybill、used code。
- [ ] 做 3 次 acceptance 觀察（可請 R5 找人），記錄完成時間與卡點。
- [ ] 重算 JaCoCo，記錄 commit；如果沒有 `jacoco:check`，不要說 60% 是 hard floor。
- [ ] 更新 test plan 的 current status。

## 完成標準
- Backend 沒有 failure/error，integration 不再 skip；frontend 68/68 或更多。
- 每個 Closed defect 都有 test name 或指令輸出。
- 3 條 system test 有步驟、預期、實際、verdict。

## 證據
- interim test report
- defect log diff
- JaCoCo 輸出
- CI 連結

## 注意
不要把 component test 當 system test；不要用舊 coverage 數字。

---

## Issue 9

**Title**

[W05][T-50-11] Report draft、數字與檔案一致性

**Assignees**：@RavenG7

**Labels**：`type: docs`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
把 report 變成可提交的單一檔案，數字與 repo 一致，第一行是 GitHub link。

## 必做
- [ ] 把 `docs/07-report/chapters/01` 到 `09` 依序組成 `report-draft.md`；第一行必須是 GitHub URL。
- [ ] 加上 title block、3 個 figure caption（process、architecture、traceability）。
- [ ] 用 Word 或 script 數字；目標 950–980 字，不超過 1000。
- [ ] 抽查：91 backend test methods、68 frontend tests、18 FKs、36 CRs、929 chapter words。
- [ ] 確認沒有把 CR-013 說成 implemented；coverage 是 historical，不是 current gate。
- [ ] 跑 `python scripts/check_doc_versions.py .` 與 `python scripts/check_table_columns.py .`。
- [ ] 抽查 3 份 logbook，確認 meeting log/contribution/placeholder 狀態，缺失名單交給 R1。

## 完成標準
- 第一行是 link；Word count ≤1000；每張圖在正文被引用。
- 5 個抽查數字全對。
- 兩個 script exit 0。
- 3 份 logbook 抽查有紀錄。

## 證據
- report-draft.md
- word count 截圖
- checklist
- script 輸出

## 注意
不要先做 review 簡報；不要用舊的 85.9% 當 current coverage。

---

## Issue 10

**Title**

[W05][T-30-05] Compose/Nginx/CI smoke 與 backup

**Assignees**：@smcheese9731-sys

**Labels**：`type: setup`, `prio: high`, `week: 5`

**Milestone**：Sprint 3

**Body**

## 任務
證明 production Compose 真的可用，並讓 CI 的 smoke test 覆蓋前端代理路徑。

## 必做
- [ ] `docker compose --profile full up -d --build --wait --wait-timeout 300`。
- [ ] 確認 4 個 services running；`curl http://localhost:8080/api/health` 與 `curl http://localhost/api/health` 都 ok。
- [ ] 開 `http://localhost:80`，用 `demo_staff_1/password` 登入；確認 Nginx 有轉發 `/api`。
- [ ] 確認 `.github/workflows/ci.yml` 的 docker-smoke 是經由 `http://localhost/api/auth/login`。
- [ ] push 分支後看 PR 的 CI；五個 job 都要綠。
- [ ] 在乾淨 volume 與既有 volume 各跑一次 compose，確認 V4 不會讓 Flyway checksum 失敗。
- [ ] 準備 local backup（DB dump 或 volume snapshot）與啟動指令。

## 完成標準
- 四個 services healthy；port 80 登入成功，不是 404/502。
- PR 上五個 job 綠。
- 兩種 volume 都能啟動；backup 可還原到可登入狀態。

## 證據
- `docker compose ps`
- curl 輸出
- 截圖
- CI run 連結

## 注意
不要用 `docker compose up` 起半套然後說完整；不要手動改 DB 讓 demo 過。

---
