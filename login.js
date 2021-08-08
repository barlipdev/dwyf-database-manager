const form = document.querySelector("#form");
var inputs = form.elements;

var storage = window.sessionStorage;
var resp;

form.onsubmit = function(event) {
    login(inputs["email"].value, inputs["password"].value)
        .then(status => {
            try {
                resp = status.split('UID', 2);
                storage.setItem('uid', resp[1]);
                storage.setItem('status', status);
                window.location.replace("https://dwyf-manager.herokuapp.com//index.html");

            } catch (error) {
                console.log(error);
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
        let res = await axios.post(endpoint + "/login", { "email": email, "password": password }, config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}