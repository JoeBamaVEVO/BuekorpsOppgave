const  RegisterBrukerForm = document.getElementById("RegisterBruker")

RegisterBrukerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const RegisterBrukerFormData = new FormData(RegisterBrukerForm);
    const RegisterBrukerData = JSON.stringify(Object.fromEntries(RegisterBrukerFormData));
    console.log(RegisterBrukerData);
    RegisterBruker(RegisterBrukerData);
});


async function RegisterBruker(BrukerData){
    let response = await fetch('/Auth/Nybruker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: BrukerData
    });
    let result = await response.json();
    console.log(result);
    // location.reload();
}