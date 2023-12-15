const btnNewMember = document.getElementById("btnNyMedlem")
const MedlemDialog = document.getElementById("MedlemDialog")
const MedlemForm = document.getElementById("MedlemForm")

// Lager variabler som henter ut Dialogen og Formen fra HTML
const OppdaterMedlemDialog = document.getElementById("OppdaterDialog")
const OppdaterMedlemForm = document.getElementById("OppdaterForm")


getUsers();



// Sjekker om brukeren er admin
async function AdminPrivCheck() {
let response = await fetch('/auth/AdminCheck',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
});
let result = await response.json();
console.log(result);
}

//Eventlistner som lytter etter om knappen for å legge til medlemmer blir trykket på
btnNewMember.addEventListener("click", () => {
    buttonListener();
});

//Funksjon som sjekker om brukeren er admin
async function buttonListener() {
    let res = await fetch('/auth/AdminCheck');
    let result = await res.json();
    if(result == true) {
        MedlemDialog.showModal();
    } else {
        alert("Du kan ikke legge til medlemmer")
    }
}

// Legger til en eventlistener på skjemaet som brukes til å legge til et medlem
MedlemForm.addEventListener("submit", (e) => {
    MedlemDialog.close() // Lukker dialogen
    e.preventDefault() // Forhindrer at skjemaet sender data til serveren
    const MedlemFormData = new FormData(MedlemForm) // Lager et FormData objekt av skjemaet
    const UserData = JSON.stringify(Object.fromEntries(MedlemFormData)); // Lager et JSON objekt av FormData
    AddUser(UserData) // Kaller på addUser funksjonen og sender med JSON objektet
})

// Funksjon som legger til et medlem i databasen
async function AddUser(UserData){
    let res = await fetch('/auth/AdminCheck');
    let result = await res.json();
    if(result == true) {
        let response = await fetch('/Medlem/medlemmer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: UserData
        });
        location.reload();
    } 
    else {
        alert("Du kan ikke legge til medlemmer")
    }}

// funksjon som henter ut et medlem fra databasen og skriver det ut i formen
// sakl brukes til å oppdatere et medlem
async function PopulateUserUpdateForm(id) {
    let res = await fetch('/auth/AdminCheck');
    let result = await res.json();
    if(result == true) {
        let MedlemData = await getUser(id);
        let form = OppdaterMedlemForm;

        MedlemID.innerText = MedlemData.MedlemsID;

        for(let key of Object.keys(MedlemData)) {
            // console.log(key);
            // console.log(form.elements[key]);
            console.log(MedlemData[key]);
            if (form.elements[key]) {
                form.elements[key].value = MedlemData[key];
            }
        }

        OppdaterMedlemDialog.showModal();
    }
    else {
        alert("Du kan ikke oppdatere medlemmer")
    }   
}

// Legger til en eventlistener på skjemaet som brukes til å oppdatere et medlem
//Denne blir aktivert når Formen blir submitted
OppdaterMedlemForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Forhindrer at skjemaet sender data til serveren

    let id = document.getElementById("MedlemID").innerText;
    OppdaterMedlemDialog.close(); // Lukker dialogen
    
    const OppdaterMedlemFormData = new FormData(OppdaterMedlemForm); // Lager et FormData objekt av skjemaet
    const OppdaterUserData = JSON.stringify(Object.fromEntries(OppdaterMedlemFormData)); // Lager et JSON objekt av FormData
    
    EditUser(id, OppdaterUserData); // Kaller på addUser funksjonen og sender med JSON objektet
});



//Funksjon som oppdaterer et medlem i databasen
async function EditUser(id, OppdaterUserData) {
    let response = await fetch('/Medlem/medlemmer/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: OppdaterUserData 
    });
    let result = await response.json();
    console.log(result);
    location.reload();
}

// Funksjon som legger til et medlem i tabellen
function ListUsers(medlem) {
    const table = document.querySelector("tbody")
    const row = table.insertRow(-1)
    const ID = row.insertCell(0)
    const FNavn = row.insertCell(1)
    const LNavn = row.insertCell(2)
    const Rang = row.insertCell(3)
    const Pelotong = row.insertCell(4)
    const btn = row.insertCell(5)

    let DelBtn = document.createElement("img")
    let EditBtn = document.createElement("img")
    let MerInfoBtn  = document.createElement("img")

    DelBtn.src = "img/icons/trash3-fill.svg"
    EditBtn.src = "img/icons/pencil-square.svg"
    MerInfoBtn.src = "img/icons/arrow-down.svg"

    DelBtn.addEventListener("click" , () => DeleteUser(medlem.MedlemsID))
    EditBtn.addEventListener("click" , () => PopulateUserUpdateForm(medlem.MedlemsID))
    MerInfoBtn.addEventListener("click" , () => /*MerInfo(medlem.MedlemsID)*/ console.log("Mer info"))

    ID.innerHTML = medlem.MedlemsID
    FNavn.innerHTML = medlem.Fornavn
    LNavn.innerHTML = medlem.Etternavn
    Rang.innerHTML = medlem.RangTittel
    Pelotong.innerHTML = medlem.PelotongTittel
      
    btn.appendChild(MerInfoBtn)
    btn.appendChild(EditBtn)
    btn.appendChild(DelBtn)    
}

async function DeleteUser(id) {
    let res = await fetch('/auth/AdminCheck');
    let isAdmin = await res.json();
    if(isAdmin == true) {
        let response = await fetch('/Medlem/medlemmer/' + id, {
            method: 'DELETE'
        });
        let result = await response.json();
        console.log(result);
        location.reload();
    }else{
        alert("Du kan ikke slette medlemmer")
    }
}   

// Henter ut et medlem fra databasen og returnerer det
async function getUser(id) {
    let response = await fetch('/Medlem/medlemmer/' + id);
    let medlem = await response.json();
    return medlem;
}

// Henter ut alle medlemmer fra databasen og legger de til i tabellen
async function getUsers() {
    let response = await fetch('/Medlem/medlemmer');
    let medlemmer = await response.json();
    
    for (let medlem of medlemmer) {
        ListUsers(medlem)
    }
}

