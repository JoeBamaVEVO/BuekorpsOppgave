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
import { CreateBruker, GetBruker, FirstUserCheck } from '../DB.js';

// Set up salt rounds for hashing and comparing passwords
const saltRounds = 10;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Register a new user
router.post('/Nybruker', async (req, res) => {
  const { Brukernavn, Email, Passord, isAdmin } = req.body;

  bcrypt.hash(Passord, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).send('Noe gikk galt');
    } else {
      const user = await CreateBruker(Brukernavn, Email, hash, isAdmin);
      delete user.password;
      delete user.isAdmin;
      res.send(user);
    }
  });
});

router.post('/loginSend', async (req, res) => {
  const { Brukernavn, Passord } = req.body;
  try {
      const brukere = await GetBruker(Brukernavn);
      const bruker = brukere[0];
      try{
        bcrypt.compare(Passord, bruker.Passord).then((result) => {
          delete bruker.password; 
          // Lager en token
          const token = jwt.sign(bruker, process.env.JWT_SECRET, { expiresIn: "1h" });
          res.cookie("token", token);
          res.send("Du er logget inn")
        })
      }catch(err){
        res.sendStatus(418)
      }
  } catch (Error) {
    console.log(Error);
  }
});


// Log out a user
router.post('/logout', (req, res) => {
  res.clearCookie("token");
  return res.redirect("/auth");
});


router.get('/setup', async (req, res) =>{
  let result = await FirstUserCheck();
  if(result === 0){
    bcrypt.hash("1234", saltRounds, async (err, hash) => {
      const user = await CreateBruker("Admin", "admin@placeholder.com", hash, 1);
    })
  }
})


export default router;
