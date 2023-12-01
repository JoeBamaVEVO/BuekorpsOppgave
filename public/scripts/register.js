const  RegisterBrukerForm = document.getElementById("RegisterBruker")

RegisterBrukerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const RegisterBrukerFormData = new FormData(RegisterBrukerForm);
    const RegisterBrukerData = JSON.stringify(Object.fromEntries(RegisterBrukerFormData));
    console.log(RegisterBrukerData);
    RegisterBruker(RegisterBrukerData);
});

