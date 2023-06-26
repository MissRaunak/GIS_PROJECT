let url = "db.json"
// let url ="https://missraunak.github.io/GIS_PROJECT/db.json"
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }

}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("you must allow the request for geolocation to fill")
            location.reload();
            break;
    }
}
function showPosition(position) {
    var val1 = document.querySelector('.myForm input[name = "latitude"]').value = position.coords.latitude;
    var val2 = document.querySelector('.myForm input[name = "longitude"]').value = position.coords.longitude;
    console.log(val1, val2)
    var date = new Date();
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var v1f = document.querySelector('.myForm input[name = "time"]').value = current_time;
    var v2f = document.querySelector('.myForm input[name = "date"]').value = current_date;
    console.log(v1f)
    console.log(v2f)
}
var formz = document.getElementById("submit");
formz.addEventListener("submit", async (event) => {
    event.preventDefault();
    document.getElementById("msg").innerHTML = "";
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let Address = document.getElementById('Address').value;
    let mobile = document.getElementById('mobile').value;
    let Password = document.getElementById('Password').value;
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;
    let time = document.getElementById('time').value;
    let date = document.getElementById('date').value;
    if (name == '' && email == '' && Address == '' && mobile == '' && Password == '') {
        document.getElementById("msg").innerHTML = "please enter All Info "

    } else {
        // user add data
        const formData = new FormData(event.target);
        const mydata = Object.fromEntries(formData.entries());
        console.log("raundsjd", mydata)
        // Make a GET request to check if the email already exists
        fetch(`${url}?email=${email}`)
            .then(response => response.json())
            .then(arr => {
                if (arr.length > 0) {
                    arr.forEach(data => {
                        fetch(`${url}/${data.id}`, {
                            method: 'PUT',
                            body: JSON.stringify(mydata),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())

                            .catch(error => console.error(error));

                    })
                } else {
                    // Make a POST request to add the new user
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(mydata),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())

                        .catch(error => console.error(error));
                    document.getElementById('msg').innerHTML = "data added";
                }

            })
            .catch(error => console.error(error));

    }
});



// toggle

function loginform() {
    var Cform = document.getElementById("Csubmit")
    var submit = document.getElementById("submit")
    var Cbtn = document.getElementById("Cbtn")
    var Ubtn = document.getElementById("Ubtn")
    if (Cform.style.display === "none" && submit.style.display === "block" && Cbtn.style.display === "block" && Ubtn.style.display === "none") {
        Cform.style.display = "block"
        submit.style.display = "none"
        Cbtn.style.display = "none"
        Ubtn.style.display = "block"
    } else {
        Cform.style.display = "none"
        submit.style.display = "block"
        Cbtn.style.display = "block"
        Ubtn.style.display = "none"
    }
}
function userform() {
    var Cform = document.getElementById("Csubmit")
    var submit = document.getElementById("submit")
    var Cbtn = document.getElementById("Cbtn")
    var Ubtn = document.getElementById("Ubtn")
    if (Cform.style.display === "block" && submit.style.display === "none" && Cbtn.style.display === "none" && Ubtn.style.display === "block") {
        Cform.style.display = "none"
        submit.style.display = "block"
        Cbtn.style.display = "block"
        Ubtn.style.display = "none"
    } else {
        Cform.style.display = "block"
        submit.style.display = "none"
        Cbtn.style.display = "none"
        Ubtn.style.display = "block"
    }
}


//login

var loginforms = document.getElementById("Csubmit");
loginforms.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("msgg").innerHTML = "";
    let email = document.getElementById('uemail').value;
    let Password = document.getElementById('uPassword').value;

    if (email == '' && Password == '') {
        document.getElementById("msgg").innerHTML = "please enter All Info "

    } else {
        // user add data
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        fetch(url)
            .then(response => response.json())
            .then(arr => {
                arr.forEach(data => {
                    if (data.email == email && data.Password == Password) {
                        document.getElementById("msgg").innerHTML = "You have login scuessfully !"
                        window.location.href = 'main.html'
                    } else {
                        document.getElementById("msgg").innerHTML = "Your email and password is incorrect !"
                    }
                });
            })
            .catch(error => console.error(error));

    }
});
