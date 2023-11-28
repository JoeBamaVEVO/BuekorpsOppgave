let btnNyBruker = document.getElementById("btnNyBruker")
let BrukerModal = document.getElementById("MedlemModal")

btnNyBruker.addEventListener("click", () => {
    BrukerModal.showModal()
})


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
    const btn = row.insertCell(3)

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
      
    btn.appendChild(MerInfoBtn)
    btn.appendChild(EditBtn)
    btn.appendChild(DelBtn)    
}
