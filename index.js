function UserLogout(){
    window.sessionStorage.removeItem('status');
    window.location.href = "login.html";
}