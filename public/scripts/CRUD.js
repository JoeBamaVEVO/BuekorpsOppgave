
const btnNewMember = document.getElementById("btnNyMedlem")
const MedlemDialog = document.getElementById("MedlemDialog")
const MedlemForm = document.getElementById("MedlemForm")

// Lager variabler som henter ut Dialogen og Formen fra HTML
const OppdaterMedlemDialog = document.getElementById("OppdaterDialog")
const OppdaterMedlemForm = document.getElementById("OppdaterForm")


btnNewMember.addEventListener("click", () => {
    MedlemDialog.showModal()
});

MedlemForm.addEventListener("submit", (e) => {
    MedlemDialog.close() // Lukker dialogen
    e.preventDefault() // Forhindrer at skjemaet sender data til serveren
    const MedlemFormData = new FormData(MedlemForm) // Lager et FormData objekt av skjemaet
    const UserData = JSON.stringify(Object.fromEntries(MedlemFormData)); // Lager et JSON objekt av FormData
    AddUser(UserData) // Kaller på addUser funksjonen og sender med JSON objektet
})

async function AddUser(UserData){
    let response = await fetch('/Medlem/medlemmer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: UserData
    });
    location.reload();
}

async function UpdateUser(id) {
    // får tak i brukeren som skal oppdateres
    // Dataen som blir hentet her må vi fylle ut i skjemaet
    let MedlemData = await getUser(id);
    // Vi tar ut dataen fra JSON objektet og fyller ut skjemaet
    // console.log("dette er medlemdata");
    // console.log(MedlemData);
    console.log(MedlemData[0]);
    console.log(Object.keys(MedlemData[0]));
    form = OppdaterMedlemForm;

    MedlemID.innerText = MedlemData[0].MedlemsID;

    for(let key of Object.keys(MedlemData[0])) {
        // console.log(key);
        if (form.elements[key]) {
            form.elements[key].value = MedlemData[0][key];
        }
    }

    OppdaterMedlemDialog.showModal();
    console.log('Denne brukeren er bruker ' + id);    
}

// Legger til en eventlistener på skjemaet som brukes til å oppdatere et medlem
//     Denne blir aktivert når Formen blir submitted
OppdaterMedlemForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Forhindrer at skjemaet sender data til serveren
    id = document.getElementById("MedlemID").innerText;
    console.log('Denne brukeren er bruker ' + id);
    OppdaterMedlemDialog.close(); // Lukker dialogen
    const OppdaterMedlemFormData = new FormData(OppdaterMedlemForm); // Lager et FormData objekt av skjemaet
    const OppdaterUserData = JSON.stringify(Object.fromEntries(OppdaterMedlemFormData)); // Lager et JSON objekt av FormData
    console.log(OppdaterUserData);
    EditUser(id, OppdaterUserData); // Kaller på addUser funksjonen og sender med JSON objektet
});




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

function ListUsers(medlem) {
    const table = document.querySelector("tbody")
    const row = table.insertRow(-1)
    const ID = row.insertCell(0)
    const FNavn = row.insertCell(1)
    const LNavn = row.insertCell(2)
    const Alder = row.insertCell(3)
    const Pelotong = row.insertCell(4)
    const btn = row.insertCell(5)

    let DelBtn = document.createElement("img")
    let EditBtn = document.createElement("img")
    let MerInfoBtn  = document.createElement("img")

    DelBtn.src = "img/icons/trash3-fill.svg"
    EditBtn.src = "img/icons/pencil-square.svg"
    MerInfoBtn.src = "img/icons/arrow-down.svg"

    DelBtn.addEventListener("click" , () => DeleteUser(medlem.MedlemsID))
    EditBtn.addEventListener("click" , () => UpdateUser(medlem.MedlemsID))
    MerInfoBtn.addEventListener("click" , () => /*MerInfo(medlem.MedlemsID)*/ console.log("Mer info"))

    ID.innerHTML = medlem.MedlemsID
    FNavn.innerHTML = medlem.Fornavn
    LNavn.innerHTML = medlem.Etternavn
    Alder.innerHTML = medlem.Alder
    Pelotong.innerHTML = medlem.PelotongID 
      
    btn.appendChild(MerInfoBtn)
    btn.appendChild(EditBtn)
    btn.appendChild(DelBtn)    
}

async function DeleteUser(id) {
    let response = await fetch('/Medlem/medlemmer/' + id, {
        method: 'DELETE'
    });
    let result = await response.json();
    console.log(result);
    location.reload();
}

// Henter ut et medlem fra databasen og skriver det ut i konsollen
async function getUser(id) {
    let response = await fetch('/Medlem/medlemmer/' + id);
    let medlem = await response.json();
    console.log(medlem);
    return medlem;
}

// Henter ut alle medlemmer fra databasen og legger de til i tabellen
async function getUsers() {
    let response = await fetch('/Medlem/medlemmer');
    let medlemmer = await response.json();
    console.log(medlemmer[0])
    
    for (let medlem of medlemmer) {
        ListUsers(medlem)
        console.log(medlem);
    }
}

getUsers();
