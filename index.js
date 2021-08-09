function UserLogout(){
    window.sessionStorage.setItem('status',null);
    sleep(3000);
    window.location.href = "login.html";
}