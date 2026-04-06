const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
}

let tests = JSON.parse(localStorage.getItem("tests")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

const editingId = parseInt(localStorage.getItem("currentEditingTestId"));
let currentTest = null;
let questions = [];
let editingQuestionIndex = null;

const testName = document.getElementById("testName");
const testCategory = document.getElementById("testCategory");
const testTime = document.getElementById("testTime");
const btnAddQuestion = document.getElementById("btnAddQuestion");
const btnSaveTest = document.getElementById("btnSaveTest");
const questionTableBody = document.getElementById("questionTableBody");
const questionModal = document.getElementById("questionModal");
const questionDeleteModal = document.getElementById("questionDeleteModal");
const questionContent = document.getElementById("questionContent");
const answerListContainer = document.getElementById("answerListContainer");
const btnAddAnswer = document.getElementById("btnAddAnswer");
const btnSaveQuestion = document.getElementById("btnSaveQuestion");
const errorQuestion = document.getElementById("errorQuestion");
const errorAnswer = document.getElementById("errorAnswer");
const errorForm = document.getElementById("errorForm");
const deleteQuestionBtn = document.getElementById("deleteQuestionBtn");
let deletingQuestionIndex = null;

function initForm() {
    testCategory.innerHTML = `<option value="">Chọn danh mục</option>`
        + categories.map(c => `<option value="${c.id}">${c.categoryEmoji} ${c.categoryName}</option>`).join('');

    if (editingId && !isNaN(editingId)) {
        currentTest = tests.find(t => t.id === editingId);
        if (currentTest) {
            testName.value = currentTest.testName;
            testCategory.value = currentTest.categoryId;
            testTime.value = currentTest.playTime;
            questions = currentTest.questions;
        }
    }

    renderQuestionTable();
}

function renderQuestionTable() {
    questionTableBody.innerHTML = questions.map((q, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${q.content}</td>
            <td class="action-cell">
                <button class="btn-edit" onclick="openQuestionModal(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteQuestion(${index})">Xoá</button>
            </td>
        </tr>
    `).join('');
}

function openQuestionModal(index = null) {
    editingQuestionIndex = index;
    questionContent.value = "";
    errorQuestion.style.display = "none";
    errorAnswer.style.display = "none";

    const modalTitle = questionModal.querySelector(".modal-header h2");

    if (index !== null) {
        modalTitle.textContent = "Sửa câu hỏi";
        const q = questions[index];
        questionContent.value = q.content;
        renderAnswerInputs(q.answers);
    } else {
        modalTitle.textContent = "Thêm câu hỏi";
        renderAnswerInputs([
            { answer: "", isCorrected: false },
            { answer: "", isCorrected: false }
        ]);
    }

    questionModal.classList.add("active");
}

function closeQuestionModal() {
    editingQuestionIndex = null;
    questionModal.classList.remove("active");
}

function renderAnswerInputs(answers) {
    answerListContainer.innerHTML = answers.map((a, i) => `
        <div class="answer-item">
            <div class="checkbox-wrapper">
                <input type="checkbox" name="correctAnswer" value="${i}" ${a.isCorrected ? 'checked' : ''}>
            </div>
            <input type="text" class="answer-input" placeholder="Nhập câu trả lời" value="${a.answer}">
            <button class="delete-icon" onclick="removeAnswer(${i})">🗑️</button>
        </div>
    `).join('');
}

function addNewAnswer() {
    const currentAnswers = getCurrentAnswers();
    currentAnswers.push({ answer: "", isCorrected: false });
    renderAnswerInputs(currentAnswers);
}

function removeAnswer(index) {
    const currentAnswers = getCurrentAnswers();
    if (currentAnswers.length <= 2) {
        errorAnswer.textContent = "Phải có tối thiểu 2 câu trả lời";
        errorAnswer.style.display = "block";
        return;
    }
    currentAnswers.splice(index, 1);
    renderAnswerInputs(currentAnswers);
}

function getCurrentAnswers() {
    const items = answerListContainer.querySelectorAll('.answer-item');
    return Array.from(items).map((item, i) => {
        return {
            answer: item.querySelector('.answer-input').value,
            isCorrected: item.querySelector('input[type=checkbox]').checked
        }
    });
}

function validateQuestion() {
    let isValid = true;
    errorQuestion.style.display = "none";
    errorAnswer.style.display = "none";

    const content = questionContent.value.trim();
    const answers = getCurrentAnswers();

    // Validate câu hỏi
    if (!content) {
        errorQuestion.textContent = "Câu hỏi không được để trống";
        errorQuestion.style.display = "block";
        isValid = false;
    } else if (content.length < 3 || content.length > 200) {
        errorQuestion.textContent = "Câu hỏi phải từ 3 đến 200 ký tự";
        errorQuestion.style.display = "block";
        isValid = false;
    }

    const hasEmptyAnswer = answers.some(a => !a.answer.trim());
    const hasCorrectAnswer = answers.some(a => a.isCorrected);

    if (hasEmptyAnswer) {
        errorAnswer.textContent = "Không có câu trả lời nào được để trống";
        errorAnswer.style.display = "block";
        isValid = false;
    } else if (!hasCorrectAnswer) {
        errorAnswer.textContent = "Bạn phải chọn ít nhất 1 câu trả lời đúng";
        errorAnswer.style.display = "block";
        isValid = false;
    }

    return isValid;
}

function saveQuestion() {
    if (!validateQuestion()) return;

    const questionData = {
        content: questionContent.value.trim(),
        answers: getCurrentAnswers()
    };

    if (editingQuestionIndex !== null) {
        questions[editingQuestionIndex] = questionData;
    } else {
        questions.push(questionData);
    }

    closeQuestionModal();
    renderQuestionTable();
}

function deleteQuestion(index) {
    deletingQuestionIndex = index;
    questionDeleteModal.classList.add("active");
}

function confirmDeleteQuestion() {
    if (deletingQuestionIndex !== null) {
        questions.splice(deletingQuestionIndex, 1);
        renderQuestionTable();
        closeDeleteModal();
    }
}

function closeDeleteModal() {
    deletingQuestionIndex = null;
    questionDeleteModal.classList.remove("active");
}

function saveTest() {
    const nameValue = testName.value.trim();
    const categoryValue = parseInt(testCategory.value);
    const timeValue = parseInt(testTime.value);

    errorForm.textContent = "";
    errorForm.style.display = "none";

    // Validate
    if (!nameValue || nameValue.length < 3 || nameValue.length > 100) {
        errorForm.textContent = "Tên bài test phải từ 3 đến 100 ký tự";
        errorForm.style.display = "block";
        return;
    }
    if (!categoryValue) {
        errorForm.textContent = "Vui lòng chọn danh mục";
        errorForm.style.display = "block";
        return;
    }
    if (isNaN(timeValue) || timeValue < 1 || timeValue > 120) {
        errorForm.textContent = "Thời gian phải là số nguyên từ 1 đến 120 phút";
        errorForm.style.display = "block";
        return;
    }
    if (questions.length < 1) {
        errorForm.textContent = "Bài test phải có ít nhất 1 câu hỏi";
        errorForm.style.display = "block";
        return;
    }

    const testData = {
        testName: nameValue,
        categoryId: categoryValue,
        playTime: timeValue,
        playAmount: currentTest?.playAmount || 0,
        questions: questions
    }

    if (!currentTest) {
        const maxId = tests.length === 0 ? 1 : Math.max(...tests.map(t => t.id)) + 1;
        tests.push({ id: maxId, ...testData });
    } else {
        const index = tests.findIndex(t => t.id === editingId);
        tests[index] = { ...tests[index], ...testData };
    }

    localStorage.setItem("tests", JSON.stringify(tests));
    localStorage.removeItem("currentEditingTestId");
    window.location.href = "/pages/product-manager.html";
}

btnSaveTest.addEventListener("click", saveTest);
btnAddQuestion.addEventListener("click", () => openQuestionModal(null));
btnAddAnswer.addEventListener("click", addNewAnswer);
btnSaveQuestion.addEventListener("click", saveQuestion);

questionModal.querySelector(".close-btn").addEventListener("click", closeQuestionModal);
questionModal.querySelector(".btn-cancel").addEventListener("click", closeQuestionModal);

questionDeleteModal.querySelector(".close-btn").addEventListener("click", closeDeleteModal);
questionDeleteModal.querySelector(".btn-cancel").addEventListener("click", closeDeleteModal);
deleteQuestionBtn.addEventListener("click", confirmDeleteQuestion);

window.addEventListener("click", e => {
    if (e.target === questionModal) closeQuestionModal();
    if (e.target === questionDeleteModal) closeDeleteModal();
});

initForm();