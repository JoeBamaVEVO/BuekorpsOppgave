import express from 'express';
import path from 'path';
import { GetBrukere, GetBruker } from '../DB.js';


const __dirname = path.resolve();
const router = express.Router();
const app = express();

app.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../private/adminstrasjon.html"));
});


router.get("/brukere", async (req, res) => {
    const Brukere = await GetBrukere();
    res.json(Brukere);
})

router.get("/bruker/:brukernavn", async (req, res) => {
    const brukernavn = req.params.brukernavn;
    const bruker = await GetBruker(brukernavn);
    res.status(201).send(bruker);
})


export default router;
