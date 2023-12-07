const LoginBrukerForm = document.getElementById("LoginBruker")    


LoginBrukerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const LoginBrukerFormData = new FormData(LoginBrukerForm);
    const LoginBrukerData = JSON.stringify(Object.fromEntries(LoginBrukerFormData));
    console.log(LoginBrukerData);
    LoginBruker(LoginBrukerData);
});


async function LoginBruker(BrukerData){
    let response = await fetch('/Auth/loginSend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: BrukerData
    });
    window.location.href = "/";
}

FirstUserCheck()    
async function FirstUserCheck(){
    let response = await fetch('/Auth/Setup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

}