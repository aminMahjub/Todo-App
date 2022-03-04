const passwordInput = document.querySelector('#password');
const usernameInput = document.querySelector('#username');
const loginBtn = document.querySelector('.login-btn');
let dataBase;
const getData = async () => {
    const url = 'http://localhost:9090/sendUsers';
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    dataBase = data;
    console.log(dataBase);
}

loginBtn.addEventListener('click', () => {
    let checkFalse = true;
    debugger
    if (passwordInput.value != '' && usernameInput.value != '') {
        dataBase.forEach(user => {
            const { password, userName, id } = user;
            
            if (usernameInput.value == userName && passwordInput.value == password) {
                alert('Ok you Login in');
                checkFalse = false;
                transportaitionUser()
                window.location.href = "http://localhost:9090/";
            }
        })
        if (checkFalse) {
            alert('This username and password do not exist');
        }
    } else {
        alert('Please Fill The Blankes');
    }
});

const transportaitionUser = async () => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([ passwordInput.value, usernameInput.value, 'signin page' ])
    }
    console.log(option.body);
    await fetch('http://localhost:9090/transportationuser', option);
}

getData();