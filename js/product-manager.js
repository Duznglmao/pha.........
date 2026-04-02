const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/pages/login.html";
}

function changePage() {
    window.location.href = "/pages/quiz-builder.html";
}

