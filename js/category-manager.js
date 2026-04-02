// ==================== KIỂM TRA QUYỀN TRUY CẬP ====================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "/pages/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/pages/login.html";
}

function goMain (){
    window.location.href = "/pages/dashboard.html";
}
