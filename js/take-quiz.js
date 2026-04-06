const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
}

const quizId = parseInt(localStorage.getItem("currentQuizId"));
const tests = JSON.parse(localStorage.getItem("tests")) || [];
const quiz = tests.find(t => t.id === quizId);

if (!quiz) window.location.href = "/pages/dashboard.html";

document.querySelector('.quiz-title').textContent = quiz.testName;

let currentQuestion = 0;
let userAnswers = new Array(quiz.questions.length).fill(null).map(() => []);
let timeRemaining = quiz.playTime * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timerDisplay");
const timerTotal = document.getElementById("timerTotal");
const questionLabel = document.getElementById("questionLabel");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const questionGrid = document.getElementById("questionGrid");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnFinish = document.getElementById("btnFinish");
const resultModal = document.getElementById("resultModal");
const btnRetry = document.getElementById("btnRetry");

function startTimer() {
    const updateTimerDisplay = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `Còn lại: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            finishQuiz();
        }
    }, 1000);
}

function renderQuestionGrid() {
    questionGrid.innerHTML = quiz.questions.map((_, i) => `
        <button class="q-btn ${i === currentQuestion ? 'current' : ''} ${userAnswers[i] && userAnswers[i].length > 0 ? 'answered' : ''}"
                onclick="goToQuestion(${i})">${i + 1}</button>
    `).join('');
}

function renderCurrentQuestion() {
    const q = quiz.questions[currentQuestion];
    questionLabel.textContent = `Câu hỏi ${currentQuestion + 1} trên ${quiz.questions.length}:`;
    questionText.textContent = q.content;

    answerList.innerHTML = q.answers.map((a, i) => `
        <label class="answer-item">
            <input type="checkbox" name="answer" value="${i}" ${userAnswers[currentQuestion].includes(i) ? 'checked' : ''}>
            ${a.answer}
        </label>
    `).join('');

    answerList.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', e => {
            const index = parseInt(e.target.value);
            if (e.target.checked) {
                if (!userAnswers[currentQuestion].includes(index)) {
                    userAnswers[currentQuestion].push(index);
                }
            } else {
                userAnswers[currentQuestion] = userAnswers[currentQuestion].filter(i => i !== index);
            }
            renderQuestionGrid();
        });
    });

    btnPrev.disabled = currentQuestion === 0;
    btnNext.disabled = currentQuestion === quiz.questions.length - 1;

    renderQuestionGrid();
}

function goToQuestion(index) {
    currentQuestion = index;
    renderCurrentQuestion();
}

function finishQuiz() {
    clearInterval(timerInterval);

    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
        const correctAnswers = q.answers.map((a, idx) => a.isCorrected ? idx : -1).filter(idx => idx !== -1);
        const userSelected = userAnswers[i] || [];
        const isCorrect = correctAnswers.length === userSelected.length && 
                          correctAnswers.every(idx => userSelected.includes(idx)) &&
                          userSelected.every(idx => correctAnswers.includes(idx));
        if (isCorrect) correctCount++;
    });

    const quizIndex = tests.findIndex(t => t.id === quizId);
    tests[quizIndex].playAmount++;
    localStorage.setItem("tests", JSON.stringify(tests));

    const percent = Math.round((correctCount / quiz.questions.length) * 100);
    resultModal.querySelector('.score-text strong').textContent = `${percent}%`;
    resultModal.querySelector('.result-row:nth-child(1) p').textContent = quiz.questions.length;
    resultModal.querySelector('.result-row:nth-child(2) p').textContent = correctCount;
    resultModal.querySelector('.result-row:nth-child(3) p').textContent = quiz.questions.length - correctCount;

    resultModal.classList.add("active");
}

btnPrev.addEventListener("click", () => goToQuestion(currentQuestion - 1));
btnNext.addEventListener("click", () => goToQuestion(currentQuestion + 1));
btnFinish.addEventListener("click", finishQuiz);
btnRetry.addEventListener("click", () => window.location.reload());

resultModal.querySelector('.close-btn').addEventListener("click", () => resultModal.classList.remove("active"));

timerTotal.textContent = `Thời gian: ${quiz.playTime} phút`;
startTimer();
renderCurrentQuestion();