// Document Management System JavaScript

// Mock Data
const userData = {
    fullName: "John Admin",
    email: "john.admin@example.com",
    username: "johnadmin",
    role: "Administrator",
    department: "IT Administration"
};

// Dummy document requests with requestor names
const documentRequests = [
    {
        id: 1,
        requestorName: "Maria Santos",
        documentType: "Birth Certificate",
        purpose: "Passport Application",
        timestamp: "2024-03-15T10:30:00Z",
        status: "pending",
        notes: "",
        fee: "200.00"
    },
    {
        id: 2,
        requestorName: "Juan Dela Cruz",
        documentType: "Certificate of Indigency",
        purpose: "Medical Assistance",
        timestamp: "2024-03-14T14:20:00Z",
        status: "approved",
        notes: "Approved for processing",
        fee: "50.00"
    },
    {
        id: 3,
        requestorName: "Ana Rodriguez",
        documentType: "Business Permit",
        purpose: "New Business Registration",
        timestamp: "2024-03-13T09:15:00Z",
        status: "rejected",
        notes: "Incomplete requirements",
        fee: "500.00"
    },
    {
        id: 4,
        requestorName: "Carlos Martinez",
        documentType: "Marriage Certificate",
        purpose: "Legal Documentation",
        timestamp: "2024-03-12T16:45:00Z",
        status: "approved",
        notes: "Ready for pickup",
        fee: "150.00"
    },
    {
        id: 5,
        requestorName: "Elena Gonzalez",
        documentType: "Death Certificate",
        purpose: "Insurance Claim",
        timestamp: "2024-03-11T11:30:00Z",
        status: "pending",
        notes: "",
        fee: "100.00"
    },
    {
        id: 6,
        requestorName: "Roberto Silva",
        documentType: "Residence Certificate",
        purpose: "Employment Requirement",
        timestamp: "2024-03-10T13:00:00Z",
        status: "processing",
        notes: "Under review",
        fee: "75.00"
    },
    {
        id: 7,
        requestorName: "Isabella Cruz",
        documentType: "Clearance Certificate",
        purpose: "Travel Documentation",
        timestamp: "2024-03-09T15:20:00Z",
        status: "completed",
        notes: "Completed and released",
        fee: "100.00"
    },
    {
        id: 8,
        requestorName: "Miguel Torres",
        documentType: "Tax Certificate",
        purpose: "Property Transaction",
        timestamp: "2024-03-08T08:45:00Z",
        status: "approved",
        notes: "Payment verified",
        fee: "300.00"
    },
    {
        id: 9,
        requestorName: "Sofia Reyes",
        documentType: "Health Certificate",
        purpose: "Employment Application",
        timestamp: "2024-03-07T12:10:00Z",
        status: "pending",
        notes: "",
        fee: "120.00"
    },
    {
        id: 10,
        requestorName: "Diego Morales",
        documentType: "Educational Certificate",
        purpose: "College Enrollment",
        timestamp: "2024-03-06T10:00:00Z",
        status: "approved",
        notes: "Documents verified",
        fee: "200.00"
    },
    {
        id: 11,
        requestorName: "Carmen Velasco",
        documentType: "Building Permit",
        purpose: "Home Construction",
        timestamp: "2024-03-05T14:30:00Z",
        status: "pending",
        notes: "",
        fee: "1000.00"
    },
    {
        id: 12,
        requestorName: "Antonio Lopez",
        documentType: "Barangay Clearance",
        purpose: "Police Clearance Requirement",
        timestamp: "2024-03-04T09:20:00Z",
        status: "rejected",
        notes: "Invalid requirements submitted",
        fee: "50.00"
    },
    {
        id: 13,
        requestorName: "Lucia Fernandez",
        documentType: "Senior Citizen ID",
        purpose: "Discount Privileges",
        timestamp: "2024-03-03T11:45:00Z",
        status: "completed",
        notes: "ID issued successfully",
        fee: "0.00"
    },
    {
        id: 14,
        requestorName: "Rafael Castro",
        documentType: "Burial Permit",
        purpose: "Funeral Arrangements",
        timestamp: "2024-03-02T16:15:00Z",
        status: "approved",
        notes: "Emergency processing approved",
        fee: "200.00"
    },
    {
        id: 15,
        requestorName: "Beatriz Mendoza",
        documentType: "Marriage License",
        purpose: "Wedding Preparation",
        timestamp: "2024-03-01T13:30:00Z",
        status: "processing",
        notes: "Documents under verification",
        fee: "500.00"
    }
];

// Global state
let currentPage = 'dashboard';
let filteredRequests = [...documentRequests];
let currentFilter = 'all';
let currentSort = { field: 'date', order: 'desc' };
let currentEditingRequest = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupEventListeners();
    updateStats();
    renderRecentRequests();
    renderRequestsTable();
    renderTransactionHistory();
    loadUserProfile();
    showPage('dashboard');
    
    // Initialize filtered requests
    filteredRequests = [...documentRequests];
    
    // Apply initial sorting
    applySorting();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('mobileBackdrop');

    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
    backdrop?.addEventListener('click', closeMobileMenu);

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            updateNavigation(this);
            closeMobileMenu();
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', handleSearch);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleFilter(this.getAttribute('data-status'));
            updateFilterButtons(this);
        });
    });

    // Sort controls
    const sortSelect = document.getElementById('sortBy');
    const sortOrderBtn = document.getElementById('sortOrderBtn');
    
    sortSelect?.addEventListener('change', handleSort);
    sortOrderBtn?.addEventListener('click', toggleSortOrder);

    // Modal controls
    const modal = document.getElementById('statusModal');
    const modalClose = modal?.querySelector('.modal-close');
    const statusForm = document.getElementById('statusUpdateForm');
    
    modalClose?.addEventListener('click', closeStatusModal);
    statusForm?.addEventListener('submit', handleStatusUpdate);
    
    // Close modal when clicking outside
    modal?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeStatusModal();
        }
    });

    // Profile form
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    
    profileForm?.addEventListener('submit', handleProfileUpdate);
    passwordForm?.addEventListener('submit', handlePasswordChange);

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn?.addEventListener('click', handleLogout);
}

// Navigation Functions
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update page title
        updatePageTitle(pageName);
        
        // Refresh page-specific content
        if (pageName === 'manage-requests') {
            renderRequestsTable();
        } else if (pageName === 'transaction-history') {
            renderTransactionHistory();
        }
    }
}

function updateNavigation(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updatePageTitle(pageName) {
    const titles = {
        'dashboard': 'Document Management System - Dashboard',
        'manage-requests': 'Document Management System - Manage Requests',
        'transaction-history': 'Document Management System - Transaction History',
        'user-profile': 'Document Management System - User Profile'
    };
    document.title = titles[pageName] || 'Document Management System';
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('mobileBackdrop');
    const menuIcon = document.getElementById('menuIcon');
    
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show');
    
    // Toggle icon
    if (sidebar.classList.contains('open')) {
        menuIcon.className = 'fas fa-times';
    } else {
        menuIcon.className = 'fas fa-bars';
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('mobileBackdrop');
    const menuIcon = document.getElementById('menuIcon');
    
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
    menuIcon.className = 'fas fa-bars';
}

// Statistics Functions
function updateStats() {
    const totalRequests = documentRequests.length;
    const pendingRequests = documentRequests.filter(r => r.status === 'pending').length;
    const approvedRequests = documentRequests.filter(r => r.status === 'approved').length;
    const completedRequests = documentRequests.filter(r => r.status === 'completed').length;
    
    // Update dashboard stats
    updateElementText('stat-total-requests', totalRequests);
    updateElementText('stat-pending-requests', pendingRequests);
    updateElementText('stat-approved-requests', approvedRequests);
    updateElementText('stat-completed-requests', completedRequests);
    
    // Update manage requests stats
    updateElementText('stat-pending', pendingRequests);
    updateElementText('stat-approved', approvedRequests);
    updateElementText('stat-total', totalRequests);
}

function updateElementText(id, text) {
    const element = document.querySelector(`[data-testid="${id}"]`);
    if (element) {
        element.textContent = text;
    }
}

// Recent Requests Functions
function renderRecentRequests() {
    const container = document.getElementById('recentRequests');
    if (!container) return;
    
    const recentRequests = documentRequests
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
    
    if (recentRequests.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-file-alt" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <p data-testid="text-no-requests">No document requests yet.</p>
                <p style="font-size: 0.875rem;">Document requests will appear here once submitted.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentRequests.map(request => `
        <div class="recent-request-item" data-testid="card-request-${request.id}">
            <div class="recent-request-info">
                <h4 data-testid="text-document-type-${request.id}">${request.documentType}</h4>
                <p data-testid="text-purpose-${request.id}">Purpose: ${request.purpose}</p>
                <p class="timestamp" data-testid="text-request-date-${request.id}">
                    Requested: ${formatDate(request.timestamp)}
                </p>
            </div>
            <div class="status-badge status-${request.status}" data-testid="status-${request.status}-${request.id}">
                ${request.status.replace('_', ' ').toUpperCase()}
            </div>
        </div>
    `).join('');
}

// Search and Filter Functions
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    applyFiltersAndSearch(searchTerm, currentFilter);
}

function handleFilter(status) {
    currentFilter = status;
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    applyFiltersAndSearch(searchTerm, status);
}

function updateFilterButtons(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function applyFiltersAndSearch(searchTerm, status) {
    filteredRequests = documentRequests.filter(request => {
        const matchesSearch = !searchTerm || 
            request.requestorName.toLowerCase().includes(searchTerm) ||
            request.documentType.toLowerCase().includes(searchTerm);
        
        const matchesFilter = status === 'all' || request.status === status;
        
        return matchesSearch && matchesFilter;
    });
    
    renderRequestsTable();
}

// Requests Table Functions
function renderRequestsTable() {
    const tbody = document.getElementById('requestsTableBody');
    if (!tbody) return;
    
    if (filteredRequests.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8">
                    <div style="color: var(--text-secondary);">
                        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p data-testid="text-no-requests">No requests found matching your criteria.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredRequests.map(request => `
        <tr data-testid="row-request-${request.id}">
            <td data-testid="table-request-id-${request.id}">
                <div style="display: flex; align-items: center;">
                    ${getStatusIcon(request.status)}
                    <span style="margin-left: 0.5rem;">#${request.id}</span>
                </div>
            </td>
            <td data-testid="table-requestor-name-${request.id}">${request.requestorName}</td>
            <td data-testid="table-document-type-${request.id}">${request.documentType}</td>
            <td data-testid="table-timestamp-${request.id}">${formatDateTime(request.timestamp)}</td>
            <td>
                <span class="status-badge status-${request.status}" data-testid="table-status-${request.status}-${request.id}">
                    ${request.status.replace('_', ' ').toUpperCase()}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    ${getActionButtons(request)}
                </div>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to action buttons
    addActionButtonListeners();
}

function getStatusIcon(status) {
    const icons = {
        'pending': '<i class="fas fa-clock" style="color: var(--warning-color);"></i>',
        'processing': '<i class="fas fa-spinner" style="color: var(--primary-color);"></i>',
        'approved': '<i class="fas fa-check-circle" style="color: var(--success-color);"></i>',
        'rejected': '<i class="fas fa-times-circle" style="color: var(--danger-color);"></i>',
        'completed': '<i class="fas fa-check" style="color: var(--secondary-color);"></i>'
    };
    return icons[status] || '';
}

function getActionButtons(request) {
    if (request.status === 'pending' || request.status === 'processing') {
        return `
            <button class="btn btn-success btn-sm" onclick="approveRequest(${request.id})" data-testid="button-approve-${request.id}">
                <i class="fas fa-check"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="rejectRequest(${request.id})" data-testid="button-reject-${request.id}">
                <i class="fas fa-times"></i>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="openStatusModal(${request.id})" data-testid="button-edit-status-${request.id}">
                <i class="fas fa-edit"></i>
            </button>
        `;
    } else {
        return `
            <button class="btn btn-secondary btn-sm" onclick="openStatusModal(${request.id})" data-testid="button-edit-status-${request.id}">
                <i class="fas fa-edit"></i>
            </button>
            <span style="color: var(--text-secondary); font-size: 0.75rem;">View Only</span>
        `;
    }
}

function addActionButtonListeners() {
    // Event listeners are added via onclick attributes in the HTML
    // This function is kept for future enhancements if needed
}

// Request Actions
function approveRequest(requestId) {
    updateRequestStatus(requestId, 'approved', 'Request approved by administrator');
}

function rejectRequest(requestId) {
    updateRequestStatus(requestId, 'rejected', 'Request rejected by administrator');
}

function updateRequestStatus(requestId, newStatus, notes = '') {
    const request = documentRequests.find(r => r.id === requestId);
    if (!request) return;
    
    request.status = newStatus;
    request.notes = notes;
    
    // Update displays
    updateStats();
    renderRequestsTable();
    renderRecentRequests();
    renderTransactionHistory();
    
    // Show success toast
    showToast(`Request #${requestId} status updated to ${newStatus}`, 'success');
}

// Status Modal Functions
function openStatusModal(requestId) {
    const request = documentRequests.find(r => r.id === requestId);
    if (!request) return;
    
    currentEditingRequest = requestId;
    
    // Populate modal
    document.getElementById('statusSelect').value = request.status;
    document.getElementById('statusNotes').value = request.notes || '';
    
    // Show modal
    document.getElementById('statusModal').classList.add('active');
}

function closeStatusModal() {
    currentEditingRequest = null;
    document.getElementById('statusModal').classList.remove('active');
    
    // Clear form
    document.getElementById('statusUpdateForm').reset();
}

function handleStatusUpdate(e) {
    e.preventDefault();
    
    if (!currentEditingRequest) return;
    
    const newStatus = document.getElementById('statusSelect').value;
    const notes = document.getElementById('statusNotes').value;
    
    updateRequestStatus(currentEditingRequest, newStatus, notes);
    closeStatusModal();
}

// Sort Functions
function handleSort() {
    const sortField = document.getElementById('sortBy').value;
    currentSort.field = sortField;
    applySorting();
    renderTransactionHistory();
}

function toggleSortOrder() {
    currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    
    const btn = document.getElementById('sortOrderBtn');
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');
    
    if (currentSort.order === 'asc') {
        icon.className = 'fas fa-sort-amount-up';
        text.textContent = 'Ascending';
    } else {
        icon.className = 'fas fa-sort-amount-down';
        text.textContent = 'Descending';
    }
    
    applySorting();
    renderTransactionHistory();
}

function applySorting() {
    const { field, order } = currentSort;
    
    documentRequests.sort((a, b) => {
        let aValue, bValue;
        
        switch (field) {
            case 'name':
                aValue = a.requestorName.toLowerCase();
                bValue = b.requestorName.toLowerCase();
                break;
            case 'document-type':
                aValue = a.documentType.toLowerCase();
                bValue = b.documentType.toLowerCase();
                break;
            case 'date':
            default:
                aValue = new Date(a.timestamp);
                bValue = new Date(b.timestamp);
                break;
        }
        
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Update filtered requests as well
    applyFiltersAndSearch(
        document.getElementById('searchInput')?.value.toLowerCase() || '',
        currentFilter
    );
}

// Transaction History Functions
function renderTransactionHistory() {
    const container = document.getElementById('transactionList');
    if (!container) return;
    
    if (documentRequests.length === 0) {
        container.innerHTML = `
            <div class="content-card">
                <div class="card-content" style="text-center; padding: 3rem;">
                    <i class="fas fa-file-alt" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;" data-testid="text-no-requests">No requests found</h3>
                    <p style="color: var(--text-secondary);">You haven't submitted any document requests yet.</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = documentRequests.map(request => `
        <div class="transaction-item" data-testid="transaction-${request.id}">
            <div class="transaction-header">
                <div class="transaction-info">
                    <h3 data-testid="text-document-type-${request.id}">${request.documentType}</h3>
                    <div class="transaction-meta">
                        <span data-testid="text-requestor-${request.id}"><strong>Requestor:</strong> ${request.requestorName}</span>
                        <span data-testid="text-request-date-${request.id}"><strong>Requested:</strong> ${formatDate(request.timestamp)}</span>
                        <span data-testid="text-fee-${request.id}"><strong>Fee:</strong> ₱${request.fee}</span>
                    </div>
                </div>
                <div class="transaction-badges">
                    <span class="status-badge status-${request.status}" data-testid="status-${request.status}-${request.id}">
                        ${request.status.replace('_', ' ').toUpperCase()}
                    </span>
                </div>
            </div>
            <div class="transaction-details">
                <p data-testid="text-purpose-${request.id}"><strong>Purpose:</strong> ${request.purpose}</p>
                ${request.notes ? `<p data-testid="text-notes-${request.id}"><strong>Notes:</strong> ${request.notes}</p>` : ''}
                <p style="font-size: 0.875rem; color: var(--text-secondary);">
                    <strong>Last Updated:</strong> ${formatDateTime(request.timestamp)}
                </p>
            </div>
        </div>
    `).join('');
}

// User Profile Functions
function loadUserProfile() {
    document.getElementById('fullName').value = userData.fullName;
    document.getElementById('email').value = userData.email;
    document.getElementById('username').value = userData.username;
    document.getElementById('role').value = userData.role;
    document.getElementById('department').value = userData.department;
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    userData.fullName = document.getElementById('fullName').value;
    userData.email = document.getElementById('email').value;
    userData.username = document.getElementById('username').value;
    userData.department = document.getElementById('department').value;
    
    // Update user display
    document.querySelector('.user-name').textContent = userData.fullName;
    document.querySelector('[data-testid="text-username"]').textContent = userData.fullName;
    
    showToast('Profile updated successfully!', 'success');
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Please fill in all password fields', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Clear form
    document.getElementById('passwordForm').reset();
    showToast('Password changed successfully!', 'success');
}

// Utility Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon and class based on type
    toast.className = `toast ${type}`;
    
    switch (type) {
        case 'success':
            toastIcon.className = 'toast-icon fas fa-check-circle';
            break;
        case 'error':
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            break;
        case 'warning':
            toastIcon.className = 'toast-icon fas fa-exclamation-triangle';
            break;
        default:
            toastIcon.className = 'toast-icon fas fa-info-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        showToast('Logging out...', 'success');
        setTimeout(() => {
            alert('Logout functionality would redirect to login page in a real application');
        }, 1000);
    }
}

// Window resize handler for responsive design
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
});

// Initialize sorting on page load
document.addEventListener('DOMContentLoaded', function() {
    applySorting();
});