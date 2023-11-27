// login.js
// Setup
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();


const router = express.Router();

const app = express();

app.use(express.json());

// Import your functions for creating a user and login
import { CreateBruker, GetBruker } from '../DB.js';

// Set up salt rounds for hashing and comparing passwords
const saltRounds = 10;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Register a new user
router.post('/Nybruker', async (req, res) => {
  const { Brukernavn, Email, Passord } = req.body;

  bcrypt.hash(Passord, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).send('Noe gikk galt');
    } else {
      const user = await CreateBruker(Brukernavn, Email, hash);
      res.send(user);
    }
  });
});

// Log in a user
router.post('/loginSend', async (req, res) => {
  const { Brukernavn, Passord } = req.body;

  // Burde fikse dette tbh no cap frfr ong
  // Henter bruker fra DB og legger inn i JSON
  const brukere = await GetBruker(Brukernavn);
  const bruker = brukere[0];
  // res.send(bruker.Passord)

  bcrypt.compare(Passord, bruker.Passord, function (err, result) {
    if (!result) {
      return res.status(403).json({
        error: "invalid login",
      });
    }
  // Sletter passordet fra JSON
  delete bruker.password; 
  // Lager en token
  const token = jwt.sign(bruker, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token);
  res.send("Logged In");
  });
});

// Log out a user
router.post('/logout', (req, res) => {
  res.clearCookie("token");
  return res.redirect("/auth");
});

export default router;
