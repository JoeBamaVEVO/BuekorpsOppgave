import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import { getBrukere, getBruker, createBruker, deleteBruker, updateBruker } from '../DB.js';
const saltRounds = 10;


const __dirname = path.resolve();
const router = express.Router();
const app = express();

app.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../private/adminstrasjon.html"));
});


router.get("/brukere", async (req, res) => {
    const Brukere = await getBrukere();
    res.json(Brukere);
})

router.get("/bruker/:id", async (req, res) => {
    const id = req.params.id;
    const bruker = await getBruker(id);
    res.status(201).send(bruker);
})

// Register a new user
router.post('/Nybruker', async (req, res) => {
    const { Brukernavn, Email, Passord, isAdmin, Rolle } = req.body;
    let admin = 0;
  
    bcrypt.hash(Passord, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send('Noe gikk galt');
      } else {
        if (isAdmin === "on") {
          admin = 1;
        }
        const user = await createBruker(Brukernavn, Email, hash, isAdmin, Rolle);
        delete user.password;
        delete user.isAdmin;
        res.send(user);
      }
    });
  });

  router.delete("/bruker/:id", async (req, res) => {
    const id = req.params.id;
    const bruker = await deleteBruker(id);
    res.status(201).send(bruker);
  })

  router.put("/bruker/:id", async (req, res) => {
    const id = req.params.id;
    const { Brukernavn, Email, Passord, isAdmin, Rolle} = req.body;
    bcrypt.hash(Passord, saltRounds, async (err, Hash) => {
      if (err) {
        console.log(err);
        res.status(500).send('Noe gikk galt');
      } else {
    const user = await updateBruker(Brukernavn, Email, Hash, isAdmin, Rolle, id);
    res.send(user);
  }})
});

export default router;
