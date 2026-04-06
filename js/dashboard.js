
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
}

const limit = 8;
let currentPage = 1;
let sortOrder = "asc";
let searchQuery = "";

let tests = JSON.parse(localStorage.getItem("tests")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];
const dashboardError = document.getElementById("dashboardError");

function getFilteredAndSorted() {
    let filtered = tests.slice();

    if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filtered = filtered.filter(test => test.testName.toLowerCase().includes(q));
    }

    filtered.sort((a, b) => {
        return sortOrder === "asc" ? a.playAmount - b.playAmount : b.playAmount - a.playAmount;
    });

    return filtered;
}

function renderCards() {
    const container = document.querySelector(".card-container");
    const quizzes = getFilteredAndSorted();
    const images = ["/assets/images/istockphoto-2218624194-2048x2048.jpg", "/assets/images/istockphoto-2159302807-2048x2048.jpg", "/assets/images/istockphoto-1777656272-2048x2048.jpg", "/assets/images/istockphoto-1616906708-612x612.jpg"];

    const totalPages = Math.max(1, Math.ceil(quizzes.length / limit));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * limit;
    const pageItems = quizzes.slice(start, start + limit);

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

    container.querySelectorAll(".play-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = parseInt(e.target.closest(".card").getAttribute("data-quiz-id"));
            localStorage.setItem("currentQuizId", id);
            window.location.href = "/pages/take-quiz.html";
        });
    });

    renderPagination();
}

function renderPagination() {
    const quizzes = getFilteredAndSorted();
    const totalPages = Math.max(1, Math.ceil(quizzes.length / limit));
    let html = `<button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }

    html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt;</button>`;
    document.querySelector('.pagination').innerHTML = html;
}

function goToPage(page) {
    const quizzes = getFilteredAndSorted();
    const totalPages = Math.max(1, Math.ceil(quizzes.length / limit));
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderCards();
}

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

function bindSearchBar() {
    document.querySelector("header .search-bar input").addEventListener("input", e => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderCards();
    });
}

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

function initDashboard() {
    bindSortButtons();
    bindSearchBar();
    bindRandomPlay();
    renderCards();
}

initDashboard();