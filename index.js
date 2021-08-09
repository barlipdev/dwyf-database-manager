function UserLogout(){
    window.sessionStorage.removeItem('status');
    sleep(3000);
    window.location.href = "login.html";
}