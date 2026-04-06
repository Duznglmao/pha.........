const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
}

function changePage() {
    localStorage.removeItem("currentEditingTestId");
    window.location.href = "/pages/quiz-builder.html";
}
 
let tests = JSON.parse(localStorage.getItem("tests"));
if (!tests) {
    tests = [
        {
            id: 1,
            testName: "Khoa học máy tính cơ bản",
            categoryId: 2,
            playTime: 10,
            playAmount: 47,
            questions: [
                {
                    content: "Những phần nào của máy tính mà ta có thể chạm vào?",
                    answers: [
                        { answer: "Dữ liệu" },
                        { answer: "Hệ điều hành" },
                        { answer: "Phần cứng", isCorrected: true },
                        { answer: "Phần mềm" },
                        { answer: "Bàn phím", isCorrected: true },
                        { answer: "Màn hình", isCorrected: true }
                    ]
                },
                {
                    content: "RAM dùng để làm gì?",
                    answers: [
                        { answer: "Lưu trữ dữ liệu vĩnh viễn" },
                        { answer: "Lưu trữ dữ liệu tạm thời", isCorrected: true },
                        { answer: "Xử lý đồ họa" },
                        { answer: "Cấp nguồn điện" }
                    ]
                },
                {
                    content: "Đơn vị đo tốc độ xử lý của CPU là?",
                    answers: [
                        { answer: "GB" },
                        { answer: "Hz / GHz", isCorrected: true },
                        { answer: "Watt" },
                        { answer: "Mbps" }
                    ]
                },
                {
                    content: "HTTP là giao thức dùng cho?",
                    answers: [
                        { answer: "Gửi email" },
                        { answer: "Duyệt web", isCorrected: true },
                        { answer: "Chuyển file" },
                        { answer: "Chat thời gian thực" }
                    ]
                },
                {
                    content: "Ngôn ngữ lập trình nào dùng để tạo cấu trúc trang web?",
                    answers: [
                        { answer: "Python" },
                        { answer: "Javascript" },
                        { answer: "HTML", isCorrected: true },
                        { answer: "C++" }
                    ]
                }
            ]
        },

        {
            id: 2,
            testName: "Lịch sử Việt Nam",
            categoryId: 1,
            playTime: 8,
            playAmount: 82,
            questions: [
                {
                    content: "Những năm nào Việt Nam giành độc lập khỏi Pháp?",
                    answers: [
                        { answer: "1945", isCorrected: true },
                        { answer: "1954", isCorrected: true },
                        { answer: "1975" },
                        { answer: "1940" }
                    ]
                },
                {
                    content: "Ai là người sáng lập ra nước Đại Việt?",
                    answers: [
                        { answer: "Lý Thái Tổ" },
                        { answer: "Đinh Bộ Lĩnh", isCorrected: true },
                        { answer: "Ngô Quyền" },
                        { answer: "Trần Hưng Đạo" }
                    ]
                },
                {
                    content: "Trận chiến nào kết thúc chiến tranh Việt Nam?",
                    answers: [
                        { answer: "Điện Biên Phủ" },
                        { answer: "Hồ Chí Minh 1975", isCorrected: true },
                        { answer: "Hà Nội 12 ngày đêm" },
                        { answer: "Bạch Đằng" }
                    ]
                },
                {
                    content: "Vạn L Trường Thành được xây dựng bởi nước nào?",
                    answers: [
                        { answer: "Ấn Độ" },
                        { answer: "Trung Quốc", isCorrected: true },
                        { answer: "La Mã" },
                        { answer: "Ba Tư" }
                    ]
                },
                {
                    content: "Thế chiến thứ 2 kết thúc vào năm nào?",
                    answers: [
                        { answer: "1918" },
                        { answer: "1939" },
                        { answer: "1945", isCorrected: true },
                        { answer: "1950" }
                    ]
                }
            ]
        },

        {
            id: 3,
            testName: "Địa lý thế giới",
            categoryId: 5,
            playTime: 12,
            playAmount: 61,
            questions: [
                {
                    content: "Dòng sông dài nhất thế giới là?",
                    answers: [
                        { answer: "Amazon" },
                        { answer: "Nile", isCorrected: true },
                        { answer: "Mekong" },
                        { answer: "Dương Tử" }
                    ]
                },
                {
                    content: "Những thành phố nào được gọi là thành phố không bao giờ ngủ?",
                    answers: [
                        { answer: "London" },
                        { answer: "Tokyo", isCorrected: true },
                        { answer: "New York", isCorrected: true },
                        { answer: "Paris" },
                        { answer: "Las Vegas", isCorrected: true }
                    ]
                },
                {
                    content: "Nước nào có diện tích lớn nhất thế giới?",
                    answers: [
                        { answer: "Mỹ" },
                        { answer: "Canada" },
                        { answer: "Nga", isCorrected: true },
                        { answer: "Trung Quốc" }
                    ]
                },
                {
                    content: "Đỉnh núi cao nhất thế giới là?",
                    answers: [
                        { answer: "Everest", isCorrected: true },
                        { answer: "K2" },
                        { answer: "Kilimanjaro" },
                        { answer: "Fuji" }
                    ]
                },
                {
                    content: "Mũi đất phía nam nhất châu Á là?",
                    answers: [
                        { answer: "Mũi Cà Mau", isCorrected: true },
                        { answer: "Mũi Gò Gà" },
                        { answer: "Mũi Vũng Tàu" },
                        { answer: "Mũi Lũng Cú" }
                    ]
                }
            ]
        },

        {
            id: 4,
            testName: "Vui về phim ảnh",
            categoryId: 3,
            playTime: 7,
            playAmount: 95,
            questions: [
                {
                    content: "Ai diễn vai Iron Man trong vũ trụ Marvel?",
                    answers: [
                        { answer: "Chris Evans" },
                        { answer: "Robert Downey Jr.", isCorrected: true },
                        { answer: "Chris Hemsworth" },
                        { answer: "Tom Holland" }
                    ]
                },
                {
                    content: "Bộ phim giành Oscar nhiều nhất mọi thời đại là?",
                    answers: [
                        { answer: "Titanic" },
                        { answer: "Ben-Hur" },
                        { answer: "Chúa tể của những chiếc nhẫn: Quân vương trở lại" },
                        { answer: "Cả 3 bộ trên", isCorrected: true }
                    ]
                },
                {
                    content: "Nhân vật nào không thuộc tác phẩm 7 viên ngọc rồng?",
                    answers: [
                        { answer: "Songoku" },
                        { answer: "Naruto", isCorrected: true },
                        { answer: "Vegeta" },
                        { answer: "Piccolo" }
                    ]
                },
                {
                    content: "Avatar của James Cameron phát hành vào năm nào?",
                    answers: [
                        { answer: "2009", isCorrected: true },
                        { answer: "2005" },
                        { answer: "2012" },
                        { answer: "2022" }
                    ]
                },
                {
                    content: "Trò chơi có doanh thu cao nhất mọi thời đại là?",
                    answers: [
                        { answer: "Minecraft", isCorrected: true },
                        { answer: "GTA 5" },
                        { answer: "Fortnite" },
                        { answer: "League of Legends" }
                    ]
                }
            ]
        },

        {
            id: 5,
            testName: "Toán học cơ bản",
            categoryId: 6,
            playTime: 10,
            playAmount: 53,
            questions: [
                {
                    content: "12 x 8 = ?",
                    answers: [
                        { answer: "84" },
                        { answer: "96", isCorrected: true },
                        { answer: "108" },
                        { answer: "88" }
                    ]
                },
                {
                    content: "π (Pi) có giá trị gần đúng là bao nhiêu?",
                    answers: [
                        { answer: "3.1416", isCorrected: true },
                        { answer: "3.1214" },
                        { answer: "3.1614" },
                        { answer: "3.1428" }
                    ]
                },
                {
                    content: "Bình phương của 15 là?",
                    answers: [
                        { answer: "195" },
                        { answer: "215" },
                        { answer: "225", isCorrected: true },
                        { answer: "245" }
                    ]
                },
                {
                    content: "Tam giác có tổng 3 góc bằng bao nhiêu độ?",
                    answers: [
                        { answer: "90 độ" },
                        { answer: "180 độ", isCorrected: true },
                        { answer: "270 độ" },
                        { answer: "360 độ" }
                    ]
                },
                {
                    content: "100 chia cho một nửa bằng bao nhiêu?",
                    answers: [
                        { answer: "50" },
                        { answer: "200", isCorrected: true },
                        { answer: "25" },
                        { answer: "150" }
                    ]
                }
            ]
        },

        {
            id: 6,
            testName: "Kỹ năng sống",
            categoryId: 4,
            playTime: 8,
            playAmount: 38,
            questions: [
                {
                    content: "Khi bị bỏng nhẹ, việc đầu tiên nên làm là?",
                    answers: [
                        { answer: "Thoa kem đánh răng" },
                        { answer: "Ngâm dưới nước lạnh 10 phút", isCorrected: true },
                        { answer: "Xỏc nốt bỏng" },
                        { answer: "Băng kín vết thương" }
                    ]
                },
                {
                    content: "Mức đường huyết bình thường của người lớn là?",
                    answers: [
                        { answer: "3.9 - 6.1 mmol/l", isCorrected: true },
                        { answer: "2.5 - 4.5 mmol/l" },
                        { answer: "5.5 - 8.5 mmol/l" },
                        { answer: "7.0 - 10.0 mmol/l" }
                    ]
                },
                {
                    content: "Mỗi ngày người lớn cần ngủ bao nhiêu giờ là phù hợp?",
                    answers: [
                        { answer: "4 - 6 giờ" },
                        { answer: "7 - 9 giờ", isCorrected: true },
                        { answer: "9 - 11 giờ" },
                        { answer: "6 - 7 giờ" }
                    ]
                },
                {
                    content: "Số điện thoại cấp cứu tại Việt Nam là?",
                    answers: [
                        { answer: "113" },
                        { answer: "115", isCorrected: true },
                        { answer: "114" },
                        { answer: "111" }
                    ]
                },
                {
                    content: "Khi gặp người bị ngạt thở, bạn nên sử dụng phương pháp nào?",
                    answers: [
                        { answer: "CPR" },
                        { answer: "Heimlich", isCorrected: true },
                        { answer: "Đập lưng mạnh" },
                        { answer: "Uống nhiều nước" }
                    ]
                }
            ]
        },

        {
            id: 7,
            testName: "English Basics",
            categoryId: 7,
            playTime: 12,
            playAmount: 42,
            questions: [
                {
                    content: "What is the capital of England?",
                    answers: [
                        { answer: "Manchester" },
                        { answer: "London", isCorrected: true },
                        { answer: "Liverpool" },
                        { answer: "Birmingham" }
                    ]
                },
                {
                    content: "How many continents are there?",
                    answers: [
                        { answer: "5" },
                        { answer: "6" },
                        { answer: "7", isCorrected: true },
                        { answer: "8" }
                    ]
                },
                {
                    content: "Which ocean is the largest in the world?",
                    answers: [
                        { answer: "Atlantic Ocean" },
                        { answer: "Indian Ocean" },
                        { answer: "Pacific Ocean", isCorrected: true },
                        { answer: "Arctic Ocean" }
                    ]
                },
                {
                    content: "What is the opposite of cold?",
                    answers: [
                        { answer: "Cool" },
                        { answer: "Hot", isCorrected: true },
                        { answer: "Warm" },
                        { answer: "Freezing" }
                    ]
                },
                {
                    content: "Which animal is known as the King of the Jungle?",
                    answers: [
                        { answer: "Tiger" },
                        { answer: "Elephant" },
                        { answer: "Lion", isCorrected: true },
                        { answer: "Bear" }
                    ]
                }
            ]
        },

        {
            id: 8,
            testName: "Y tế và Sức khỏe",
            categoryId: 8,
            playTime: 15,
            playAmount: 29,
            questions: [
                {
                    content: "Bao nhiêu xương trong cơ thể người lớn?",
                    answers: [
                        { answer: "186" },
                        { answer: "206", isCorrected: true },
                        { answer: "226" },
                        { answer: "246" }
                    ]
                },
                {
                    content: "Tổ chức nào trong cơ thể chịu trách nhiệm vận chuyển oxy?",
                    answers: [
                        { answer: "Máu" },
                        { answer: "Tế bào hồng cầu", isCorrected: true },
                        { answer: "Bạch cầu" },
                        { answer: "Tiểu cầu" }
                    ]
                },
                {
                    content: "Vitamin D chính được sản xuất từ đâu?",
                    answers: [
                        { answer: "Thực phẩm" },
                        { answer: "Ánh sáng mặt trời", isCorrected: true },
                        { answer: "Nước" },
                        { answer: "Không khí" }
                    ]
                },
                {
                    content: "Trái tim bình thường có bao nhiêu buồng?",
                    answers: [
                        { answer: "2" },
                        { answer: "3" },
                        { answer: "4", isCorrected: true },
                        { answer: "5" }
                    ]
                },
                {
                    content: "Bệnh tim mạch chủ yếu được gây ra bởi?",
                    answers: [
                        { answer: "Chế độ ăn kém" },
                        { answer: "Lối sống không lành mạnh", isCorrected: true },
                        { answer: "Lạnh" },
                        { answer: "Tiếng ồn" }
                    ]
                }
            ]
        },

        {
            id: 9,
            testName: "Thế giới Thể thao",
            categoryId: 9,
            playTime: 10,
            playAmount: 56,
            questions: [
                {
                    content: "Bao nhiêu người chơi trong một đội bóng đá?",
                    answers: [
                        { answer: "9" },
                        { answer: "10" },
                        { answer: "11", isCorrected: true },
                        { answer: "12" }
                    ]
                },
                {
                    content: "Quốc gia nào đã chiến thắng World Cup năm 2022?",
                    answers: [
                        { answer: "Pháp" },
                        { answer: "Argentina", isCorrected: true },
                        { answer: "Brazil" },
                        { answer: "Đức" }
                    ]
                },
                {
                    content: "Wimbledon là giải đấu nào?",
                    answers: [
                        { answer: "Bóng rổ" },
                        { answer: "Quần vợt", isCorrected: true },
                        { answer: "Cầu lông" },
                        { answer: "Bóng chuyền" }
                    ]
                },
                {
                    content: "Thể thao nào sử dụng puck làm bóng?",
                    answers: [
                        { answer: "Bóng chuyền" },
                        { answer: "Khúc côn cầu", isCorrected: true },
                        { answer: "Bóng rổ" },
                        { answer: "Bóng chày" }
                    ]
                },
                {
                    content: "Ai là cầu thủ giành Quả bóng vàng 2023?",
                    answers: [
                        { answer: "Messi" },
                        { answer: "Ronaldo" },
                        { answer: "Mbappe" },
                        { answer: "Haaland", isCorrected: true }
                    ]
                }
            ]
        },

        {
            id: 10,
            testName: "Công nghệ Hiện đại",
            categoryId: 10,
            playTime: 13,
            playAmount: 35,
            questions: [
                {
                    content: "AI viết tắt của?",
                    answers: [
                        { answer: "Artificial Information" },
                        { answer: "Artificial Intelligence", isCorrected: true },
                        { answer: "Automatic Integration" },
                        { answer: "Advanced Interaction" }
                    ]
                },
                {
                    content: "Python được sử dụng chủ yếu cho?",
                    answers: [
                        { answer: "Thiết kế web" },
                        { answer: "Khoa học dữ liệu", isCorrected: true },
                        { answer: "Phát triển di động" },
                        { answer: "Thiết kế đồ họa" }
                    ]
                },
                {
                    content: "Cloud computing là gì?",
                    answers: [
                        { answer: "Lưu trữ dữ liệu trên máy local" },
                        { answer: "Lưu trữ dữ liệu trên internet", isCorrected: true },
                        { answer: "Tính toán ngoài trời" },
                        { answer: "Lưu trữ trong đám mây vật lý" }
                    ]
                },
                {
                    content: "Khi nào World Wide Web (WWW) được phát minh?",
                    answers: [
                        { answer: "1980" },
                        { answer: "1989", isCorrected: true },
                        { answer: "1995" },
                        { answer: "2000" }
                    ]
                },
                {
                    content: "Blockchain chủ yếu được biết đến qua?",
                    answers: [
                        { answer: "Email" },
                        { answer: "Internet" },
                        { answer: "Cryptocurrency", isCorrected: true },
                        { answer: "Media xã hội" }
                    ]
                }
            ]
        }
    ];
    localStorage.setItem("tests", JSON.stringify(tests));
}

let currentPage = 1;
const limit = 5;
let sortBy = "";
let searchKeyword = "";
let deleteId = null;

const tableBody = document.getElementById("testTableBody");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const deleteModal = document.getElementById("quizDeleteModal");
const deleteBtn = document.getElementById("deleteQuizBtn");

function getProcessedTests() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];

    let result = tests.slice().map(test => {
        const category = categories.find(c => c.id === test.categoryId);
        return {
            ...test,
            categoryName: category?.categoryName || "Chưa phân loại",
            categoryEmoji: category?.categoryEmoji || "📄"
        }
    });

    if (searchKeyword) {
        result = result.filter(test => test.testName.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    if (sortBy === "name-asc") result.sort((a, b) => a.testName.localeCompare(b.testName));
    else if (sortBy === "name-desc") result.sort((a, b) => b.testName.localeCompare(a.testName));
    else if (sortBy === "time-asc") result.sort((a, b) => a.playTime - b.playTime);
    else if (sortBy === "time-desc") result.sort((a, b) => b.playTime - a.playTime);

    return result;
}

function renderTable() {
    const processed = getProcessedTests();
    const start = (currentPage - 1) * limit;
    const pageData = processed.slice(start, start + limit);

    tableBody.innerHTML = pageData.map(test => `
        <tr>
            <td>${test.id}</td>
            <td>${test.testName}</td>
            <td>${test.categoryEmoji} ${test.categoryName}</td>
            <td>${test.questions.length}</td>
            <td>${test.playTime} min</td>
            <td class="action-cell">
                <button class="btn-edit" onclick="openEditTest(${test.id})">Sửa</button>
                <button class="btn-delete" onclick="openDeleteModal(${test.id})">Xoá</button>
            </td>
        </tr>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const processed = getProcessedTests();
    const totalPages = Math.max(1, Math.ceil(processed.length / limit));

    let html = `<button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }

    html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt;</button>`;

    document.querySelector(".pagination").innerHTML = html;
}

function goToPage(page) {
    const totalPages = Math.max(1, Math.ceil(getProcessedTests().length / limit));
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
}

function openDeleteModal(testId) {
    deleteId = testId;
    deleteModal.classList.add("active");
}

function closeDeleteModal() {
    deleteId = null;
    deleteModal.classList.remove("active");
}

function confirmDelete() {
    tests = tests.filter(test => test.id !== deleteId);
    localStorage.setItem("tests", JSON.stringify(tests));
    closeDeleteModal();
    renderTable();
}

function openEditTest(testId) {
    localStorage.setItem("currentEditingTestId", testId);
    window.location.href = "/pages/quiz-builder.html";
}

sortSelect.addEventListener("change", e => {
    sortBy = e.target.value;
    currentPage = 1;
    renderTable();
});

searchInput.addEventListener("input", e => {
    searchKeyword = e.target.value.trim();
    currentPage = 1;
    renderTable();
});

deleteBtn.addEventListener("click", confirmDelete);
deleteModal.querySelector(".close-btn").addEventListener("click", closeDeleteModal);
deleteModal.querySelector(".btn-cancel").addEventListener("click", closeDeleteModal);

window.addEventListener("click", e => {
    if (e.target === deleteModal) closeDeleteModal();
});

renderTable();