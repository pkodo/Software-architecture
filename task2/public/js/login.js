
const login = async (email, password) => {
    console.log(email, password);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/login',
            data: {
                email: email,
                password: password
            }
        });
        console.log(res);
    } catch (err) {
        console.log(err.response.data);
    }
};

//Works when you are visiting the website with 127.0.0.1:3000/login

window.onload=function(){ 
    const loginForm = document.querySelector('.login');
    if(loginForm)
    {
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('pw').value;
            login(email, password);
        });
    } 
};
