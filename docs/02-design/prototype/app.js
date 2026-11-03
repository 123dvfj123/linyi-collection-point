const app = document.getElementById('app');
const now = Date.now();

const navItems = [
  { id: 'dashboard', label: '运营总览', icon: 'layout-dashboard' },
  { id: 'cabinets', label: '柜机与柜格', icon: 'warehouse' },
  { id: 'packages', label: '包裹管理', icon: 'package', count: 5 },
  { id: 'exceptions', label: '异常处理', icon: 'triangle-alert', count: 3 },
  { id: 'users', label: '用户与快递员', icon: 'users' },
  { id: 'reports', label: '运营报表', icon: 'chart-column' },
  { id: 'audit', label: '审计日志', icon: 'scroll-text' },
  { id: 'settings', label: '系统设置', icon: 'settings' }
];

const cabinets = [
  { id: 'A', name: '阳光花园 2 号柜', location: '1 号楼架空层', floors: 4, columns: 6, online: true },
  { id: 'B', name: '阳光花园 3 号柜', location: '3 号楼物业旁', floors: 4, columns: 6, online: true },
  { id: 'C', name: '社区服务中心柜', location: '服务中心东门', floors: 3, columns: 6, online: false }
];

const state = {
  page: 'dashboard', selectedCabinet: 'A', selectedLocker: null,
  packageFilter: 'all', exceptionFilter: 'all', userFilter: 'courier', search: '', lastSync: now,
  packages: [
    { id: 'SF13588420', carrier: '顺丰速运', recipient: '李女士', phone: '138****6621', size: 'M', cabinet: 'A', lockerId: 'A-03-04', status: 'pickup', arrivedAt: now - 42 * 60 * 1000, expiresAt: now + 18 * 60 * 60 * 1000, pickupCode: '482913', courier: '王师傅' },
    { id: 'JD66310298', carrier: '京东物流', recipient: '陈先生', phone: '136****2077', size: 'M', cabinet: 'A', lockerId: 'A-01-05', status: 'occupied', arrivedAt: now - 35 * 60 * 1000, expiresAt: now + 47 * 60 * 60 * 1000, pickupCode: '628401', courier: '王师傅' },
    { id: 'YT99201447', carrier: '圆通速递', recipient: '黄女士', phone: '135****0820', size: 'S', cabinet: 'A', lockerId: 'A-02-04', status: 'pickup', arrivedAt: now - 3 * 60 * 60 * 1000, expiresAt: now + 2.5 * 60 * 60 * 1000, pickupCode: '731504', courier: '林师傅' },
    { id: 'ZTO88740216', carrier: '中通快递', recipient: '赵先生', phone: '139****4438', size: 'L', cabinet: 'B', lockerId: 'B-04-06', status: 'exception', arrivedAt: now - 28 * 60 * 60 * 1000, expiresAt: now - 4 * 60 * 60 * 1000, pickupCode: '190286', courier: '罗师傅' },
    { id: 'SF13588331', carrier: '顺丰速运', recipient: '周女士', phone: '137****3391', size: 'S', cabinet: 'B', lockerId: 'B-02-02', status: 'pickup', arrivedAt: now - 5 * 60 * 60 * 1000, expiresAt: now + 12 * 60 * 60 * 1000, pickupCode: '345901', courier: '王师傅' },
    { id: 'YT99201319', carrier: '圆通速递', recipient: '陈先生', phone: '136****2077', size: 'M', cabinet: 'B', lockerId: 'B-01-04', status: 'picked', arrivedAt: now - 24 * 60 * 60 * 1000, expiresAt: now + 24 * 60 * 60 * 1000, pickupCode: '550184', courier: '林师傅', pickedAt: now - 5 * 60 * 60 * 1000 }
  ]
};

state.exceptions = [
  { id: 'EX-1001', type: 'overdue', packageId: 'ZTO88740216', cabinet: 'B', lockerId: 'B-04-06', detail: '超过 48 小时未取件，已进入异常暂存流程', level: '高', status: 'open', time: now - 4 * 60 * 60 * 1000 },
  { id: 'EX-1002', type: 'door', packageId: null, cabinet: 'C', lockerId: 'C-02-03', detail: '柜门传感器无响应，已暂停自动分配', level: '中', status: 'processing', time: now - 8 * 60 * 60 * 1000 },
  { id: 'EX-1003', type: 'contact', packageId: 'YT99201447', cabinet: 'A', lockerId: 'A-02-04', detail: '收件人电话暂时无法接通，等待二次通知', level: '低', status: 'open', time: now - 1 * 60 * 60 * 1000 }
];
state.couriers = [
  { id: 'C001', name: '王师傅', company: '顺丰速运', phone: '138****1201', deliveries: 126, active: true },
  { id: 'C002', name: '林师傅', company: '圆通速递', phone: '139****7712', deliveries: 98, active: true },
  { id: 'C003', name: '罗师傅', company: '中通快递', phone: '136****4408', deliveries: 74, active: false }
];
state.residents = [
  { id: 'R001', name: '李女士', building: '1 号楼 1208', phone: '138****6621', packages: 18, active: true },
  { id: 'R002', name: '陈先生', building: '2 号楼 0806', phone: '136****2077', packages: 11, active: true },
  { id: 'R003', name: '黄女士', building: '3 号楼 1602', phone: '135****0820', packages: 7, active: true }
];
state.audit = [
  { id: 1, actor: '系统', action: '同步柜机状态', target: 'A 柜 · 24 个柜格', detail: '检测到 2 个状态变化', time: now - 2 * 60 * 1000 },
  { id: 2, actor: '运营管理员', action: '延长保管时间', target: 'YT99201447', detail: '增加 24 小时', time: now - 18 * 60 * 1000 },
  { id: 3, actor: '快递员王师傅', action: '投递包裹', target: 'A-01-05', detail: '京东物流 JD66310298', time: now - 35 * 60 * 1000 },
  { id: 4, actor: '运营管理员', action: '设置维护', target: 'C-02-03', detail: '柜门传感器无响应', time: now - 8 * 60 * 60 * 1000 }
];
state.settings = { storageHours: 48, reminderHours: 6, autoOverdue: true, smsNotice: true, maintenanceMode: false };

const lockers = [];
cabinets.forEach((cabinet) => {
  for (let floor = 1; floor <= cabinet.floors; floor += 1) {
    for (let number = 1; number <= cabinet.columns; number += 1) {
      const id = `${cabinet.id}-${String(floor).padStart(2, '0')}-${String(number).padStart(2, '0')}`;
      const size = number <= 2 ? 'S' : number <= 4 ? 'M' : 'L';
      let status = ((floor + number + cabinet.id.charCodeAt(0)) % 4 === 0) ? 'occupied' : 'available';
      if (cabinet.id === 'C' && floor === 2 && number === 3) status = 'maintenance';
      lockers.push({ id, cabinet: cabinet.id, floor, number, size, status, packageId: null, updatedAt: now });
    }
  }
});
state.packages.forEach((pkg) => {
  const locker = lockers.find((item) => item.id === pkg.lockerId);
  if (locker) { locker.packageId = pkg.id; locker.status = pkg.status === 'exception' ? 'maintenance' : pkg.status === 'picked' ? 'available' : pkg.status; }
});

const statusLabels = { available: '空闲', occupied: '已占用', pickup: '待取件', picked: '已取件', maintenance: '维护中', exception: '异常', open: '待处理', processing: '处理中', resolved: '已解决' };
const sizeLabels = { S: '小格', M: '中格', L: '大格' };
function icon(name, size = 16) { return `<i data-lucide="${name}" aria-hidden="true" data-size="${size}"></i>`; }
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function formatDateTime(timestamp) { return new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(timestamp); }
function formatRelative(timestamp) {
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  return `${Math.floor(hours / 24)} 天前`;
}
function formatCountdown(timestamp) {
  const diff = timestamp - Date.now();
  if (diff <= 0) return '已超时';
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours} 小时 ${minutes % 60} 分钟` : `${minutes} 分钟`;
}
function cabinetName(id) { return cabinets.find((item) => item.id === id)?.name || id; }
function getLocker(id) { return lockers.find((item) => item.id === id); }
function getPackage(id) { return state.packages.find((item) => item.id === id); }
function cabinetLockers(id) { return lockers.filter((item) => item.cabinet === id); }
function occupancy(id) { const set = cabinetLockers(id); return set.length ? Math.round((set.filter((item) => item.status !== 'available').length / set.length) * 100) : 0; }
function availableBySize(cabinetId, size) { return cabinetLockers(cabinetId).filter((item) => item.status === 'available' && item.size === size); }
function nextLocker(cabinetId, size) { return availableBySize(cabinetId, size)[0] || cabinetLockers(cabinetId).find((item) => item.status === 'available'); }
function addAudit(action, target, detail) { state.audit.unshift({ id: Date.now(), actor: '运营管理员', action, target, detail, time: Date.now() }); }
function toast(title, message, type = 'success') {
  let stack = document.getElementById('toast-stack');
  if (!stack) { stack = document.createElement('div'); stack.id = 'toast-stack'; stack.className = 'toast-stack'; document.body.appendChild(stack); }
  const item = document.createElement('div');
  item.className = 'toast';
  item.innerHTML = `${icon(type === 'success' ? 'circle-check' : 'info', 17)}<div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(message)}</p></div>`;
  stack.appendChild(item);
  if (window.lucide) window.lucide.createIcons();
  setTimeout(() => item.remove(), 4200);
}

function renderShell() {
  return `<div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">柜</div><div><div class="brand-title">柜管家</div><div class="brand-subtitle">LOCKER ADMIN CONSOLE</div></div></div>
      <div class="community-card"><div class="community-label">当前管理项目</div><div class="community-name">阳光花园社区快递柜</div><div class="community-meta">${icon('map-pin', 14)} 3 台柜机 · 66 个柜格</div></div>
      <nav class="nav" aria-label="后台管理功能">${navItems.map((item) => `<button type="button" class="nav-button ${state.page === item.id ? 'active' : ''}" data-action="navigate" data-page="${item.id}">${icon(item.icon, 18)}<span>${item.label}</span>${item.count ? `<span class="nav-count">${item.count}</span>` : ''}</button>`).join('')}</nav>
      <div class="sidebar-footer"><div class="sidebar-user"><div class="avatar">运</div><div><strong>运营管理员</strong><span>后台管理权限 · 在线</span></div></div></div>
    </aside>
    <main class="main">
      <header class="topbar"><div class="topbar-title"><h1>${navItems.find((item) => item.id === state.page)?.label || '运营总览'}</h1><p>柜机、包裹、取件、异常和审计统一管理</p></div>
        <div class="topbar-actions"><div class="live-pill"><span class="live-dot"></span><span id="sync-label">实时同步 · ${formatRelative(state.lastSync)}</span></div>
          <div class="role-switch" aria-label="切换柜机">${cabinets.map((item) => `<button type="button" class="role-button ${state.selectedCabinet === item.id ? 'active' : ''}" data-action="select-cabinet" data-cabinet="${item.id}">${item.id} 柜</button>`).join('')}</div>
          <button class="icon-button has-dot" type="button" data-action="sync" aria-label="同步柜机">${icon('refresh-cw', 17)}</button>
          <button class="button button-primary" type="button" data-action="add-package">${icon('plus', 16)}登记包裹</button>
        </div>
      </header>
      <div class="content">${renderPage()}</div>
    </main>
  </div>`;
}

function renderPage() {
  const pages = { dashboard: renderDashboard, cabinets: renderCabinets, packages: renderPackages, exceptions: renderExceptions, users: renderUsers, reports: renderReports, audit: renderAudit, settings: renderSettings };
  return (pages[state.page] || renderDashboard)();
}

function renderLockerGrid(cabinetId, filter = 'all') {
  const items = cabinetLockers(cabinetId).filter((locker) => {
    if (filter === 'all') return true;
    if (filter === 'occupied') return locker.status === 'occupied' || locker.status === 'pickup';
    return locker.status === filter;
  });
  if (!items.length) return `<div class="empty-state">${icon('layout-grid', 29)}<strong>没有符合条件的柜格</strong><p>更换筛选条件后再查看。</p></div>`;
  return `<div class="locker-grid">${items.map((locker) => {
    const pkg = locker.packageId ? getPackage(locker.packageId) : null;
    return `<button type="button" class="locker-cell ${locker.status} ${state.selectedLocker === locker.id ? 'selected' : ''}" data-action="open-locker" data-locker="${locker.id}"><strong>${locker.id}</strong><span>${sizeLabels[locker.size]}</span><small>${pkg ? (locker.status === 'pickup' ? '待取' : '占用') : statusLabels[locker.status]}</small></button>`;
  }).join('')}</div>`;
}

function renderLegend() {
  return `<div class="legend"><span><i style="background:var(--success)"></i>空闲</span><span><i style="background:var(--warning)"></i>待取件</span><span><i style="background:var(--info)"></i>已占用</span><span><i style="background:var(--danger)"></i>维护中</span></div>`;
}

function renderAuditRows(limit = 6) {
  return state.audit.slice(0, limit).map((item) => `<div class="alert-row"><div class="alert-copy"><strong>${item.action} · ${item.target}</strong><span>${item.actor} · ${item.detail}</span></div><span class="text-small" style="color:var(--muted)">${formatRelative(item.time)}</span></div>`).join('');
}

function renderDashboard() {
  const allLockers = lockers.length;
  const used = lockers.filter((item) => item.status !== 'available').length;
  const picking = state.packages.filter((item) => item.status === 'pickup').length;
  const online = cabinets.filter((item) => item.online).length;
  return `<section class="page">
    <div class="page-head"><div><h2>运营总览</h2><p>社区快递柜设备、包裹和异常的实时状态</p></div><div class="button-row"><button class="button" type="button" data-action="sync">${icon('refresh-cw', 16)}同步全部柜机</button><button class="button button-primary" type="button" data-action="add-package">${icon('plus', 16)}登记包裹</button></div></div>
    <div class="stat-grid">
      <div class="card card-pad stat-card"><div class="stat-label"><span>在线柜机</span>${icon('warehouse', 17)}</div><div class="stat-value">${online}/${cabinets.length}</div><div class="stat-note">1 台设备需要维护</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>柜格占用率</span>${icon('chart-pie', 17)}</div><div class="stat-value">${Math.round((used / allLockers) * 100)}%</div><div class="stat-note">${used} / ${allLockers} 个柜格</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>待取件</span>${icon('package-open', 17)}</div><div class="stat-value">${picking}</div><div class="stat-note">2 件存在超时风险</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>待处理异常</span>${icon('triangle-alert', 17)}</div><div class="stat-value">${state.exceptions.filter((item) => item.status !== 'resolved').length}</div><div class="stat-note">${state.exceptions.filter((item) => item.level === '高').length} 条高优先级</div></div>
    </div>
    <div class="dashboard-grid">
      <div class="card card-pad"><div class="panel-head"><div><h3>柜机运行状态</h3><p>实时容量和在线状态</p></div><button class="panel-link" type="button" data-action="navigate" data-page="cabinets">进入柜机管理</button></div>
        ${cabinets.map((item) => `<div class="occupancy-row"><span>${item.id} 柜 · ${item.online ? '在线' : '离线'}</span><div class="progress"><span style="width:${occupancy(item.id)}%"></span></div><strong>${occupancy(item.id)}%</strong></div>`).join('')}
        <div class="helper-box">${icon('info', 16)}<span>C 柜当前离线，系统已暂停自动分配新包裹。运维人员可查看设备告警和维护记录。</span></div>
      </div>
      <div class="card card-pad"><div class="panel-head"><div><h3>实时操作记录</h3><p>投递、取件、维护和系统同步</p></div><button class="panel-link" type="button" data-action="navigate" data-page="audit">全部日志</button></div>${renderAuditRows(6)}</div>
    </div>
    <div class="card card-pad"><div class="panel-head"><div><h3>最近包裹</h3><p>后台可查看柜格分配、状态和取件时间</p></div><button class="panel-link" type="button" data-action="navigate" data-page="packages">包裹管理</button></div>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>运单号</th><th>快递公司</th><th>收件人</th><th>柜格</th><th>状态</th><th>到期时间</th></tr></thead><tbody>${state.packages.slice(0, 5).map((pkg) => `<tr><td class="mono">${pkg.id}</td><td>${pkg.carrier}</td><td>${pkg.recipient}</td><td>${pkg.lockerId}</td><td><span class="status ${pkg.status}">${statusLabels[pkg.status]}</span></td><td>${formatDateTime(pkg.expiresAt)}</td></tr>`).join('')}</tbody></table></div>
    </div>
  </section>`;
}

function renderCabinets() {
  const cabinet = cabinets.find((item) => item.id === state.selectedCabinet);
  const selected = state.selectedLocker ? getLocker(state.selectedLocker) : null;
  const pkg = selected?.packageId ? getPackage(selected.packageId) : null;
  const detail = selected ? `<div class="panel-head"><div><h3>柜格 ${selected.id}</h3><p>${sizeLabels[selected.size]} · ${statusLabels[selected.status]} · 更新于 ${formatRelative(selected.updatedAt)}</p></div><span class="status ${selected.status}">${statusLabels[selected.status]}</span></div>
    <div class="timeline"><div class="timeline-item"><div class="timeline-icon">${icon('box', 14)}</div><div><strong>柜格尺寸</strong><p>${sizeLabels[selected.size]}，用于匹配不同包裹体积。</p></div></div><div class="timeline-item"><div class="timeline-icon">${icon('activity', 14)}</div><div><strong>设备状态</strong><p>柜门锁控在线，最近一次传感器同步于 ${formatDateTime(selected.updatedAt)}。</p></div></div>${pkg ? `<div class="timeline-item"><div class="timeline-icon">${icon('package', 14)}</div><div><strong>当前包裹 ${pkg.id}</strong><p>${pkg.recipient} · ${pkg.carrier} · ${statusLabels[pkg.status]}</p></div></div>` : ''}</div>
    <div class="button-row" style="margin-top:16px"><button class="button ${selected.status === 'maintenance' ? 'button-soft' : 'button-danger'}" type="button" data-action="toggle-maintenance" data-locker="${selected.id}">${icon('wrench', 16)}${selected.status === 'maintenance' ? '恢复使用' : '设为维护'}</button>${pkg && pkg.status === 'pickup' ? `<button class="button button-primary" type="button" data-action="pickup-package" data-package="${pkg.id}">${icon('door-open', 16)}后台确认取件</button>` : ''}</div>` : `<div class="empty-state">${icon('mouse-pointer-click', 29)}<strong>选择一个柜格</strong><p>查看尺寸、状态、当前包裹和执行维护操作。</p></div>`;
  return `<section class="page">
    <div class="page-head"><div><h2>柜机与柜格</h2><p>${cabinet.name} · ${cabinet.location}</p></div><div class="button-row"><button class="button" type="button" data-action="sync">${icon('refresh-cw', 16)}同步设备</button><button class="button button-primary" type="button" data-action="add-cabinet">${icon('plus', 16)}新增柜机</button></div></div>
    <div class="stat-grid">
      <div class="card card-pad stat-card"><div class="stat-label"><span>柜机状态</span>${icon('wifi', 17)}</div><div class="stat-value" style="font-size:20px">${cabinet.online ? '在线' : '离线'}</div><div class="stat-note">最近同步 ${formatRelative(state.lastSync)}</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>柜格总数</span>${icon('layout-grid', 17)}</div><div class="stat-value">${cabinetLockers(cabinet.id).length}</div><div class="stat-note">按小、中、大三种尺寸配置</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>空闲柜格</span>${icon('circle-check', 17)}</div><div class="stat-value">${cabinetLockers(cabinet.id).filter((item) => item.status === 'available').length}</div><div class="stat-note">可参与自动分配</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>维护柜格</span>${icon('wrench', 17)}</div><div class="stat-value">${cabinetLockers(cabinet.id).filter((item) => item.status === 'maintenance').length}</div><div class="stat-note">不参与包裹分配</div></div>
    </div>
    <div class="dashboard-grid"><div class="card card-pad locker-panel"><div class="locker-toolbar"><div class="filter-row">${[['all', '全部'], ['available', '空闲'], ['pickup', '待取件'], ['occupied', '已占用'], ['maintenance', '维护']].map(([id, label]) => `<button type="button" class="filter-button ${state.packageFilter === id ? 'active' : ''}" data-action="filter-lockers" data-filter="${id}">${label}</button>`).join('')}</div>${renderLegend()}</div>${renderLockerGrid(cabinet.id, state.packageFilter)}</div><div class="card card-pad">${detail}</div></div>
  </section>`;
}

function renderPackages() {
  const query = state.search.trim().toLowerCase();
  const filtered = state.packages.filter((pkg) => {
    const statusMatch = state.packageFilter === 'all' || pkg.status === state.packageFilter;
    const queryMatch = !query || [pkg.id, pkg.carrier, pkg.recipient, pkg.phone, pkg.lockerId].some((value) => String(value).toLowerCase().includes(query));
    return statusMatch && queryMatch;
  });
  return `<section class="page">
    <div class="page-head"><div><h2>包裹管理</h2><p>查询运单、柜格分配、到期时间和取件状态</p></div><div class="button-row"><button class="button" type="button" data-action="export">${icon('download', 16)}导出记录</button><button class="button button-primary" type="button" data-action="add-package">${icon('plus', 16)}登记包裹</button></div></div>
    <div class="card card-pad"><div class="panel-head"><div><h3>全部包裹</h3><p>共 ${state.packages.length} 条，当前显示 ${filtered.length} 条</p></div><div class="filter-row">${[['all', '全部'], ['pickup', '待取件'], ['occupied', '已占用'], ['exception', '异常'], ['picked', '已取件']].map(([id, label]) => `<button type="button" class="filter-button ${state.packageFilter === id ? 'active' : ''}" data-action="filter-packages" data-filter="${id}">${label}</button>`).join('')}</div></div>
      <label class="field" style="margin-bottom:14px">搜索<input type="search" data-action="search-packages" value="${escapeHtml(state.search)}" placeholder="运单号、收件人、手机号或柜格"></label>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>运单号</th><th>快递公司</th><th>收件人</th><th>柜格</th><th>状态</th><th>到期时间</th><th>操作</th></tr></thead><tbody>${filtered.map((pkg) => `<tr><td class="mono">${pkg.id}</td><td>${pkg.carrier}</td><td>${pkg.recipient}<br><span class="mono">${pkg.phone}</span></td><td>${pkg.lockerId}</td><td><span class="status ${pkg.status}">${statusLabels[pkg.status]}</span></td><td>${formatDateTime(pkg.expiresAt)}</td><td><div class="button-row"><button class="button button-ghost" type="button" data-action="package-detail" data-package="${pkg.id}">详情</button>${pkg.status === 'pickup' || pkg.status === 'occupied' ? `<button class="button button-soft" type="button" data-action="pickup-package" data-package="${pkg.id}">确认取件</button>` : ''}</div></td></tr>`).join('')}</tbody></table></div>
    </div>
  </section>`;
}

function renderExceptions() {
  const filtered = state.exceptions.filter((item) => state.exceptionFilter === 'all' || item.status === state.exceptionFilter);
  return `<section class="page">
    <div class="page-head"><div><h2>异常处理</h2><p>超时未取、柜门故障、联系失败和容量异常</p></div><button class="button button-primary" type="button" data-action="add-exception">${icon('plus', 16)}登记异常</button></div>
    <div class="stat-grid">
      <div class="card card-pad stat-card"><div class="stat-label"><span>待处理</span>${icon('triangle-alert', 17)}</div><div class="stat-value">${state.exceptions.filter((item) => item.status === 'open').length}</div><div class="stat-note">需要运营人员跟进</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>处理中</span>${icon('loader-circle', 17)}</div><div class="stat-value">${state.exceptions.filter((item) => item.status === 'processing').length}</div><div class="stat-note">等待设备或用户回复</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>高优先级</span>${icon('siren', 17)}</div><div class="stat-value">${state.exceptions.filter((item) => item.level === '高').length}</div><div class="stat-note">建议 30 分钟内处理</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>本月已解决</span>${icon('circle-check', 17)}</div><div class="stat-value">27</div><div class="stat-note">平均处理 42 分钟</div></div>
    </div>
    <div class="card card-pad"><div class="panel-head"><div><h3>异常记录</h3><p>按优先级和发生时间排序</p></div><div class="filter-row">${[['all', '全部'], ['open', '待处理'], ['processing', '处理中'], ['resolved', '已解决']].map(([id, label]) => `<button type="button" class="filter-button ${state.exceptionFilter === id ? 'active' : ''}" data-action="filter-exceptions" data-filter="${id}">${label}</button>`).join('')}</div></div>
      ${filtered.map((item) => `<div class="alert-row"><div class="alert-copy"><strong>${item.id} · ${item.lockerId} · ${item.detail}</strong><span>${cabinetName(item.cabinet)} · ${item.packageId || '设备异常'} · ${formatRelative(item.time)}</span></div><div class="button-row"><span class="status ${item.status}">${statusLabels[item.status]}</span><span class="status ${item.level === '高' ? 'exception' : item.level === '中' ? 'pickup' : 'occupied'}">${item.level}优先级</span>${item.status !== 'resolved' ? `<button class="button button-soft" type="button" data-action="resolve-exception" data-exception="${item.id}">标记解决</button>` : ''}</div></div>`).join('')}
    </div>
  </section>`;
}

function renderUsers() {
  const rows = state.userFilter === 'courier' ? state.couriers : state.residents;
  return `<section class="page">
    <div class="page-head"><div><h2>用户与快递员</h2><p>维护快递员账号、社区居民档案和账号状态</p></div><div class="button-row"><button class="button" type="button" data-action="export">${icon('download', 16)}导出名单</button><button class="button button-primary" type="button" data-action="add-user">${icon('user-plus', 16)}新增账号</button></div></div>
    <div class="card card-pad"><div class="panel-head"><div><h3>账号列表</h3><p>仅展示必要的脱敏信息</p></div><div class="filter-row"><button type="button" class="filter-button ${state.userFilter === 'courier' ? 'active' : ''}" data-action="filter-users" data-filter="courier">快递员</button><button type="button" class="filter-button ${state.userFilter === 'resident' ? 'active' : ''}" data-action="filter-users" data-filter="resident">社区居民</button></div></div>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>编号</th><th>姓名</th><th>${state.userFilter === 'courier' ? '快递公司' : '楼栋房号'}</th><th>联系电话</th><th>${state.userFilter === 'courier' ? '累计投递' : '累计包裹'}</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map((item) => `<tr><td class="mono">${item.id}</td><td>${item.name}</td><td>${item.company || item.building}</td><td class="mono">${item.phone}</td><td>${item.deliveries || item.packages}</td><td><span class="status ${item.active ? 'available' : 'picked'}">${item.active ? '启用' : '停用'}</span></td><td><button class="button button-ghost" type="button" data-action="toggle-user" data-user="${item.id}">${item.active ? '停用' : '启用'}</button></td></tr>`).join('')}</tbody></table></div>
    </div>
    <div class="card card-pad"><div class="panel-head"><div><h3>权限说明</h3><p>后台账号按角色控制访问</p></div></div><div class="alert-row"><div class="alert-copy"><strong>超级管理员</strong><span>管理柜机、用户、系统设置和全部数据</span></div><span class="status available">完整权限</span></div><div class="alert-row"><div class="alert-copy"><strong>社区运营员</strong><span>处理包裹、异常、通知和日常报表</span></div><span class="status pickup">运营权限</span></div><div class="alert-row"><div class="alert-copy"><strong>维修人员</strong><span>只查看设备告警和柜格维护记录</span></div><span class="status occupied">设备权限</span></div></div>
  </section>`;
}

function renderReports() {
  const totalPackages = state.packages.length + 128;
  const allSizes = ['S', 'M', 'L'];
  return `<section class="page"><div class="page-head"><div><h2>运营报表</h2><p>近 7 天投递、取件、容量和异常表现</p></div><button class="button" type="button" data-action="export">${icon('download', 16)}导出 CSV</button></div>
    <div class="stat-grid">
      <div class="card card-pad stat-card"><div class="stat-label"><span>累计投递</span>${icon('package-check', 17)}</div><div class="stat-value">${totalPackages}</div><div class="stat-note">较上周 +12.8%</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>准时取件率</span>${icon('timer', 17)}</div><div class="stat-value">92.4%</div><div class="stat-note">目标 95%</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>平均停留</span>${icon('clock-3', 17)}</div><div class="stat-value">6.4h</div><div class="stat-note">较上周 -0.8h</div></div>
      <div class="card card-pad stat-card"><div class="stat-label"><span>异常率</span>${icon('triangle-alert', 17)}</div><div class="stat-value">2.1%</div><div class="stat-note">超时和柜门故障为主</div></div>
    </div>
    <div class="dashboard-grid"><div class="card card-pad"><div class="panel-head"><div><h3>柜格使用率</h3><p>按尺寸统计当前占用情况</p></div></div>${allSizes.map((size) => { const set = lockers.filter((item) => item.size === size); const used = set.filter((item) => item.status !== 'available').length; const rate = Math.round((used / Math.max(1, set.length)) * 100); return `<div class="occupancy-row"><span>${sizeLabels[size]}</span><div class="progress"><span style="width:${rate}%"></span></div><strong>${rate}%</strong></div>`; }).join('')}</div>
      <div class="card card-pad"><div class="panel-head"><div><h3>异常原因</h3><p>近 7 天共 11 条</p></div></div><div class="occupancy-row"><span>超时未取</span><div class="progress"><span style="width:46%"></span></div><strong>46%</strong></div><div class="occupancy-row"><span>柜门故障</span><div class="progress"><span style="width:27%"></span></div><strong>27%</strong></div><div class="occupancy-row"><span>联系失败</span><div class="progress"><span style="width:18%"></span></div><strong>18%</strong></div><div class="occupancy-row"><span>其他</span><div class="progress"><span style="width:9%"></span></div><strong>9%</strong></div></div></div>
  </section>`;
}

function renderAudit() {
  return `<section class="page"><div class="page-head"><div><h2>审计日志</h2><p>记录后台操作、柜机事件和系统同步结果</p></div><button class="button" type="button" data-action="export">${icon('download', 16)}导出日志</button></div>
    <div class="card card-pad"><div class="panel-head"><div><h3>操作记录</h3><p>共 ${state.audit.length} 条，按时间倒序排列</p></div></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>时间</th><th>操作人</th><th>操作类型</th><th>对象</th><th>详情</th></tr></thead><tbody>${state.audit.map((item) => `<tr><td>${formatDateTime(item.time)}</td><td>${item.actor}</td><td>${item.action}</td><td class="mono">${item.target}</td><td>${item.detail}</td></tr>`).join('')}</tbody></table></div></div>
  </section>`;
}

function renderSettings() {
  return `<section class="page"><div class="page-head"><div><h2>系统设置</h2><p>配置保管时限、通知规则和维护模式</p></div><button class="button button-primary" type="button" data-action="save-settings">${icon('save', 16)}保存设置</button></div>
    <div class="dashboard-grid"><div class="card card-pad"><div class="panel-head"><div><h3>包裹规则</h3><p>影响新建包裹的默认到期时间</p></div></div><div class="form-grid"><label class="field">默认保管时长（小时）<input type="number" id="storage-hours" value="${state.settings.storageHours}"></label><label class="field">到期前提醒（小时）<input type="number" id="reminder-hours" value="${state.settings.reminderHours}"></label><label class="field full"><span>自动识别超时包裹</span><input type="checkbox" id="auto-overdue" ${state.settings.autoOverdue ? 'checked' : ''}></label></div></div>
      <div class="card card-pad"><div class="panel-head"><div><h3>通知与维护</h3><p>后台通知和柜机维护策略</p></div></div><div class="form-grid"><label class="field full"><span>短信通知</span><input type="checkbox" id="sms-notice" ${state.settings.smsNotice ? 'checked' : ''}></label><label class="field full"><span>全局维护模式</span><input type="checkbox" id="maintenance-mode" ${state.settings.maintenanceMode ? 'checked' : ''}></label></div><div class="helper-box" style="margin-top:14px">${icon('shield-check', 16)}<span>全局维护模式开启后，所有柜机暂停投递和取件操作，但后台仍可查看数据。</span></div></div></div>
    <div class="card card-pad"><div class="panel-head"><div><h3>后台角色权限</h3><p>当前系统支持三类内部账号</p></div></div><div class="alert-row"><div class="alert-copy"><strong>超级管理员</strong><span>管理全部柜机、账号、系统设置和审计日志</span></div><span class="status available">完整权限</span></div><div class="alert-row"><div class="alert-copy"><strong>社区运营员</strong><span>包裹登记、取件确认、异常处理和运营报表</span></div><span class="status pickup">运营权限</span></div><div class="alert-row"><div class="alert-copy"><strong>维修人员</strong><span>柜机状态、维修工单和柜格维护</span></div><span class="status occupied">设备权限</span></div></div>
  </section>`;
}

function getModalRoot() {
  let root = document.getElementById('modal-root');
  if (!root) { root = document.createElement('div'); root.id = 'modal-root'; document.body.appendChild(root); }
  return root;
}
function closeModal() { getModalRoot().innerHTML = ''; }
function openModal(content) {
  getModalRoot().innerHTML = `<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true">${content}</div></div>`;
  if (window.lucide) window.lucide.createIcons();
}
function modalHead(title, subtitle) {
  return `<div class="modal-head"><div><h3>${title}</h3><p>${subtitle}</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon('x', 17)}</button></div>`;
}

function openAddPackageModal() {
  openModal(`${modalHead('登记包裹', '系统会根据柜机容量和包裹尺寸自动分配柜格')}<form class="modal-body" id="package-form"><div class="form-grid">
    <label class="field">运单号<input name="id" required value="SF${Date.now().toString().slice(-10)}"></label>
    <label class="field">快递公司<select name="carrier"><option>顺丰速运</option><option>京东物流</option><option>圆通速递</option><option>中通快递</option></select></label>
    <label class="field">收件人<input name="recipient" required value="李女士"></label>
    <label class="field">联系电话<input name="phone" required value="138****6621"></label>
    <label class="field">包裹尺寸<select name="size"><option value="S">小格</option><option value="M" selected>中格</option><option value="L">大格</option></select></label>
    <label class="field">首选柜机<select name="cabinet">${cabinets.filter((item) => item.online).map((item) => `<option value="${item.id}">${item.id} 柜 · ${item.name}</option>`).join('')}</select></label>
    <label class="field full">快递员<select name="courier">${state.couriers.map((item) => `<option>${item.name}</option>`).join('')}</select></label>
    </div><div class="helper-box" style="margin-top:14px">${icon('route', 16)}<span>提交后柜格状态将变为待取件，并自动生成 6 位取件码。</span></div><div class="modal-actions"><button class="button" type="button" data-action="close-modal">取消</button><button class="button button-primary" type="submit">${icon('package-check', 16)}确认分配柜格</button></div></form>`);
}

function openPackageDetail(packageId) {
  const pkg = getPackage(packageId);
  if (!pkg) return;
  openModal(`${modalHead(`包裹 ${pkg.id}`, `${pkg.carrier} · ${statusLabels[pkg.status]}`)}<div class="modal-body"><div class="timeline">
    <div class="timeline-item"><div class="timeline-icon">${icon('user-round', 14)}</div><div><strong>收件人信息</strong><p>${pkg.recipient} · ${pkg.phone}</p></div></div>
    <div class="timeline-item"><div class="timeline-icon">${icon('layout-grid', 14)}</div><div><strong>柜格信息</strong><p>${cabinetName(pkg.cabinet)} · ${pkg.lockerId} · ${sizeLabels[pkg.size]}</p></div></div>
    <div class="timeline-item"><div class="timeline-icon">${icon('key-round', 14)}</div><div><strong>取件码</strong><p>${pkg.pickupCode} · 仅后台授权人员可查看</p></div></div>
    <div class="timeline-item"><div class="timeline-icon">${icon('clock-3', 14)}</div><div><strong>时间信息</strong><p>到达：${formatDateTime(pkg.arrivedAt)} · 到期：${formatDateTime(pkg.expiresAt)}</p></div></div>
    </div><div class="modal-actions"><button class="button" type="button" data-action="extend-package" data-package="${pkg.id}">${icon('clock-plus', 16)}延长 24 小时</button>${pkg.status === 'pickup' || pkg.status === 'occupied' ? `<button class="button button-primary" type="button" data-action="pickup-package" data-package="${pkg.id}">${icon('door-open', 16)}后台确认取件</button>` : ''}</div></div>`);
}

function confirmPickup(packageId) {
  const pkg = getPackage(packageId);
  if (!pkg || pkg.status === 'picked') return;
  pkg.status = 'picked';
  pkg.pickedAt = Date.now();
  const locker = getLocker(pkg.lockerId);
  if (locker) { locker.status = 'available'; locker.packageId = null; locker.updatedAt = Date.now(); }
  addAudit('后台确认取件', pkg.id, `柜格 ${pkg.lockerId} 已恢复可用`);
  state.lastSync = Date.now();
  closeModal();
  toast('取件确认成功', `${pkg.id} 已取件，${pkg.lockerId} 已恢复空闲。`);
  render();
}

function extendPackage(packageId) {
  const pkg = getPackage(packageId);
  if (!pkg) return;
  pkg.expiresAt += 24 * 60 * 60 * 1000;
  addAudit('延长保管时间', pkg.id, '后台延长 24 小时');
  closeModal();
  toast('延长成功', `${pkg.id} 的保管时间已增加 24 小时。`);
  render();
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) { if (event.target.classList.contains('modal-backdrop')) closeModal(); return; }
  const action = target.dataset.action;
  if (action === 'close-modal') { closeModal(); return; }
  if (action === 'navigate') { state.page = target.dataset.page; render(); }
  if (action === 'select-cabinet') { state.selectedCabinet = target.dataset.cabinet; state.selectedLocker = null; render(); }
  if (action === 'filter-packages') { state.packageFilter = target.dataset.filter; render(); }
  if (action === 'filter-lockers') { state.packageFilter = target.dataset.filter; render(); }
  if (action === 'filter-exceptions') { state.exceptionFilter = target.dataset.filter; render(); }
  if (action === 'filter-users') { state.userFilter = target.dataset.filter; render(); }
  if (action === 'open-locker') { state.selectedLocker = target.dataset.locker; state.page = 'cabinets'; render(); }
  if (action === 'add-package') openAddPackageModal();
  if (action === 'package-detail') openPackageDetail(target.dataset.package);
  if (action === 'pickup-package') confirmPickup(target.dataset.package);
  if (action === 'extend-package') extendPackage(target.dataset.package);
  if (action === 'sync') { state.lastSync = Date.now(); addAudit('同步柜机状态', '全部柜机', '后台手动触发状态同步'); toast('同步完成', '全部柜机状态已刷新。'); render(); }
  if (action === 'export') toast('导出任务已创建', '演示环境未生成真实文件。', 'info');
  if (action === 'toggle-maintenance') {
    const locker = getLocker(target.dataset.locker);
    if (!locker) return;
    if (locker.status !== 'maintenance' && locker.packageId) { toast('无法维护', '该柜格仍有包裹，请先确认取件。', 'info'); return; }
    locker.status = locker.status === 'maintenance' ? 'available' : 'maintenance';
    locker.updatedAt = Date.now();
    addAudit('柜格维护', locker.id, locker.status === 'maintenance' ? '设为维护状态' : '恢复使用');
    state.lastSync = Date.now();
    toast('柜格状态已更新', `${locker.id} 已设为${statusLabels[locker.status]}。`);
    render();
  }
  if (action === 'resolve-exception') {
    const item = state.exceptions.find((entry) => entry.id === target.dataset.exception);
    if (item) { item.status = 'resolved'; addAudit('处理异常', item.id, '异常已标记解决'); toast('异常已解决', `${item.id} 已关闭。`); render(); }
  }
  if (action === 'toggle-user') {
    const item = [...state.couriers, ...state.residents].find((entry) => entry.id === target.dataset.user);
    if (item) { item.active = !item.active; addAudit(item.active ? '启用账号' : '停用账号', item.id, item.name); toast('账号状态已更新', `${item.name} 已${item.active ? '启用' : '停用'}。`); render(); }
  }
  if (action === 'add-cabinet') toast('新增柜机', '正式版本应在这里绑定设备序列号和柜格布局。', 'info');
  if (action === 'add-user') toast('新增账号', '正式版本应发送账号邀请并配置角色权限。', 'info');
  if (action === 'add-exception') toast('登记异常', '正式版本应选择柜格、异常类型和处理负责人。', 'info');
});

document.addEventListener('input', (event) => {
  if (event.target.matches('[data-action="search-packages"]')) {
    state.search = event.target.value;
    render();
    requestAnimationFrame(() => document.querySelector('[data-action="search-packages"]')?.focus());
  }
});

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action="save-settings"]');
  if (!target) return;
  state.settings.storageHours = Number(document.getElementById('storage-hours')?.value || 48);
  state.settings.reminderHours = Number(document.getElementById('reminder-hours')?.value || 6);
  state.settings.autoOverdue = Boolean(document.getElementById('auto-overdue')?.checked);
  state.settings.smsNotice = Boolean(document.getElementById('sms-notice')?.checked);
  state.settings.maintenanceMode = Boolean(document.getElementById('maintenance-mode')?.checked);
  addAudit('更新系统设置', '全局配置', `保管 ${state.settings.storageHours} 小时 · 提醒 ${state.settings.reminderHours} 小时`);
  toast('设置已保存', '系统规则已即时应用。');
  render();
});

document.addEventListener('submit', (event) => {
  if (event.target.id !== 'package-form') return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const locker = nextLocker(data.cabinet, data.size);
  if (!locker) { toast('柜格不足', `${data.cabinet} 柜暂无合适尺寸的空闲柜格。`, 'info'); return; }
  const pkg = {
    id: data.id, carrier: data.carrier, recipient: data.recipient, phone: data.phone, size: data.size,
    cabinet: data.cabinet, lockerId: locker.id, status: 'pickup', arrivedAt: Date.now(),
    expiresAt: Date.now() + state.settings.storageHours * 60 * 60 * 1000,
    pickupCode: String(Math.floor(100000 + Math.random() * 900000)), courier: data.courier
  };
  state.packages.unshift(pkg);
  locker.status = 'pickup';
  locker.packageId = pkg.id;
  locker.updatedAt = Date.now();
  addAudit('登记包裹并分配柜格', pkg.id, `${locker.id} · ${pkg.recipient}`);
  state.lastSync = Date.now();
  closeModal();
  toast('柜格分配成功', `${pkg.id} 已分配至 ${locker.id}，取件码 ${pkg.pickupCode}。`);
  render();
});

function updateLiveValues() {
  const sync = document.getElementById('sync-label');
  if (sync) sync.textContent = `实时同步 · ${formatRelative(state.lastSync)}`;
}

render();
window.setInterval(updateLiveValues, 1000);

function render() {
  app.innerHTML = renderShell();
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons({ attrs: { width: 16, height: 16 } });
  }
}
