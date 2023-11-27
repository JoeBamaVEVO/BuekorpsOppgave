import express from 'express';
import path from 'path';
import { GetBrukere } from '../DB.js';


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


export default router;
