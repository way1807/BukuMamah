// ==========================================================================
// BUKUUTANG MAMA - APPLICATION CONTROLLER
// ==========================================================================

// --- State Variables ---
let customers = [];
let selectedCustomerId = null;
let currentTheme = 'light';

// --- DOM Cache Elements (Dynamic Getters to prevent null reference errors) ---
const DOM = {
  // Navigation & Views
  get navDashboard() { return document.getElementById('nav-dashboard'); },
  get navBackup() { return document.getElementById('nav-backup'); },
  get statsView() { return document.getElementById('stats-view'); },
  get workspaceGrid() { return document.querySelector('.workspace-grid'); },
  get backupView() { return document.getElementById('backup-view'); },
  
  // Theme Toggles
  get themeToggle() { return document.getElementById('theme-toggle'); },
  get themeToggleMobile() { return document.getElementById('theme-toggle-mobile'); },
  get themeText() { return document.querySelector('.theme-text'); },
  
  // Stats
  get welcomeText() { return document.getElementById('welcome-text'); },
  get currentDateText() { return document.getElementById('current-date'); },
  get statTotalPiutang() { return document.getElementById('stat-total-piutang'); },
  get statTotalTerbayar() { return document.getElementById('stat-total-terbayar'); },
  get statTotalCustomers() { return document.getElementById('stat-total-customers'); },
  get statDebtRatio() { return document.getElementById('stat-debt-ratio'); },
  
  // Customer Directory
  get customerCountBadge() { return document.getElementById('customer-count-badge'); },
  get searchCustomer() { return document.getElementById('search-customer'); },
  get filterLocation() { return document.getElementById('filter-location'); },
  get filterStatus() { return document.getElementById('filter-status'); },
  get sortBy() { return document.getElementById('sort-by'); },
  get customerListContainer() { return document.getElementById('customer-list-container'); },
  get btnAddCustomerTop() { return document.getElementById('btn-add-customer-top'); },
  get btnAddCustomerEmpty() { return document.getElementById('btn-add-customer-empty'); },
  
  // Active Ledger Panel
  get ledgerPanel() { return document.getElementById('ledger-panel'); },
  get ledgerEmptyState() { return document.getElementById('ledger-empty-state'); },
  get ledgerActiveState() { return document.getElementById('ledger-active-state'); },
  get activeCustomerName() { return document.getElementById('active-customer-name'); },
  get activeCustomerPhone() { return document.getElementById('active-customer-phone'); },
  get activeCustomerPhoneLink() { return document.getElementById('active-customer-phone-link'); },
  get activeCustomerAddress() { return document.getElementById('active-customer-address'); },
  get activeCustomerJoined() { return document.getElementById('active-customer-joined'); },
  get activeCustomerBalance() { return document.getElementById('active-customer-balance'); },
  get activeCustomerTotalBorrowed() { return document.getElementById('active-customer-total-borrowed'); },
  get activeCustomerTotalPaid() { return document.getElementById('active-customer-total-paid'); },
  get btnBackToList() { return document.getElementById('btn-back-to-list'); },
  
  // Transaction Form
  get formAddTransaction() { return document.getElementById('form-add-transaction'); },
  get txAmount() { return document.getElementById('tx-amount'); },
  get txDate() { return document.getElementById('tx-date'); },
  get txDesc() { return document.getElementById('tx-desc'); },
  get txTypeBorrow() { return document.getElementById('tx-type-borrow'); },
  get txTypePay() { return document.getElementById('tx-type-pay'); },
  
  // History & Actions
  get transactionHistoryContainer() { return document.getElementById('transaction-history-container'); },
  get btnWATagih() { return document.getElementById('btn-wa-tagih'); },
  get btnEditCustomer() { return document.getElementById('btn-edit-customer'); },
  get btnDeleteCustomer() { return document.getElementById('btn-delete-customer'); },
  
  // Backup / Restore
  get btnExportData() { return document.getElementById('btn-export-data'); },
  get btnExportExcel() { return document.getElementById('btn-export-excel'); },
  get btnTriggerImport() { return document.getElementById('btn-trigger-import'); },
  get importFileInput() { return document.getElementById('import-file-input'); },
  get importStatusText() { return document.getElementById('import-status-text'); },
  
  // CSV Import Extensions
  get btnDownloadTemplateCsv() { return document.getElementById('btn-download-template-csv'); },
  get btnTriggerCsvImport() { return document.getElementById('btn-trigger-csv-import'); },
  get csvFileInput() { return document.getElementById('csv-file-input'); },
  
  // Modals
  get customerModal() { return document.getElementById('customer-modal'); },
  get formCustomer() { return document.getElementById('form-customer'); },
  get customerEditId() { return document.getElementById('customer-edit-id'); },
  get customerNameInput() { return document.getElementById('customer-name'); },
  get customerPhoneInput() { return document.getElementById('customer-phone'); },
  get customerAddressInput() { return document.getElementById('customer-address'); },
  get customerInitialDebt() { return document.getElementById('customer-initial-debt'); },
  get customerInitialDate() { return document.getElementById('customer-initial-date'); },
  get customerInitialDesc() { return document.getElementById('customer-initial-desc'); },
  get initialDebtContainer() { return document.getElementById('initial-debt-container'); },
  get customerModalTitle() { return document.getElementById('customer-modal-title'); },
  get btnSubmitCustomerModal() { return document.getElementById('btn-submit-customer-modal'); },
  get btnCloseCustomerModal() { return document.getElementById('btn-close-customer-modal'); },
  get btnCancelCustomerModal() { return document.getElementById('btn-cancel-customer-modal'); },
  get customerModalOverlay() { return document.getElementById('customer-modal-overlay'); },
  
  // Edit Transaction Modal
  get editTxModal() { return document.getElementById('edit-tx-modal'); },
  get editTxModalOverlay() { return document.getElementById('edit-tx-modal-overlay'); },
  get btnCloseEditTxModal() { return document.getElementById('btn-close-edit-tx-modal'); },
  get btnCancelEditTxModal() { return document.getElementById('btn-cancel-edit-tx-modal'); },
  get formEditTx() { return document.getElementById('form-edit-tx'); },
  get editTxId() { return document.getElementById('edit-tx-id'); },
  get editTxCustomerId() { return document.getElementById('edit-tx-customer-id'); },
  get editTxAmount() { return document.getElementById('edit-tx-amount'); },
  get editTxDate() { return document.getElementById('edit-tx-date'); },
  get editTxDesc() { return document.getElementById('edit-tx-desc'); },
  get editTxTypeBorrow() { return document.getElementById('edit-tx-type-borrow'); },
  get editTxTypePay() { return document.getElementById('edit-tx-type-pay'); },
  
  // CSV Preview Modal
  get csvPreviewModal() { return document.getElementById('csv-preview-modal'); },
  get csvPreviewOverlay() { return document.getElementById('csv-preview-overlay'); },
  get btnCloseCsvModal() { return document.getElementById('btn-close-csv-modal'); },
  get btnCancelCsvModal() { return document.getElementById('btn-cancel-csv-modal'); },
  get btnConfirmCsvImport() { return document.getElementById('btn-confirm-csv-import'); },
  get csvTotalCount() { return document.getElementById('csv-total-count'); },
  get csvTotalDebt() { return document.getElementById('csv-total-debt'); },
  get csvPreviewTbody() { return document.getElementById('csv-preview-tbody'); },
  get csvSelectAll() { return document.getElementById('csv-select-all'); },

  get deleteConfirmModal() { return document.getElementById('delete-confirm-modal'); },
  get deleteTargetName() { return document.getElementById('delete-target-name'); },
  get btnConfirmDelete() { return document.getElementById('btn-confirm-delete'); },
  get btnCancelDelete() { return document.getElementById('btn-cancel-delete'); },
  get deleteModalOverlay() { return document.getElementById('delete-modal-overlay'); },
  
  // Cloud Sync DOM Cache
  get btnCloudStatus() { return document.getElementById('btn-cloud-status'); },
  get cloudDot() { return document.getElementById('cloud-dot'); },
  get cloudBadgeText() { return document.getElementById('cloud-badge-text'); },
  get cloudCardDot() { return document.getElementById('cloud-card-dot'); },
  get cloudCardStatusText() { return document.getElementById('cloud-card-status-text'); },
  get btnOpenSyncModal() { return document.getElementById('btn-open-sync-modal'); },
  get btnShareSyncWa() { return document.getElementById('btn-share-sync-wa'); },
  get syncModal() { return document.getElementById('sync-modal'); },
  get syncModalOverlay() { return document.getElementById('sync-modal-overlay'); },
  get btnCloseSyncModal() { return document.getElementById('btn-close-sync-modal'); },
  get btnCancelSyncModal() { return document.getElementById('btn-cancel-sync-modal'); },
  get btnSaveSyncCode() { return document.getElementById('btn-save-sync-code'); },
  get btnGenerateSyncCode() { return document.getElementById('btn-generate-sync-code'); },
  get btnDisconnectSync() { return document.getElementById('btn-disconnect-sync'); },
  get syncCodeInput() { return document.getElementById('sync-code-input'); },
  get btnResetAllData() { return document.getElementById('btn-reset-all-data'); },

  // Quick Chips Getters
  get quickAddressWrapper() { return document.getElementById('quick-address-wrapper'); },
  get quickAddressChips() { return document.getElementById('quick-address-chips'); },
  get quickDescChips() { return document.getElementById('quick-desc-chips'); },

  // Daily Recap Getters
  get statTodayCash() { return document.getElementById('stat-today-cash'); },
  get statTodaySubtext() { return document.getElementById('stat-today-subtext'); },
  get btnOpenDailyRecap() { return document.getElementById('btn-open-daily-recap'); },
  get dailyRecapModal() { return document.getElementById('daily-recap-modal'); },
  get dailyRecapModalOverlay() { return document.getElementById('daily-recap-modal-overlay'); },
  get btnCloseDailyRecap() { return document.getElementById('btn-close-daily-recap'); },
  get btnCancelDailyRecap() { return document.getElementById('btn-cancel-daily-recap'); },
  get recapDatePicker() { return document.getElementById('recap-date-picker'); },
  get recapTotalReceived() { return document.getElementById('recap-total-received'); },
  get recapTotalBorrowed() { return document.getElementById('recap-total-borrowed'); },
  get recapTxCount() { return document.getElementById('recap-tx-count'); },
  get recapHistoryList() { return document.getElementById('recap-history-list'); },

  get toastContainer() { return document.getElementById('toast-container'); }
};

// ==========================================================================
// THEME CONTROLLER (LIGHT / DARK MODE)
// ==========================================================================
function setTheme(theme) {
  currentTheme = theme;
  if (theme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    if (DOM.themeText) DOM.themeText.textContent = 'Mode Terang';
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    if (DOM.themeText) DOM.themeText.textContent = 'Mode Gelap';
  }
  localStorage.setItem('bukuutang_mama_theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('bukuutang_mama_theme') || 'light';
  setTheme(savedTheme);
}

function toggleTheme() {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  showToast(`Mode ${nextTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan.`);
}

// ==========================================================================
// UTILITY HELPERS
// ==========================================================================

// Format Number to Rupiah (IDR)
function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Clean and sanitize phone number for WhatsApp URL (international format without '+' or '0' prefix)
function sanitizePhoneNumber(phone) {
  let cleaned = phone.replace(/\D/g, ''); // strip non-digits
  
  // If starts with 0, change to 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  
  // If it doesn't start with 62, prepend it (assuming Indonesian numbers)
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  
  return cleaned;
}

// Format date to local Indonesian format (TANGGAL SAJA, TANPA JAM)
function formatDateOnly(dateStr) {
  if (!dateStr) return '';
  
  // Extract YYYY-MM-DD cleanly if ISO string or date input string
  const cleanStr = dateStr.slice(0, 10);
  const parts = cleanStr.split('-');
  
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d);
  }
  
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(d);
}

// Get current local date string (Indonesian name of day and month)
function updateCurrentHeaderDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  DOM.currentDateText.textContent = today.toLocaleDateString('id-ID', options);
}

// Set date input default to current local date (YYYY-MM-DD)
function setTransactionDateDefault() {
  const todayStr = new Date().toISOString().slice(0, 10);
  DOM.txDate.value = todayStr;
  if (DOM.customerInitialDate) {
    DOM.customerInitialDate.value = todayStr;
  }
}

// Format numbers with thousands separators as the user types
function setupCurrencyInputFormatter(inputElement) {
  inputElement.addEventListener('input', (e) => {
    // Save cursor position
    let cursorPosition = e.target.selectionStart;
    let originalLength = e.target.value.length;
    
    // Strip everything except numbers
    let value = e.target.value.replace(/\D/g, '');
    
    if (value === '') {
      e.target.value = '';
      return;
    }
    
    // Convert to currency string format
    let formattedValue = new Intl.NumberFormat('id-ID').format(parseInt(value, 10));
    e.target.value = formattedValue;
    
    // Adjust cursor position
    let newLength = formattedValue.length;
    cursorPosition = cursorPosition + (newLength - originalLength);
    e.target.setSelectionRange(cursorPosition, cursorPosition);
  });
}

// Parse formatted currency back to floating number
function parseCurrencyString(formattedStr) {
  return parseFloat(formattedStr.replace(/\./g, '')) || 0;
}

// Toast Alert displayer
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Custom icons based on type
  let icon = '';
  if (type === 'success') {
    icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  } else if (type === 'danger') {
    icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  } else {
    icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  }
  
  toast.innerHTML = `${icon} <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);
  
  // Auto remove toast
  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ==========================================================================
// CORE DATA BUSINESS LOGIC & LEDGER CALCULATOR
// ==========================================================================

// Calculate total debt for a single customer
function getCustomerBalance(customer) {
  let borrowed = 0;
  let paid = 0;
  
  customer.transactions.forEach(tx => {
    if (tx.type === 'tambah') {
      borrowed += tx.amount;
    } else if (tx.type === 'bayar') {
      paid += tx.amount;
    }
  });
  
  return {
    borrowed,
    paid,
    balance: borrowed - paid
  };
}

// Calculate dashboard metrics for all customers
function getDashboardStats() {
  let totalPiutang = 0;
  let totalTerbayar = 0;
  let activeDebtCustomersCount = 0;
  let paidOffCustomersCount = 0;
  
  customers.forEach(customer => {
    const { borrowed, paid, balance } = getCustomerBalance(customer);
    totalPiutang += balance > 0 ? balance : 0;
    totalTerbayar += paid;
    
    if (balance > 0) {
      activeDebtCustomersCount++;
    } else if (customer.transactions.length > 0 && balance <= 0) {
      paidOffCustomersCount++;
    }
  });
  
  return {
    totalPiutang,
    totalTerbayar,
    activeDebtCustomersCount,
    paidOffCustomersCount
  };
}

// ==========================================================================
// SUPABASE REAL-TIME CLOUD DATABASE ENGINE
// ==========================================================================
const SUPABASE_URL = 'https://lmzxcokvlfsjvyajcpji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtenhjb2t2bGZzanZ5YWpjcGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDQzMTEsImV4cCI6MjEwMTc4MDMxMX0.4VeVr7hCNZH5L1af_R_QHtExiWmf50f-ZizqWDYGgkU';

let currentSyncCode = null;
let syncPollingTimer = null;
let isSyncingToCloud = false;

function sanitizeSyncCode(code) {
  if (!code) return '';
  return code.toString().trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}

function updateCloudStatusUI() {
  if (currentSyncCode) {
    const codeDisplay = currentSyncCode;
    if (DOM.cloudBadgeText) DOM.cloudBadgeText.textContent = `Cloud: ${codeDisplay}`;
    if (DOM.cloudDot) DOM.cloudDot.className = 'cloud-dot online';
    if (DOM.cloudCardDot) DOM.cloudCardDot.className = 'status-indicator-dot online';
    if (DOM.cloudCardStatusText) DOM.cloudCardStatusText.textContent = `Status: 🟢 Tersambung (Kode: ${codeDisplay})`;
    if (DOM.btnShareSyncWa) DOM.btnShareSyncWa.style.display = 'inline-flex';
    if (DOM.btnDisconnectSync) DOM.btnDisconnectSync.style.display = 'inline-block';
  } else {
    if (DOM.cloudBadgeText) DOM.cloudBadgeText.textContent = 'Cloud: Off';
    if (DOM.cloudDot) DOM.cloudDot.className = 'cloud-dot';
    if (DOM.cloudCardDot) DOM.cloudCardDot.className = 'status-indicator-dot';
    if (DOM.cloudCardStatusText) DOM.cloudCardStatusText.textContent = 'Status: Belum Terhubung (Mode Lokal)';
    if (DOM.btnShareSyncWa) DOM.btnShareSyncWa.style.display = 'none';
    if (DOM.btnDisconnectSync) DOM.btnDisconnectSync.style.display = 'none';
  }
}

async function pushToCloud() {
  if (!currentSyncCode || isSyncingToCloud) return;
  isSyncingToCloud = true;

  const cleanCode = sanitizeSyncCode(currentSyncCode);
  const timestamp = Date.now();
  localStorage.setItem('bukuutang_mama_last_update', timestamp.toString());

  const payload = {
    code: cleanCode,
    customers: customers,
    updated_at: timestamp
  };

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/stores`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Supabase cloud push error:', err);
  } finally {
    isSyncingToCloud = false;
  }
}

async function fetchFromCloud(silent = false) {
  if (!currentSyncCode) return;

  const cleanCode = sanitizeSyncCode(currentSyncCode);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stores?code=eq.${encodeURIComponent(cleanCode)}`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!res.ok) return;
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      const storeRecord = data[0];
      const cloudTimestamp = parseInt(storeRecord.updated_at || '0', 10);
      const localTimestamp = parseInt(localStorage.getItem('bukuutang_mama_last_update') || '0', 10);

      if (cloudTimestamp > localTimestamp) {
        customers = storeRecord.customers || [];
        localStorage.setItem('bukuutang_mama_customers_active', JSON.stringify(customers));
        localStorage.setItem('bukuutang_mama_last_update', cloudTimestamp.toString());

        if (customers.length > 0 && !selectedCustomerId) {
          selectedCustomerId = customers[0].id;
        }

        refreshUI();
        if (silent) {
          showToast('Data diperbarui dari Database Cloud ☁️');
        }
      }
    } else if (customers.length > 0) {
      // If store record doesn't exist on Supabase yet, push local data to create it
      pushToCloud();
    }
  } catch (err) {
    console.warn('Supabase cloud fetch error:', err);
  }
}

function startCloudRealtimeSync() {
  if (syncPollingTimer) clearInterval(syncPollingTimer);
  fetchFromCloud(false);
  // Poll every 3 seconds for instant real-time synchronization between devices
  syncPollingTimer = setInterval(() => fetchFromCloud(true), 3000);
}

function initCloudSync() {
  const urlParams = new URLSearchParams(window.location.search);
  const syncParam = urlParams.get('sync');

  if (syncParam) {
    const cleanCode = sanitizeSyncCode(syncParam);
    if (cleanCode) {
      currentSyncCode = cleanCode;
      localStorage.setItem('bukuutang_mama_sync_code', cleanCode);
      showToast(`Tersambung ke Database Cloud Kode: ${cleanCode}!`);
    }
  } else {
    const savedCode = localStorage.getItem('bukuutang_mama_sync_code');
    if (savedCode) {
      currentSyncCode = sanitizeSyncCode(savedCode);
    }
  }

  updateCloudStatusUI();
  if (currentSyncCode) {
    startCloudRealtimeSync();
  }
}

function openSyncModal() {
  if (DOM.syncCodeInput) {
    DOM.syncCodeInput.value = currentSyncCode || '';
  }
  updateCloudStatusUI();
  if (DOM.syncModal) DOM.syncModal.classList.add('active');
}

function closeSyncModal() {
  if (DOM.syncModal) DOM.syncModal.classList.remove('active');
}

function saveSyncCode() {
  const code = sanitizeSyncCode(DOM.syncCodeInput.value);
  if (!code) {
    showToast('Masukkan Kode Sync yang valid!', 'warning');
    return;
  }

  currentSyncCode = code;
  localStorage.setItem('bukuutang_mama_sync_code', code);
  updateCloudStatusUI();
  startCloudRealtimeSync();
  pushToCloud();
  closeSyncModal();
  showToast(`Berhasil terhubung ke Database Cloud: ${code}!`);
}

function disconnectSync() {
  currentSyncCode = null;
  localStorage.removeItem('bukuutang_mama_sync_code');
  if (syncPollingTimer) clearInterval(syncPollingTimer);
  updateCloudStatusUI();
  closeSyncModal();
  showToast('Koneksi Cloud diputuskan (Kembali ke Mode Lokal).');
}

function generateRandomSyncCode() {
  const prefix = 'MAMA';
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const code = `${prefix}${randNum}`;
  if (DOM.syncCodeInput) DOM.syncCodeInput.value = code;
}

function shareSyncCodeWA() {
  if (!currentSyncCode) return;
  const baseUrl = window.location.origin + window.location.pathname;
  const link = `${baseUrl}?sync=${currentSyncCode}`;

  const msg = `Halo Mama! 🙏 Ini link otomatis untuk menyambungkan aplikasi *BukuUtang Mama* secara Real-Time:\n\n👉 ${link}\n\nKode Sync: *${currentSyncCode}*\n\nBuka link di atas di HP Mama, maka seluruh pembukuan utang-piutang langsung tersambung otomatis dengan HP anak! 😊`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Save customers state to local storage and sync to cloud
function saveState() {
  localStorage.setItem('bukuutang_mama_customers_active', JSON.stringify(customers));
  pushToCloud();
}

// Load customers state from local storage
function loadState() {
  const data = localStorage.getItem('bukuutang_mama_customers_active');
  if (data) {
    try {
      customers = JSON.parse(data);
    } catch (e) {
      showToast('Gagal memuat data dari memori browser!', 'danger');
      customers = [];
    }
  } else {
    customers = [];
    saveState();
  }
}

// Seed mock data for beautiful presentation if empty
function seedMockData() {
  const today = new Date();
  const formatIso = (daysAgo) => {
    const d = new Date();
    d.setDate(today.getDate() - daysAgo);
    return d.toISOString().slice(0, 16);
  };

  customers = [
    {
      id: 'c1',
      name: 'Ibu Endang Warung',
      phone: '81234567890',
      address: 'Jl. Flamboyan Raya No. 12, RT 02/03',
      createdAt: formatIso(15),
      transactions: [
        { id: 't1', type: 'tambah', amount: 150000, description: 'Beras Pandan Wangi 10kg', date: formatIso(15) },
        { id: 't2', type: 'tambah', amount: 85000, description: 'Telur Ayam 2.5kg', date: formatIso(14) },
        { id: 't3', type: 'bayar', amount: 100000, description: 'Cicilan Pertama', date: formatIso(10) },
        { id: 't4', type: 'tambah', amount: 45000, description: 'Minyak Goreng 2L', date: formatIso(5) }
      ]
    },
    {
      id: 'c2',
      name: 'Pak RT Bambang',
      phone: '85776543210',
      address: 'Pos Satpam / Kantor RT 05, Samping Masjid',
      createdAt: formatIso(8),
      transactions: [
        { id: 't5', type: 'tambah', amount: 500000, description: 'Sewa Tenda Kas RT', date: formatIso(8) },
        { id: 't6', type: 'bayar', amount: 500000, description: 'Lunas Bayar Kas', date: formatIso(2) }
      ]
    },
    {
      id: 'c3',
      name: 'Mbak Rina Hijab',
      phone: '89988776655',
      address: 'Perum Citra Indah, Blok D4 No. 17',
      createdAt: formatIso(20),
      transactions: [
        { id: 't7', type: 'tambah', amount: 120000, description: 'Beli Daster 2 pcs', date: formatIso(20) },
        { id: 't8', type: 'tambah', amount: 65000, description: 'Kerudung Pashmina', date: formatIso(18) }
      ]
    }
  ];
  saveState();
}

// ==========================================================================
// RENDERERS & DATA BINDINGS
// ==========================================================================

// Render Dashboard Statistics Card Panel
function renderStats() {
  const stats = getDashboardStats();
  
  DOM.statTotalPiutang.textContent = formatIDR(stats.totalPiutang);
  DOM.statTotalTerbayar.textContent = formatIDR(stats.totalTerbayar);
  DOM.statTotalCustomers.textContent = `${customers.length} Orang`;
  DOM.statDebtRatio.textContent = `${stats.activeDebtCustomersCount} Berutang, ${stats.paidOffCustomersCount} Lunas`;

  // Calculate Today's Income (Uang Masuk Hari Ini)
  const todayStr = new Date().toISOString().slice(0, 10);
  let todayReceived = 0;
  let todayPayersCount = 0;

  customers.forEach(c => {
    let cPaidToday = false;
    (c.transactions || []).forEach(t => {
      const txDateStr = (t.date || '').slice(0, 10);
      if (txDateStr === todayStr && t.type === 'bayar') {
        todayReceived += t.amount || 0;
        cPaidToday = true;
      }
    });
    if (cPaidToday) todayPayersCount++;
  });

  if (DOM.statTodayCash) DOM.statTodayCash.textContent = formatIDR(todayReceived);
  if (DOM.statTodaySubtext) {
    DOM.statTodaySubtext.textContent = todayPayersCount > 0 
      ? `${todayPayersCount} Nasabah bayar hari ini 🔍`
      : 'Klik untuk lihat rekap 🔍';
  }
}

// Update Location Filter Dropdown Options
function updateLocationFilterOptions() {
  if (!DOM.filterLocation) return;
  const currentVal = DOM.filterLocation.value || 'all';
  const addresses = Array.from(
    new Set(
      customers
        .map(c => (c.address || '').trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  DOM.filterLocation.innerHTML = `<option value="all">Semua Lokasi (${customers.length})</option>`;
  addresses.forEach(addr => {
    const count = customers.filter(c => (c.address || '').trim().toLowerCase() === addr.toLowerCase()).length;
    const option = document.createElement('option');
    option.value = addr;
    option.textContent = `📍 ${addr} (${count})`;
    DOM.filterLocation.appendChild(option);
  });

  if (addresses.some(a => a.toLowerCase() === currentVal.toLowerCase())) {
    DOM.filterLocation.value = currentVal;
  } else {
    DOM.filterLocation.value = 'all';
  }
}

// Render Directory List (Left Column)
function renderCustomerList() {
  updateLocationFilterOptions();
  const searchQuery = DOM.searchCustomer.value.toLowerCase().trim();
  const locationVal = DOM.filterLocation ? DOM.filterLocation.value : 'all';
  const filterVal = DOM.filterStatus.value;
  const sortVal = DOM.sortBy.value;
  
  // Filter
  let filtered = customers.filter(customer => {
    // Search match
    const nameMatch = customer.name.toLowerCase().includes(searchQuery);
    const phoneMatch = customer.phone.includes(searchQuery);
    const addressMatch = (customer.address || '').toLowerCase().includes(searchQuery);
    if (!nameMatch && !phoneMatch && !addressMatch) return false;
    
    // Location filter
    if (locationVal !== 'all') {
      const custAddr = (customer.address || '').trim().toLowerCase();
      if (custAddr !== locationVal.toLowerCase()) return false;
    }

    // Status filter
    const { balance } = getCustomerBalance(customer);
    if (filterVal === 'debt' && balance <= 0) return false;
    if (filterVal === 'paid' && (balance > 0 || customer.transactions.length === 0)) return false;
    
    return true;
  });
  
  // Sort
  filtered.sort((a, b) => {
    const balA = getCustomerBalance(a).balance;
    const balB = getCustomerBalance(b).balance;
    
    switch (sortVal) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'debt-desc':
        return balB - balA;
      case 'debt-asc':
        return balA - balB;
      case 'date-desc':
      default:
        // sort by newest customer created date
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  
  // Update badge count
  DOM.customerCountBadge.textContent = `${filtered.length} Nasabah`;
  
  // Build customer element container
  DOM.customerListContainer.innerHTML = '';
  
  if (filtered.length === 0) {
    DOM.customerListContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <p>Nasabah tidak ditemukan.</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(customer => {
    const { balance } = getCustomerBalance(customer);
    const isActive = customer.id === selectedCustomerId;
    
    const div = document.createElement('div');
    div.className = `customer-item ${isActive ? 'active' : ''}`;
    div.dataset.id = customer.id;
    
    const isUnpaid = balance > 0;
    const statusPillClass = isUnpaid ? 'unpaid' : 'paid';
    const statusPillText = isUnpaid ? 'Ada Utang' : 'Lunas';
    
    div.innerHTML = `
      <div class="customer-item-info">
        <span class="customer-item-name">${customer.name}</span>
        <span class="customer-item-phone">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${customer.phone ? `+62 ${customer.phone}` : 'WhatsApp: -'}
        </span>
        <span class="customer-item-address" title="${customer.address || 'Alamat tidak diisi'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          ${customer.address || '-'}
        </span>
      </div>
      <div class="customer-item-meta">
        <span class="customer-item-debt ${isUnpaid ? 'text-danger' : 'text-success'}">${formatIDR(balance)}</span>
        <span class="customer-item-status-pill ${statusPillClass}">${statusPillText}</span>
      </div>
    `;
    
    div.addEventListener('click', () => {
      selectCustomer(customer.id);
    });
    
    DOM.customerListContainer.appendChild(div);
  });
}

// Render Ledger Panel (Right Column)
function renderLedger() {
  if (!selectedCustomerId) {
    DOM.ledgerEmptyState.classList.remove('d-none');
    DOM.ledgerActiveState.classList.add('d-none');
    DOM.workspaceGrid.classList.remove('customer-selected');
    return;
  }
  
  const customer = customers.find(c => c.id === selectedCustomerId);
  if (!customer) {
    selectedCustomerId = null;
    saveState();
    renderLedger();
    renderCustomerList();
    return;
  }
  
  DOM.ledgerEmptyState.classList.add('d-none');
  DOM.ledgerActiveState.classList.remove('d-none');
  DOM.workspaceGrid.classList.add('customer-selected');
  
  // Customer headers
  DOM.activeCustomerName.textContent = customer.name;
  DOM.activeCustomerAddress.textContent = `Alamat: ${customer.address || '-'}`;
  DOM.activeCustomerJoined.textContent = `Bergabung: ${new Date(customer.createdAt).toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'})}`;
  
  if (customer.phone) {
    DOM.activeCustomerPhone.textContent = `+62 ${customer.phone}`;
    DOM.activeCustomerPhoneLink.href = `https://wa.me/${sanitizePhoneNumber(customer.phone)}`;
    DOM.activeCustomerPhoneLink.style.display = 'inline-flex';
  } else {
    DOM.activeCustomerPhone.textContent = 'WhatsApp tidak tersedia';
    DOM.activeCustomerPhoneLink.removeAttribute('href');
    DOM.activeCustomerPhoneLink.style.display = 'none';
  }
  
  // Balances
  const { borrowed, paid, balance } = getCustomerBalance(customer);
  
  DOM.activeCustomerBalance.textContent = formatIDR(balance);
  if (balance <= 0) {
    DOM.activeCustomerBalance.className = 'balance-amount debt-free';
  } else {
    DOM.activeCustomerBalance.className = 'balance-amount';
  }
  
  DOM.activeCustomerTotalBorrowed.textContent = formatIDR(borrowed);
  DOM.activeCustomerTotalPaid.textContent = formatIDR(paid);
  
  // Disable / Enable WA reminder button based on balance and phone number availability
  if (balance <= 0 || !customer.phone) {
    DOM.btnWATagih.disabled = true;
    DOM.btnWATagih.style.opacity = '0.5';
    DOM.btnWATagih.style.pointerEvents = 'none';
  } else {
    DOM.btnWATagih.disabled = false;
    DOM.btnWATagih.style.opacity = '1';
    DOM.btnWATagih.style.pointerEvents = 'auto';
  }
  
  // Render transactions timeline list
  DOM.transactionHistoryContainer.innerHTML = '';
  
  if (customer.transactions.length === 0) {
    DOM.transactionHistoryContainer.innerHTML = `
      <div class="empty-state" style="padding: 2rem 1rem;">
        <p style="margin-bottom: 0;">Belum ada riwayat transaksi.</p>
      </div>
    `;
    return;
  }
  
  // Sort transactions by date descending (newest first)
  const sortedTransactions = [...customer.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  sortedTransactions.forEach(tx => {
    const isBorrow = tx.type === 'tambah';
    const div = document.createElement('div');
    div.className = `history-item ${isBorrow ? 'type-borrow' : 'type-pay'}`;
    
    div.innerHTML = `
      <div class="history-item-details">
        <span class="history-item-desc">${tx.description}</span>
        <span class="history-item-date">${formatDateOnly(tx.date)}</span>
      </div>
      <div class="history-item-right">
        <span class="history-item-value ${isBorrow ? 'text-danger' : 'text-success'}">
          ${isBorrow ? '+' : '-'} ${formatIDR(tx.amount)}
        </span>
        <button class="history-item-delete btn-edit-tx-item" data-txid="${tx.id}" title="Edit Catatan Transaksi">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
        </button>
        <button class="history-item-delete" data-txid="${tx.id}" title="Hapus Catatan">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    `;
    
    // Add edit listener
    div.querySelector('.btn-edit-tx-item').addEventListener('click', (e) => {
      const txId = e.currentTarget.dataset.txid;
      openEditTxModal(customer.id, txId);
    });

    // Add delete listener
    div.querySelector('.history-item-delete:not(.btn-edit-tx-item)').addEventListener('click', (e) => {
      const txId = e.currentTarget.dataset.txid;
      deleteTransaction(customer.id, txId);
    });
    
    DOM.transactionHistoryContainer.appendChild(div);
  });
}

// Select active customer
function selectCustomer(id) {
  selectedCustomerId = id;
  setTransactionDateDefault(); // Automatically update to current device time
  renderCustomerList();
  renderLedger();
  
  // Scroll details panel to top on mobile for quick visibility
  if (window.innerWidth <= 1024) {
    DOM.ledgerPanel.scrollIntoView({ behavior: 'smooth' });
  }
}

// Rerender all components
function refreshUI() {
  renderStats();
  renderCustomerList();
  renderLedger();
  renderQuickChips();
}

// --- Quick Select Chips Controller (Pilihan Cepat 1-Klik Mama) ---
const PRESET_DESCRIPTIONS = ['Beli Beras 5kg', 'Minyak & Telur', 'Rokok & Kopi', 'Cicilan ke-1', 'Pelunasan Utang'];

function renderQuickChips() {
  // 1. Render ONLY Real Saved Addresses from Active Customer Data
  if (DOM.quickAddressChips && DOM.quickAddressWrapper) {
    const existingAddresses = Array.from(
      new Set(
        customers
          .map(c => (c.address || '').trim())
          .filter(Boolean)
      )
    ).slice(0, 6); // Take up to 6 most recent unique saved locations

    if (existingAddresses.length > 0) {
      DOM.quickAddressWrapper.style.display = 'flex';
      DOM.quickAddressChips.innerHTML = '';
      existingAddresses.forEach(addr => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip-btn';
        btn.textContent = addr;
        btn.addEventListener('click', () => {
          if (DOM.customerAddressInput) {
            DOM.customerAddressInput.value = addr;
            DOM.customerAddressInput.focus();
          }
        });
        DOM.quickAddressChips.appendChild(btn);
      });
    } else {
      DOM.quickAddressWrapper.style.display = 'none';
    }
  }
}

// --- Daily Recap Modal Controller ---
function renderDailyRecap(dateStr) {
  if (!dateStr) dateStr = new Date().toISOString().slice(0, 10);
  if (DOM.recapDatePicker) DOM.recapDatePicker.value = dateStr;

  let totalReceived = 0;
  let totalBorrowed = 0;
  let matchingTxList = [];

  customers.forEach(customer => {
    (customer.transactions || []).forEach(tx => {
      const txDateStr = (tx.date || '').slice(0, 10);
      if (txDateStr === dateStr) {
        if (tx.type === 'bayar') {
          totalReceived += tx.amount || 0;
        } else if (tx.type === 'tambah') {
          totalBorrowed += tx.amount || 0;
        }
        matchingTxList.push({
          ...tx,
          customerName: customer.name,
          customerAddress: customer.address
        });
      }
    });
  });

  if (DOM.recapTotalReceived) DOM.recapTotalReceived.textContent = formatIDR(totalReceived);
  if (DOM.recapTotalBorrowed) DOM.recapTotalBorrowed.textContent = formatIDR(totalBorrowed);
  if (DOM.recapTxCount) DOM.recapTxCount.textContent = `${matchingTxList.length} Catatan`;

  if (DOM.recapHistoryList) {
    DOM.recapHistoryList.innerHTML = '';
    if (matchingTxList.length === 0) {
      DOM.recapHistoryList.innerHTML = `<p class="text-muted text-center pad-y-md">Tidak ada transaksi pada tanggal ini.</p>`;
      return;
    }

    matchingTxList.forEach(tx => {
      const isBorrow = tx.type === 'tambah';
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-item-left">
          <span class="history-type-badge ${isBorrow ? 'borrow' : 'pay'}">
            ${isBorrow ? 'Utang' : 'Bayar'}
          </span>
          <div class="history-details">
            <span class="history-desc font-semibold">${tx.customerName}</span>
            <span class="history-desc text-muted">${tx.description} ${tx.customerAddress ? `(${tx.customerAddress})` : ''}</span>
          </div>
        </div>
        <div class="history-item-right">
          <span class="history-item-value ${isBorrow ? 'text-danger' : 'text-success'}">
            ${isBorrow ? '+' : '-'} ${formatIDR(tx.amount)}
          </span>
        </div>
      `;
      DOM.recapHistoryList.appendChild(div);
    });
  }
}

function openDailyRecapModal() {
  const todayStr = new Date().toISOString().slice(0, 10);
  renderDailyRecap(todayStr);
  if (DOM.dailyRecapModal) DOM.dailyRecapModal.classList.add('active');
}

function closeDailyRecapModal() {
  if (DOM.dailyRecapModal) DOM.dailyRecapModal.classList.remove('active');
}

// ==========================================================================
// WORKFLOW HANDLERS & OPERATIONS
// ==========================================================================

// Add or Edit Customer
function openCustomerModal(id = null) {
  if (id) {
    // Edit mode
    const customer = customers.find(c => c.id === id);
    if (!customer) return;
    
    DOM.customerEditId.value = customer.id;
    DOM.customerNameInput.value = customer.name;
    DOM.customerPhoneInput.value = customer.phone;
    DOM.customerAddressInput.value = customer.address || '';
    DOM.customerModalTitle.textContent = 'Edit Data Nasabah';
    DOM.btnSubmitCustomerModal.textContent = 'Simpan Perubahan';
    
    // Hide initial debt section in edit mode
    if (DOM.initialDebtContainer) {
      DOM.initialDebtContainer.style.display = 'none';
    }
  } else {
    // Add mode
    DOM.customerEditId.value = '';
    DOM.customerNameInput.value = '';
    DOM.customerPhoneInput.value = '';
    DOM.customerAddressInput.value = '';
    DOM.customerModalTitle.textContent = 'Tambah Nasabah Baru';
    DOM.btnSubmitCustomerModal.textContent = 'Tambah Nasabah';
    
    // Show initial debt section in add mode
    if (DOM.initialDebtContainer) {
      DOM.initialDebtContainer.style.display = 'block';
      if (DOM.customerInitialDebt) DOM.customerInitialDebt.value = '';
      if (DOM.customerInitialDesc) DOM.customerInitialDesc.value = 'Saldo Utang Awal (Buku Lama)';
    }
  }
  
  DOM.customerModal.classList.add('active');
  renderQuickChips();
  DOM.customerNameInput.focus();
}

function closeCustomerModal() {
  DOM.customerModal.classList.remove('active');
}

if (DOM.formCustomer) {
  DOM.formCustomer.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const editId = DOM.customerEditId.value;
    const name = DOM.customerNameInput.value.trim();
    const phoneInputVal = DOM.customerPhoneInput.value.trim();
    const phone = phoneInputVal ? phoneInputVal.replace(/\D/g, '') : ''; // get digit only
    const address = DOM.customerAddressInput.value.trim();
    
    if (phone && phone.length < 8) {
      showToast('Nomor WhatsApp terlalu pendek!', 'danger');
      return;
    }
    
    if (editId) {
      // Edit Customer
      const idx = customers.findIndex(c => c.id === editId);
      if (idx !== -1) {
        customers[idx].name = name;
        customers[idx].phone = phone;
        customers[idx].address = address;
        showToast(`Data nasabah ${name} berhasil diperbarui.`);
      }
    } else {
      // Add Customer
      const newCustomer = {
        id: generateId(),
        name,
        phone,
        address,
        createdAt: new Date().toISOString(),
        transactions: []
      };
      
      // Check initial debt
      if (DOM.customerInitialDebt) {
        const initialDebtAmount = parseCurrencyString(DOM.customerInitialDebt.value);
        if (initialDebtAmount > 0) {
          const desc = DOM.customerInitialDesc.value.trim() || 'Saldo Utang Awal (Buku Lama)';
          const customDate = (DOM.customerInitialDate && DOM.customerInitialDate.value) ? DOM.customerInitialDate.value : new Date().toISOString().slice(0, 10);
          newCustomer.transactions.push({
            id: generateId(),
            type: 'tambah',
            amount: initialDebtAmount,
            description: desc,
            date: customDate
          });
        }
      }
      
      customers.unshift(newCustomer);
      selectedCustomerId = newCustomer.id; // Auto select new customer
      showToast(`Nasabah ${name} berhasil ditambahkan!`);
    }
    
    saveState();
    closeCustomerModal();
    refreshUI();
  });
}

// Delete Customer
let customerIdToDelete = null;

function openDeleteModal(id) {
  const customer = customers.find(c => c.id === id);
  if (!customer) return;
  
  customerIdToDelete = id;
  DOM.deleteTargetName.textContent = customer.name;
  DOM.deleteConfirmModal.classList.add('active');
}

function closeDeleteModal() {
  DOM.deleteConfirmModal.classList.remove('active');
  customerIdToDelete = null;
}

if (DOM.btnConfirmDelete) {
  DOM.btnConfirmDelete.addEventListener('click', () => {
    if (!customerIdToDelete) return;
    
    const idx = customers.findIndex(c => c.id === customerIdToDelete);
    if (idx !== -1) {
      const deletedName = customers[idx].name;
      customers.splice(idx, 1);
      
      // Clear selection if deleted customer was active
      if (selectedCustomerId === customerIdToDelete) {
        selectedCustomerId = null;
      }
      
      saveState();
      showToast(`Nasabah ${deletedName} telah dihapus.`, 'danger');
      closeDeleteModal();
      refreshUI();
    }
  });
}

// Delete Single Transaction
function deleteTransaction(customerId, txId) {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return;
  
  const txIdx = customer.transactions.findIndex(t => t.id === txId);
  if (txIdx !== -1) {
    const tx = customer.transactions[txIdx];
    customer.transactions.splice(txIdx, 1);
    
    saveState();
    showToast(`Catatan "${tx.description}" berhasil dihapus.`);
    refreshUI();
  }
}

// Add Transaction Form Handler
if (DOM.formAddTransaction) {
  DOM.formAddTransaction.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedCustomerId) return;
    
    const customer = customers.find(c => c.id === selectedCustomerId);
    if (!customer) return;
    
    const type = document.querySelector('input[name="tx-type"]:checked').value;
    const rawAmount = DOM.txAmount.value;
    const amount = parseCurrencyString(rawAmount);
    const description = DOM.txDesc.value.trim();
    const date = DOM.txDate.value;
    
    if (amount <= 0) {
      showToast('Nomor nominal harus lebih besar dari 0!', 'danger');
      return;
    }
    
    const newTx = {
      id: generateId(),
      type,
      amount,
      description,
      date: date || new Date().toISOString()
    };
    
    customer.transactions.push(newTx);
    saveState();
    showToast(`Transaksi berhasil dicatat.`);
    
    // Reset form but retain date default
    DOM.txAmount.value = '';
    DOM.txDesc.value = '';
    setTransactionDateDefault();
    
    refreshUI();
  });
}

// ==========================================================================
// WHATSAPP INTEGRATION - BILLING TEMPLATE BUILDER
// ==========================================================================
if (DOM.btnWATagih) {
  DOM.btnWATagih.addEventListener('click', () => {
    if (!selectedCustomerId) return;
    
    const customer = customers.find(c => c.id === selectedCustomerId);
    if (!customer) return;
    
    const { balance } = getCustomerBalance(customer);
    if (balance <= 0) {
      showToast('Nasabah ini tidak memiliki sisa utang.', 'warning');
      return;
    }
    
    // Build message
    const waPhone = sanitizePhoneNumber(customer.phone);
    
    // Format transactions list for WA message
    let txLogsString = '';
    // Get last 3 active transactions to keep message clear and neat
    const sortedTx = [...customer.transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
      
    sortedTx.forEach(t => {
      const txSign = t.type === 'tambah' ? '(Utang Baru)' : '(Cicilan)';
      const dateFormatted = new Date(t.date).toLocaleDateString('id-ID', {day:'numeric', month:'short'});
      txLogsString += `• ${dateFormatted} - *${formatIDR(t.amount)}* ${txSign} _"${t.description}"_\n`;
    });
  });
}
  
// Edit Transaction Modal Operations
function openEditTxModal(customerId, txId) {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return;
  
  const tx = customer.transactions.find(t => t.id === txId);
  if (!tx) return;
  
  DOM.editTxId.value = tx.id;
  DOM.editTxCustomerId.value = customerId;
  DOM.editTxAmount.value = new Intl.NumberFormat('id-ID').format(tx.amount);
  DOM.editTxDate.value = tx.date.slice(0, 10);
  DOM.editTxDesc.value = tx.description;
  
  if (tx.type === 'tambah') {
    DOM.editTxTypeBorrow.checked = true;
  } else {
    DOM.editTxTypePay.checked = true;
  }
  
  DOM.editTxModal.classList.add('active');
}

function closeEditTxModal() {
  DOM.editTxModal.classList.remove('active');
}

if (DOM.formEditTx) {
  DOM.formEditTx.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customerId = DOM.editTxCustomerId.value;
    const txId = DOM.editTxId.value;
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const txIdx = customer.transactions.findIndex(t => t.id === txId);
    if (txIdx === -1) return;
    
    const newType = document.querySelector('input[name="edit-tx-type"]:checked').value;
    const newAmount = parseCurrencyString(DOM.editTxAmount.value);
    const newDate = DOM.editTxDate.value;
    const newDesc = DOM.editTxDesc.value.trim();
    
    if (newAmount <= 0) {
      showToast('Nominal transaksi harus lebih besar dari 0!', 'danger');
      return;
    }
    
    customer.transactions[txIdx].type = newType;
    customer.transactions[txIdx].amount = newAmount;
    customer.transactions[txIdx].date = newDate;
    customer.transactions[txIdx].description = newDesc;
    
    saveState();
    closeEditTxModal();
    refreshUI();
    showToast('Catatan transaksi berhasil diperbarui!');
  });
}

// ==========================================================================
// THEME CONTROLLER (LIGHT / DARK SCRIPT)
// ==========================================================================
function toggleTheme() {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    currentTheme = 'light';
    DOM.themeText.textContent = 'Mode Gelap';
    showToast('Tampilan diganti ke Mode Terang.');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    currentTheme = 'dark';
    DOM.themeText.textContent = 'Mode Terang';
    showToast('Tampilan diganti ke Mode Gelap.');
  }
  localStorage.setItem('bukuutang_mama_theme', currentTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('bukuutang_mama_theme');
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    currentTheme = 'dark';
    DOM.themeText.textContent = 'Mode Terang';
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    currentTheme = 'light';
    DOM.themeText.textContent = 'Mode Gelap';
  }
}

// ==========================================================================
// BACKUP & RESTORE UTILITIES (JSON FILE EXPORTER)
// ==========================================================================

// JSON Export Handler
if (DOM.btnExportData) {
  DOM.btnExportData.addEventListener('click', () => {
    const dataStr = JSON.stringify({
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      data: customers
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    
    const today = new Date().toISOString().slice(0, 10);
    a.download = `BukuUtang_Mama_Backup_${today}.json`;
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File cadangan JSON berhasil diunduh!');
  });
}

// JSON Import Handlers
if (DOM.btnTriggerImport && DOM.importFileInput) {
  DOM.btnTriggerImport.addEventListener('click', () => {
    DOM.importFileInput.click();
  });

  DOM.importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (DOM.importStatusText) {
      DOM.importStatusText.textContent = `Memproses: ${file.name}`;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const parsed = JSON.parse(event.target.result);
        let importedList = null;
        
        if (Array.isArray(parsed)) {
          importedList = parsed;
        } else if (parsed && Array.isArray(parsed.data)) {
          importedList = parsed.data;
        } else if (parsed && Array.isArray(parsed.customers)) {
          importedList = parsed.customers;
        }
        
        if (importedList) {
          customers = importedList;
          saveState();
          selectedCustomerId = customers.length > 0 ? customers[0].id : null;
          
          refreshUI();
          if (DOM.importStatusText) {
            DOM.importStatusText.textContent = `Berhasil memulihkan ${customers.length} nasabah!`;
            DOM.importStatusText.style.color = 'var(--success)';
          }
          showToast(`Berhasil memulihkan ${customers.length} catatan nasabah!`);
        } else {
          throw new Error('Format file JSON tidak dikenali.');
        }
      } catch (err) {
        if (DOM.importStatusText) {
          DOM.importStatusText.textContent = 'Gagal! Format file cadangan rusak atau tidak sesuai.';
          DOM.importStatusText.style.color = 'var(--danger)';
        }
        showToast('Gagal memulihkan data. Periksa kembali file Anda!', 'danger');
      }
      
      DOM.importFileInput.value = '';
    };
    
    reader.readAsText(file);
  });
}

// ==========================================================================
// EXCEL / CSV TEMPLATE & IMPORT PARSER CONTROLLER
// ==========================================================================

let parsedCsvData = [];

// Download Sample CSV Template
function downloadCsvTemplate() {
  const headers = ['Nama Nasabah', 'Nomor WhatsApp', 'Alamat Lengkap', 'Saldo Utang Awal (Rupiah)', 'Keterangan'];
  const sampleRows = [
    ['Ibu Tejo', '08123456789', 'RT 01 RW 02 Desa Mawar', '150000', 'Bon beras & telur bulan lalu'],
    ['Pak Budi', '08567890123', 'Jl. Flamboyan No. 12', '50000', 'Utang rokok & kopi'],
    ['Mbak Rina', '08998877665', 'RT 03 RW 01', '0', 'Contoh lunas']
  ];
  
  let csvContent = '\uFEFF'; // Add UTF-8 BOM so Excel opens Indonesian accents/symbols nicely
  csvContent += headers.map(h => `"${h}"`).join(',') + '\n';
  
  sampleRows.forEach(row => {
    csvContent += row.map(val => `"${val.replace(/"/g, '""')}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Template_Utang_Mama.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Template Excel/CSV berhasil diunduh!');
}

// Export All Customer Data to Excel CSV
// JSON Backup & Restore Functions
function exportData() {
  if (customers.length === 0) {
    showToast('Tidak ada data nasabah untuk dicadangkan.', 'warning');
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customers, null, 2));
  const link = document.createElement('a');
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `Cadangan_BukuUtang_Mama_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Cadangan data JSON berhasil diunduh!');
}

function handleJsonImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        customers = imported;
        selectedCustomerId = customers.length > 0 ? customers[0].id : null;
        saveState();
        refreshUI();
        showToast('Data pembukuan berhasil dipulihkan!');
      } else {
        showToast('Format file JSON tidak sesuai!', 'danger');
      }
    } catch (err) {
      showToast('Gagal membaca file JSON!', 'danger');
    }
  };
  reader.readAsText(file);
}

function downloadCsvTemplate() {
  const csvContent = 'data:text/csv;charset=utf-8,Nama Nasabah,Nomor WhatsApp,Alamat Lengkap,Saldo Utang (Rp),Keterangan\n"Pak Budi","8123456789","BJM",50000,"Saldo Utang Lama"\n"Ibu Ani","8571234567","RT 02",100000,"Saldo Utang Bulan Lalu"\n';
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'Template_Utang_Lama_BukuUtang.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Template Excel (CSV) berhasil diunduh!');
}

function exportToCsv() {
  const headers = ['Nama Nasabah', 'Nomor WhatsApp', 'Alamat Lengkap', 'Sisa Utang Aktif (Rp)', 'Total Terpinjam (Rp)', 'Total Terbayar (Rp)', 'Status'];
  let csvContent = '\uFEFF';
  csvContent += headers.map(h => `"${h}"`).join(',') + '\n';
  
  customers.forEach(customer => {
    const { borrowed, paid, balance } = getCustomerBalance(customer);
    const status = balance > 0 ? 'Ada Utang' : 'Lunas';
    const row = [
      customer.name,
      customer.phone ? `+62${customer.phone}` : '-',
      customer.address || '-',
      balance,
      borrowed,
      paid,
      status
    ];
    csvContent += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const today = new Date().toISOString().slice(0, 10);
  a.download = `BukuUtang_Mama_Rekap_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Rekap Excel (CSV) berhasil diunduh!');
}

// Robust CSV Line Splitter
function parseCsvText(text) {
  const lines = text.split(/\r\n|\n/);
  const results = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Auto detect separator (, or ;)
    let separator = ',';
    if (line.includes(';') && (line.match(/;/g) || []).length > (line.match(/,/g) || []).length) {
      separator = ';';
    }
    
    const row = [];
    let insideQuote = false;
    let currentCell = '';
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === separator && !insideQuote) {
        row.push(currentCell.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    row.push(currentCell.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
    results.push(row);
  }
  
  return results;
}

// Detect garbled binary text
function isGarbledString(str) {
  if (!str) return true;
  const nonPrintableCount = (str.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD\u25A0-\u25FF]/g) || []).length;
  return (nonPrintableCount / str.length) > 0.15;
}

// Process Parsed Rows from Excel (.xlsx) or CSV (.csv)
function processParsedRows(rows) {
  if (!rows || rows.length === 0) {
    showToast('File Excel / CSV kosong atau tidak dapat dibaca!', 'danger');
    return;
  }

  let nameCol = 0, phoneCol = 1, addressCol = 2, debtCol = 3, descCol = 4;
  let startIndex = 0;
  
  // Auto detect header position
  const firstRow = rows[0].map(c => String(c || '').toLowerCase().trim());
  const hasHeader = firstRow.some(c => c.includes('nama') || c.includes('nasabah') || c.includes('saldo') || c.includes('utang') || c.includes('hp') || c.includes('wa'));
  
  if (hasHeader) {
    startIndex = 1;
    firstRow.forEach((colText, idx) => {
      if (colText.includes('nama') || colText.includes('nasabah')) nameCol = idx;
      else if (colText.includes('hp') || colText.includes('wa') || colText.includes('telepon')) phoneCol = idx;
      else if (colText.includes('alamat')) addressCol = idx;
      else if (colText.includes('saldo') || colText.includes('utang') || colText.includes('nominal')) debtCol = idx;
      else if (colText.includes('ket') || colText.includes('catatan')) descCol = idx;
    });
  }
  
  parsedCsvData = [];
  let totalDebtAccumulator = 0;
  
  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    
    const rawName = String(row[nameCol] || '').trim();
    if (!rawName || isGarbledString(rawName)) continue; // skip garbled/binary entries
    
    const rawPhone = String(row[phoneCol] || '').trim();
    const phone = rawPhone ? rawPhone.replace(/\D/g, '') : '';
    const address = String(row[addressCol] || '').trim();
    if (isGarbledString(address)) continue;
    
    // Parse debt number cleanly
    const rawDebt = String(row[debtCol] || '0').replace(/[^\d]/g, '');
    const debt = parseInt(rawDebt, 10) || 0;
    
    let desc = String(row[descCol] || '').trim();
    if (isGarbledString(desc) || !desc) {
      desc = 'Saldo Utang Awal (Buku Lama)';
    }
    
    totalDebtAccumulator += debt;
    parsedCsvData.push({
      id: generateId(),
      name: rawName,
      phone,
      address,
      debt,
      desc,
      checked: true
    });
  }
  
  if (parsedCsvData.length === 0) {
    showToast('Tidak ada data nasabah yang valid dari file! Pastikan file berupa format Excel (.xlsx) atau CSV yang benar.', 'danger');
    return;
  }
  
  openCsvPreviewModal(totalDebtAccumulator);
}

// Process CSV & Excel File Upload with Native .xlsx/.xls Support
function handleCsvFileUpload(file) {
  const fileName = file.name.toLowerCase();
  const isExcelBinary = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

  if (isExcelBinary && typeof XLSX !== 'undefined') {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        processParsedRows(jsonRows);
      } catch (err) {
        showToast('Gagal memproses file Excel (.xlsx)! Coba simpan sebagai file CSV.', 'danger');
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    // Read text CSV
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const rawText = e.target.result;
        // Check if rawText looks like a binary zip file (starts with PK)
        if (rawText.startsWith('PK\x03\x04') || rawText.includes('xl/workbook.xml')) {
          if (typeof XLSX !== 'undefined') {
            const abReader = new FileReader();
            abReader.onload = function(abEvent) {
              const data = new Uint8Array(abEvent.target.result);
              const workbook = XLSX.read(data, { type: 'array' });
              const firstSheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[firstSheetName];
              const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
              processParsedRows(jsonRows);
            };
            abReader.readAsArrayBuffer(file);
            return;
          }
        }
        const rows = parseCsvText(rawText);
        processParsedRows(rows);
      } catch (err) {
        showToast('Gagal memproses file CSV/Excel!', 'danger');
      }
    };
    reader.readAsText(file);
  }
}

// Open CSV Preview Modal
function openCsvPreviewModal(totalDebt) {
  DOM.csvTotalCount.textContent = `${parsedCsvData.length} Nasabah Terbaca`;
  DOM.csvTotalDebt.textContent = `Total Saldo: ${formatIDR(totalDebt)}`;
  DOM.csvSelectAll.checked = true;
  
  renderCsvPreviewTable();
  DOM.csvPreviewModal.classList.add('active');
}

function closeCsvPreviewModal() {
  DOM.csvPreviewModal.classList.remove('active');
  DOM.csvFileInput.value = '';
}

function renderCsvPreviewTable() {
  DOM.csvPreviewTbody.innerHTML = '';
  
  parsedCsvData.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="checkbox" class="csv-row-checkbox" data-index="${index}" ${item.checked ? 'checked' : ''}>
      </td>
      <td><strong>${item.name}</strong></td>
      <td>${item.phone ? '+62 ' + item.phone : '-'}</td>
      <td>${item.address || '-'}</td>
      <td class="text-danger font-semibold">${formatIDR(item.debt)}</td>
      <td class="text-muted">${item.desc}</td>
    `;
    
    tr.querySelector('.csv-row-checkbox').addEventListener('change', (e) => {
      parsedCsvData[index].checked = e.target.checked;
      recalculateCsvTotals();
    });
    
    DOM.csvPreviewTbody.appendChild(tr);
  });
}

function recalculateCsvTotals() {
  const selected = parsedCsvData.filter(d => d.checked);
  const totalDebt = selected.reduce((sum, d) => sum + d.debt, 0);
  
  DOM.csvTotalCount.textContent = `${selected.length} dari ${parsedCsvData.length} Terpilih`;
  DOM.csvTotalDebt.textContent = `Total Saldo: ${formatIDR(totalDebt)}`;
}

// Perform Batch Import
function executeCsvImport() {
  const selectedItems = parsedCsvData.filter(d => d.checked);
  if (selectedItems.length === 0) {
    showToast('Pilih setidaknya satu nasabah untuk diimpor!', 'warning');
    return;
  }
  
  let importedCount = 0;
  selectedItems.forEach(item => {
    const newCustomer = {
      id: item.id || generateId(),
      name: item.name,
      phone: item.phone,
      address: item.address,
      createdAt: new Date().toISOString(),
      transactions: []
    };
    
    if (item.debt > 0) {
      newCustomer.transactions.push({
        id: generateId(),
        type: 'tambah',
        amount: item.debt,
        description: item.desc,
        date: new Date().toISOString()
      });
    }
    
    customers.unshift(newCustomer);
    importedCount++;
  });
  
  saveState();
  if (customers.length > 0) {
    selectedCustomerId = customers[0].id;
  }
  
  closeCsvPreviewModal();
  refreshUI();
  showToast(`Berhasil mengimpor ${importedCount} nasabah baru beserta saldo awal!`);
}

// ==========================================================================
// VIEWS & ROUTING SYSTEM
// ==========================================================================
function showView(viewName) {
  if (viewName === 'dashboard') {
    if (DOM.navDashboard) DOM.navDashboard.classList.add('active');
    if (DOM.navBackup) DOM.navBackup.classList.remove('active');
    
    if (DOM.statsView) DOM.statsView.classList.remove('d-none');
    if (DOM.workspaceGrid) DOM.workspaceGrid.classList.remove('d-none');
    if (DOM.backupView) DOM.backupView.classList.add('d-none');
    
    if (DOM.welcomeText) DOM.welcomeText.textContent = "";
    if (DOM.btnAddCustomerTop) DOM.btnAddCustomerTop.style.display = 'inline-flex';
  } else if (viewName === 'backup') {
    if (DOM.navDashboard) DOM.navDashboard.classList.remove('active');
    if (DOM.navBackup) DOM.navBackup.classList.add('active');
    
    if (DOM.statsView) DOM.statsView.classList.add('d-none');
    if (DOM.workspaceGrid) DOM.workspaceGrid.classList.add('d-none');
    if (DOM.backupView) DOM.backupView.classList.remove('d-none');
    
    if (DOM.welcomeText) DOM.welcomeText.textContent = "Pusat Cadangan Data 💾";
    if (DOM.btnAddCustomerTop) DOM.btnAddCustomerTop.style.display = 'none';
    
    if (DOM.importStatusText) {
      DOM.importStatusText.textContent = 'Format file harus berupa .json yang valid';
      DOM.importStatusText.style.color = 'var(--text-muted)';
    }
  }
}

// ==========================================================================
// EVENT INITIALIZATION & BOOTSTRAP
// ==========================================================================

function initEventListeners() {
  // Navigation Router
  if (DOM.navDashboard) {
    DOM.navDashboard.addEventListener('click', (e) => {
      e.preventDefault();
      showView('dashboard');
    });
  }
  if (DOM.navBackup) {
    DOM.navBackup.addEventListener('click', (e) => {
      e.preventDefault();
      showView('backup');
    });
  }
  
  // Theme Toggle listeners
  if (DOM.themeToggle) DOM.themeToggle.addEventListener('click', toggleTheme);
  if (DOM.themeToggleMobile) DOM.themeToggleMobile.addEventListener('click', toggleTheme);
  
  // JSON Backup / Restore listeners
  if (DOM.btnExportData) DOM.btnExportData.addEventListener('click', exportData);
  if (DOM.btnTriggerImport && DOM.importFileInput) {
    DOM.btnTriggerImport.addEventListener('click', () => DOM.importFileInput.click());
    DOM.importFileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) handleJsonImport(e.target.files[0]);
    });
  }
  
  // Search and Filter Listeners
  if (DOM.searchCustomer) DOM.searchCustomer.addEventListener('input', () => renderCustomerList());
  if (DOM.filterStatus) {
  DOM.filterStatus.addEventListener('change', renderCustomerList);
}
if (DOM.filterLocation) {
  DOM.filterLocation.addEventListener('change', renderCustomerList);
}  if (DOM.sortBy) DOM.sortBy.addEventListener('change', () => renderCustomerList());
  
  // CRUD Triggers
  if (DOM.btnAddCustomerTop) DOM.btnAddCustomerTop.addEventListener('click', () => openCustomerModal());
  if (DOM.btnAddCustomerEmpty) DOM.btnAddCustomerEmpty.addEventListener('click', () => openCustomerModal());
  if (DOM.btnEditCustomer) DOM.btnEditCustomer.addEventListener('click', () => openCustomerModal(selectedCustomerId));
  if (DOM.btnDeleteCustomer) DOM.btnDeleteCustomer.addEventListener('click', () => openDeleteModal(selectedCustomerId));
  
  // Modal closers
  if (DOM.btnCloseCustomerModal) DOM.btnCloseCustomerModal.addEventListener('click', closeCustomerModal);
  if (DOM.btnCancelCustomerModal) DOM.btnCancelCustomerModal.addEventListener('click', closeCustomerModal);
  if (DOM.customerModalOverlay) DOM.customerModalOverlay.addEventListener('click', closeCustomerModal);
  
  if (DOM.btnCancelDelete) DOM.btnCancelDelete.addEventListener('click', closeDeleteModal);
  if (DOM.deleteModalOverlay) DOM.deleteModalOverlay.addEventListener('click', closeDeleteModal);
  
  // Edit Tx Modal closers
  if (DOM.btnCloseEditTxModal) DOM.btnCloseEditTxModal.addEventListener('click', closeEditTxModal);
  if (DOM.btnCancelEditTxModal) DOM.btnCancelEditTxModal.addEventListener('click', closeEditTxModal);
  if (DOM.editTxModalOverlay) DOM.editTxModalOverlay.addEventListener('click', closeEditTxModal);
  
  // CSV Import/Export listeners
  if (DOM.btnExportExcel) {
    DOM.btnExportExcel.addEventListener('click', exportToCsv);
  }
  if (DOM.btnDownloadTemplateCsv) {
    DOM.btnDownloadTemplateCsv.addEventListener('click', downloadCsvTemplate);
  }
  if (DOM.btnTriggerCsvImport && DOM.csvFileInput) {
    DOM.btnTriggerCsvImport.addEventListener('click', () => DOM.csvFileInput.click());
    DOM.csvFileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        handleCsvFileUpload(e.target.files[0]);
      }
    });
  }
  if (DOM.btnCloseCsvModal) DOM.btnCloseCsvModal.addEventListener('click', closeCsvPreviewModal);
  if (DOM.btnCancelCsvModal) DOM.btnCancelCsvModal.addEventListener('click', closeCsvPreviewModal);
  if (DOM.csvPreviewOverlay) DOM.csvPreviewOverlay.addEventListener('click', closeCsvPreviewModal);
  if (DOM.btnConfirmCsvImport) DOM.btnConfirmCsvImport.addEventListener('click', executeCsvImport);
  if (DOM.csvSelectAll) {
    DOM.csvSelectAll.addEventListener('change', (e) => {
      const checked = e.target.checked;
      parsedCsvData.forEach(d => d.checked = checked);
      renderCsvPreviewTable();
      recalculateCsvTotals();
    });
  }

  // Cloud Sync Event Listeners
  if (DOM.btnCloudStatus) DOM.btnCloudStatus.addEventListener('click', openSyncModal);
  if (DOM.btnOpenSyncModal) DOM.btnOpenSyncModal.addEventListener('click', openSyncModal);
  if (DOM.btnCloseSyncModal) DOM.btnCloseSyncModal.addEventListener('click', closeSyncModal);
  if (DOM.btnCancelSyncModal) DOM.btnCancelSyncModal.addEventListener('click', closeSyncModal);
  if (DOM.syncModalOverlay) DOM.syncModalOverlay.addEventListener('click', closeSyncModal);
  if (DOM.btnSaveSyncCode) DOM.btnSaveSyncCode.addEventListener('click', saveSyncCode);
  if (DOM.btnGenerateSyncCode) DOM.btnGenerateSyncCode.addEventListener('click', generateRandomSyncCode);
  
  // Daily Recap Triggers
  if (DOM.btnOpenDailyRecap) DOM.btnOpenDailyRecap.addEventListener('click', openDailyRecapModal);
  if (DOM.btnCloseDailyRecap) DOM.btnCloseDailyRecap.addEventListener('click', closeDailyRecapModal);
  if (DOM.btnCancelDailyRecap) DOM.btnCancelDailyRecap.addEventListener('click', closeDailyRecapModal);
  if (DOM.dailyRecapModalOverlay) DOM.dailyRecapModalOverlay.addEventListener('click', closeDailyRecapModal);
  if (DOM.recapDatePicker) {
    DOM.recapDatePicker.addEventListener('change', (e) => renderDailyRecap(e.target.value));
  }
  
  if (DOM.btnDisconnectSync) DOM.btnDisconnectSync.addEventListener('click', disconnectSync);
  if (DOM.btnShareSyncWa) DOM.btnShareSyncWa.addEventListener('click', shareSyncCodeWA);

  // Reset All Data Event Listener
  if (DOM.btnResetAllData) {
    DOM.btnResetAllData.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin MENGHAPUS SEMUA DATA NASABAH? Tindakan ini biasanya dilakukan jika sebelumnya salah mengimpor file yang rusak.')) {
        customers = [];
        selectedCustomerId = null;
        saveState();
        refreshUI();
        showToast('Semua data nasabah berhasil dikosongkan!', 'warning');
      }
    });
  }

  // Number Input Formatter (Thousands format)
  if (DOM.txAmount) setupCurrencyInputFormatter(DOM.txAmount);
  if (DOM.customerInitialDebt) setupCurrencyInputFormatter(DOM.customerInitialDebt);
  if (DOM.editTxAmount) setupCurrencyInputFormatter(DOM.editTxAmount);
  
  // Mobile Back Button trigger
  if (DOM.btnBackToList) {
    DOM.btnBackToList.addEventListener('click', () => {
      selectedCustomerId = null;
      refreshUI();
    });
  }
}

// Application Startup
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadState();
  updateCurrentHeaderDate();
  setTransactionDateDefault();
  initEventListeners();
  initCloudSync();
  
  // Select first customer by default if present
  if (customers.length > 0) {
    selectedCustomerId = customers[0].id;
  }
  
  refreshUI();
});


