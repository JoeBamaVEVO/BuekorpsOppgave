// Her skal vi ha all database funksjonalitet
// Vi skal ha en funksjon for å hente alle medlemmer
// Vi skal ha en funksjon for å hente et medlem
// Vi skal ha en funksjon for å slette et medlem
// Vi skal ha en funksjon for å opprette et medlem
// Vi skal ha en funksjon for å endre et medlem
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
}).promise(); 

export async function getMedlemmer() {
    const [rows] = await pool.query(`SELECT * FROM medlem`)
    return rows;
}

export async function getMedlem(id) {
    const [rows] = await pool.query("SELECT * FROM medlem WHERE MedlemsID = ?", [id])
    return rows;
}

export async function DeleteMedlem(id) {
    const [rows] = await pool.query("DELETE FROM medlem WHERE MedlemsID = ?", [id])
    return rows;
}

export async function createMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang){
    const [result] = await pool.query(
        'INSERT INTO medlem (Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang) VALUES (?,?,?,?,?,?,?,?,?)', 
        [Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang])
    const id = result.insertId
    return getMedlem(id)
}

export async function updateMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id){
    const [result] = await pool.query(
        'UPDATE medlem SET Fornavn = ?, Etternavn = ?, Alder = ?, Adresse = ?, Postnummer = ?, Postadresse = ?, Tlf = ?, PelotongID = ?, Rang = ? WHERE MedlemsID = ?', 
        [Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id])
    return getMedlem(id)
}

export async function CreateBruker(Brukernavn, Email, Passord){
    const [result] = await pool.query(
        'INSERT INTO brukere (Brukernavn, Email, Passord) VALUES (?,?,?)', 
        [Brukernavn, Email, Passord])
    return result
}

export async function LoginBruker(Brukernavn){
    const [result] = await pool.query("SELECT Passord FROM brukere WHERE Brukernavn = ?", [Brukernavn])
    return result
}

export async function FirstUserCheck() {
    const [result] = await pool.query(`SELECT COUNT(*) FROM brukere`)
    return result
} 


