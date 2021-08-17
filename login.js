const form = document.querySelector("#form");
var inputs = form.elements;

var storage = window.sessionStorage;
var resp;

form.onsubmit = function(event) {
    login(inputs["email"].value, inputs["password"].value)
        .then(response => {
            try {
                //resp = status.split('UID', 2);
                storage.setItem('uid', response.id);
                storage.setItem('status', response.auth_token);
                swal("Udało się zalogować!","Kliknij 'OK' aby przejść do panelu", "success").then(() => {
                    window.location.href = "index.html";
                });;
            } catch (error) {
                console.log(error)
                swal("Coś poszło nie tak!","Prawdopodobnie złe dane do logowania :) "+error, "error").then(() => {
                    window.location.href = "login.html";
                  });;
            }

        })
    event.preventDefault();
}


async function login(email, password) {
    try {
        const config = {
            headers: {
                "content-type": "application/json"
            }
        };
        let res = await axios.post("https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/login", { "email": email, "password": password }, config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}