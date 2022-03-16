let dataBase = [];

const passwordInput = document.querySelector('#password');
const usernameInput = document.querySelector('#username');
const submitBtn = document.querySelector('.submit-info');
const asGustBtn = document.querySelector('.as-gust-btn');


const submitDatas = () => {
    
    if (passwordInput.value != '' && usernameInput.value != '') {
        dataBase.push({ userName: usernameInput.value, password: passwordInput.value, todo:[]});

        checkRegisteration();
        sendUsers();
    } else {
        alert('Please Fill the Blankes');
    }
}

const checkRegisteration = () => {
    dataBase.forEach((user, index) => {
        const { password, userName, id } = user;
        const dataBaseLength = dataBase.length - 1;
        if (index != dataBaseLength) {
            if (passwordInput.value == password) {
                dataBase.pop();
                alert('Please choose another password');
            }
        } else {
            transportaitionUser();
            sendUsers();
            window.location.href = "http://localhost:9090/";
        }
    });
}

const getUsers = async () => {
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

const sendUsers = async () => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBase)
    }

    console.log(option.body);

    await fetch('http://localhost:9090/getusers', option);
}

const transportaitionUser = async () => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([ passwordInput.value, usernameInput.value, 'realuser' ])
    }
    console.log(option.body);
    await fetch('http://localhost:9090/transportationuser', option);
}

asGustBtn.addEventListener('click', async () => {
    debugger
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([null, 'gust', 'gustuser'])
    }
    console.log(option.body);
    fetch('http://localhost:9090/transportationuser', option);
    
    window.location.href = "http://localhost:9090/";

});

submitBtn.addEventListener('click', submitDatas);
getUsers();