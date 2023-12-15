// Here we will have all database functionality
// We will have a function to get all members
// We will have a function to get a member
// We will have a function to delete a member
// We will have a function to create a member
// We will have a function to update a member
import sqlite from 'better-sqlite3';
import dotenv from 'dotenv';
dotenv.config();

const db = sqlite(process.env.SQLITE_DB);

export function getMedlemmer() {
    const rows = db.prepare(`
        SELECT * FROM medlem
        INNER JOIN rang 
        ON Rang_idRang = idRang
        INNER JOIN pelotong
        ON Pelotong_idPelotong = idPelotong
    `).all();
    return rows;
}

export function getMedlem(id) {
    const row = db.prepare("SELECT * FROM medlem WHERE MedlemsID = ?").get(id);
    return row;
}

export function deleteMedlem(id) {
    const result = db.prepare("DELETE FROM medlem WHERE MedlemsID = ?").run(id);
    return result;
}

export function createMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang) {
    const result = db.prepare(
        'INSERT INTO medlem (Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, Pelotong_idPelotong, Rang_idRang) VALUES (?,?,?,?,?,?,?,?,?)'
    ).run(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang);
    const id = result.lastInsertRowid;
    if(!result){
        throw new Error("Medlem not created");
    }else{
        return getMedlem(id);
    }
}

export function updateMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id) {
    db.prepare(
        'UPDATE medlem SET Fornavn = ?, Etternavn = ?, Alder = ?, Adresse = ?, Postnummer = ?, Postadresse = ?, Tlf = ?, Pelotong_idPelotong = ?, Rang_idRang = ? WHERE MedlemsID = ?'
    ).run(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id);
    return getMedlem(id);
}

export function createBruker(Brukernavn, Email, Passord, isAdmin, idRettigheter) {
    const result = db.prepare(
        'INSERT INTO brukere (Brukernavn, Email, Passord, isAdmin, Rettigheter_idRettigheter) VALUES (?,?,?,?,?)'
    ).run(Brukernavn, Email, Passord, isAdmin, idRettigheter);
    if(!result){
        throw new Error("User not created");
    }else{
        return result;
    }
}

export function deleteBruker(id) {
    try{
        const result = db.prepare("DELETE FROM brukere WHERE idBrukere = ?").run(id);
        return result;
    }catch(error){
        throw new Error("User not deleted");
    }
   
}

export function getBruker(Brukernavn) {
    const result = db.prepare(
        `SELECT * FROM brukere 
        INNER JOIN rettigheter
        ON Rettigheter_idRettigheter = idRettigheter
        WHERE Brukernavn = ?; 
        `
    ).get(Brukernavn);
    if (!result) {
        throw new Error("User not found");
    } else {
        return result;
    }
}

export function getBrukere() {
    const result = db.prepare(
        `SELECT * FROM brukere
        INNER JOIN rettigheter 
        ON Rettigheter_idRettigheter = idRettigheter 
        `
    ).all();
    return result;
}

export function firstUserCheck() {
    const result = db.prepare(`SELECT COUNT(*) FROM brukere`).get();
    return result['COUNT(*)'];
}
