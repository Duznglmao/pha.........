// ==================== KIỂM TRA QUYỀN TRUY CẬP ====================
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
}

// ==================== BIẾN TRẠNG THÁI ====================
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let sortOrder = "desc";
let searchQuery = "";

// ==================== DỮ LIỆU ====================
let tests = JSON.parse(localStorage.getItem("tests")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];
const dashboardError = document.getElementById("dashboardError");

// ==================== LỌC VÀ SẮP XẾP ====================
function getFilteredAndSorted() {
    let filtered = tests.slice();

    // Tìm kiếm
    if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filtered = filtered.filter(test => test.testName.toLowerCase().includes(q));
    }

    // Sắp xếp theo lượt chơi
    filtered.sort((a, b) => {
        return sortOrder === "asc" ? a.playAmount - b.playAmount : b.playAmount - a.playAmount;
    });

    return filtered;
}
 
// ==================== HIỂN THỊ BÀI TEST ====================
function renderCards() {
    const container = document.querySelector(".card-container");
    const quizzes = getFilteredAndSorted();
    const images = ["/assets/images/istockphoto-2218624194-2048x2048.jpg", "/assets/images/istockphoto-2159302807-2048x2048.jpg", "/assets/images/istockphoto-1777656272-2048x2048.jpg", "/assets/images/istockphoto-1616906708-612x612.jpg"];

    const totalPages = Math.max(1, Math.ceil(quizzes.length / ITEMS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = quizzes.slice(start, start + ITEMS_PER_PAGE);

    container.innerHTML = pageItems.map((test, index) => {
        const category = categories.find(c => c.id === test.categoryId);
        const imageUrl = images[index % images.length];
        return `
        <div class="card" data-quiz-id="${test.id}">
            <img src="${imageUrl}" alt="${test.testName}">
            <div class="card-content">
                <p class="category">${category?.categoryEmoji || '📄'} ${category?.categoryName || 'Chưa phân loại'}</p>
                <p class="title">${test.testName}</p>
                <p class="stats">${test.questions.length} câu hỏi - ${test.playAmount} lượt chơi - ${test.playTime} phút</p>
                <button class="play-btn">Chơi</button>
            </div>
        </div>
        `;
    }).join("");

    if (pageItems.length === 0) {
        container.innerHTML = `<p style = "margin: 0 auto; padding: 40px; color: #666;">Chưa có bài test nào</p>`;
    }

    // Bắt sự kiện nhấn chơi
    container.querySelectorAll(".play-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = parseInt(e.target.closest(".card").getAttribute("data-quiz-id"));
            localStorage.setItem("currentQuizId", id);
            window.location.href = "/pages/take-quiz.html";
        });
    });

    renderPagination(quizzes.length);
}

// ==================== PHÂN TRANG ====================
function renderPagination(totalItems) {
    const pagination = document.querySelector(".pagination");
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    pagination.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => { currentPage--; renderCards(); });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.classList.toggle("active", i === currentPage);
        pageBtn.addEventListener("click", () => { currentPage = i; renderCards(); });
        pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => { currentPage++; renderCards(); });
    pagination.appendChild(nextBtn);
}

// ==================== SẮP XẾP ====================
function bindSortButtons() {
    const [ascBtn, descBtn] = document.querySelectorAll(".sortByPlay button");

    function refreshActive() {
        ascBtn.classList.toggle("active", sortOrder === "asc");
        descBtn.classList.toggle("active", sortOrder === "desc");
    }

    ascBtn.addEventListener("click", () => {
        sortOrder = "asc";
        currentPage = 1;
        refreshActive();
        renderCards();
    });

    descBtn.addEventListener("click", () => {
        sortOrder = "desc";
        currentPage = 1;
        refreshActive();
        renderCards();
    });

    refreshActive();
}

// ==================== TÌM KIẾM ====================
function bindSearchBar() {
    document.querySelector("header .search-bar input").addEventListener("input", e => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderCards();
    });
}

// ==================== NÚT CHƠI NGẪU NHIÊN ====================
function bindRandomPlay() {
    const playButton = document.querySelector(".banner button");
    playButton.addEventListener("click", () => {
        dashboardError.textContent = "";
        dashboardError.style.display = "none";

        if (tests.length === 0) {
            dashboardError.textContent = "Chưa có bài test nào";
            dashboardError.style.display = "block";
            return;
        }
        const randomId = tests[Math.floor(Math.random() * tests.length)].id;
        localStorage.setItem("currentQuizId", randomId);
        window.location.href = "/pages/take-quiz.html";
    });
}

// ==================== KHỞI TẠO ====================
function initDashboard() {
    bindSortButtons();
    bindSearchBar();
    bindRandomPlay();
    renderCards();
}

initDashboard();