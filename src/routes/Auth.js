// login.js
// Setup
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const app = express();

app.use(express.json());

// Import your functions for creating a user and login
import { CreateBruker, GetBruker } from '../DB.js';

// Set up salt rounds for hashing and comparing passwords
const saltRounds = 10;

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
  
  const bruker = await GetBruker(Brukernavn);

  bcrypt.compare(Passord, bruker.Passord, function (err, result) {
    if (result) {
      res.send('Logged in');
    } else {
      res.send('Wrong password');
    }
  });
});

// Log out a user
router.post('/logout', (req, res) => {
  res.send('ur logged out');
});

export default router;
