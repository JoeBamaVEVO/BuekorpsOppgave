// Her skal vi ha all database funksjonalitet
// Vi skal ha en funksjon for å hente alle medlemmer
// Vi skal ha en funksjon for å hente et medlem
// Vi skal ha en funksjon for å slette et medlem
// Vi skal ha en funksjon for å opprette et medlem
// Vi skal ha en funksjon for å endre et medlem
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Console } from 'console';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
}).promise(); 

export async function getMedlemmer() {
    const [rows] = await pool.query(
        `SELECT * FROM medlem
        INNER JOIN rang 
        ON Rang_idRang = idRang
        INNER JOIN pelotong
        ON Pelotong_idPelotong = idPelotong
        `)
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
        'INSERT INTO medlem (Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, Pelotong_idPelotong, Rang_idRang) VALUES (?,?,?,?,?,?,?,?,?)', 
        [Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang])
    const id = result.insertId
    return getMedlem(id)
}

export async function updateMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id){
    const [result] = await pool.query(
        'UPDATE medlem SET Fornavn = ?, Etternavn = ?, Alder = ?, Adresse = ?, Postnummer = ?, Postadresse = ?, Tlf = ?, Pelotong_idPelotong = ?, Rang_idRang = ? WHERE MedlemsID = ?', 
        [Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id])
    return getMedlem(id)
}

export async function CreateBruker(Brukernavn, Email, Passord, isAdmin){
    const [result] = await pool.query(
        'INSERT INTO brukere (Brukernavn, Email, Passord, isAdmin) VALUES (?,?,?,?)', 
        [Brukernavn, Email, Passord, isAdmin])
    return result
}

export async function GetBruker(Brukernavn){
    const [result] = await pool.query(
        `SELECT * FROM brukere 
        I
        WHERE Brukernavn = ?; 
        `, [Brukernavn])
    if (result.length === 0){
        throw new Error("Bruker ikke funnet")
    }else{
        return result
    }
}

export async function GetBrukere(){
    const [result] = await pool.query(
        `SELECT * FROM brukere
        INNER JOIN rettigheter 
        ON Rettigheter_idRettigheter = idRettigheter 
        `)
    return result
}

export async function FirstUserCheck() {
    const [result] = await pool.query(`SELECT COUNT(*) FROM brukere`)
    return result[0]['COUNT(*)']
} 