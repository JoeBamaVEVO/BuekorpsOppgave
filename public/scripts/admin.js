let btnNyBruker = document.getElementById("btnNyBruker")
let BrukerModal = document.getElementById("MedlemModal")

let RegisterBrukerForm = document.getElementById("RegisterBruker")

let AdminBtn = document.getElementById("isAdmin")


btnNyBruker.addEventListener("click", () => {
    BrukerModal.showModal()
})

RegisterBrukerForm.addEventListener("submit", (e) => {
    BrukerModal.close() // Lukker dialogen
    e.preventDefault() // Forhindrer at skjemaet sender data til serveren
    const brukerFormData = new FormData(RegisterBrukerForm) // Lager et FormData objekt av skjemaet
    const brukerData = JSON.stringify(Object.fromEntries(brukerFormData)); // Lager et JSON objekt av FormData
    console.log(brukerData)
    RegisterBruker(brukerData) // Kaller på addUser funksjonen og sender med JSON objektet
})

async function RegisterBruker(brukerData){
    let response = await fetch('/Admin/Nybruker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: brukerData
    });
    let result = await response.json();
    console.log(result);
    location.reload();
}


// Henter ut alle medlemmer fra databasen og legger de til i tabellen
async function getBrukere() {
    let response = await fetch('/admin/brukere');
    let brukere = await response.json();
    console.log(brukere[0])
    
    for (let bruker of brukere) {
        ListBruker(bruker)
        console.log(bruker);
    }
}

getBrukere();

function ListBruker(bruker) {
    const table = document.querySelector("tbody")
    const row = table.insertRow(-1)
    const ID = row.insertCell(0)
    const Brukernavn = row.insertCell(1)
    const Email = row.insertCell(2)
    const roller = row.insertCell(3)
    const btn = row.insertCell(4)

    let DelBtn = document.createElement("img")
    let EditBtn = document.createElement("img")
    let MerInfoBtn  = document.createElement("img")

    DelBtn.src = "img/icons/trash3-fill.svg"
    EditBtn.src = "img/icons/pencil-square.svg"
    MerInfoBtn.src = "img/icons/arrow-down.svg"

    DelBtn.addEventListener("click" , () => DeleteUser(medlem.MedlemsID))
    EditBtn.addEventListener("click" , () => UpdateUser(medlem.MedlemsID))
    MerInfoBtn.addEventListener("click" , () => /*MerInfo(medlem.MedlemsID)*/ console.log("Mer info"))

    ID.innerHTML = bruker.idBrukere
    Brukernavn.innerHTML = bruker.Brukernavn
    Email.innerHTML = bruker.Email
    roller.innerHTML = bruker.Stilling
      
    btn.appendChild(MerInfoBtn)
    btn.appendChild(EditBtn)
    btn.appendChild(DelBtn)    
}
