import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

const app = express();

app.use(express.json());

import { getMedlemmer, getMedlem, deleteMedlem, createMedlem, updateMedlem, firstUserCheck } from '../DB.js';

router.get("/medlemoversikt", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/medlemoversikt.html"));
})

router.get("/medlemmer", async (req, res) => {
    const users = await getMedlemmer();
    res.json(users);
});

router.get("/medlemmer/:id", async (req, res) => {
    const id = req.params.id;
    const users = await getMedlem(id);
    res.status(201).send(users);
});

router.delete("/medlemmer/:id", async (req, res) => {
    const id = req.params.id;
    const users = await deleteMedlem(id);
    res.json(users);
});

router.post("/medlemmer", async (req, res) => {
    const { Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang } = req.body;
    const user = createMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang);
    res.send(user)
});

router.put("/medlemmer/:id", async (req, res) => {
    const id = req.params.id;
    const { Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang } = req.body;
    const user = await updateMedlem(Fornavn, Etternavn, Alder, Adresse, Postnummer, Postadresse, Tlf, PelotongID, Rang, id);
    res.send(user);
});

export default router;
