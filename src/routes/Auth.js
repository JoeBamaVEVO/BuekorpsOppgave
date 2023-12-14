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
import { createBruker, getBruker, firstUserCheck } from '../DB.js';

// Set up salt rounds for hashing and comparing passwords
const saltRounds = 10;

router.get("/test", (req, res) => {
  res.json({ FAEN: res.locals.FAEN });
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/loginSend', async (req, res) => {
  const { Brukernavn, Passord } = req.body;
  try {
      const bruker = await getBruker(Brukernavn);
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
  let result = await firstUserCheck();
  if(result === 0){
    bcrypt.hash("1234", saltRounds, async (err, rs) => {
      const user = await createBruker("Admin", "admin@placeholder.com", hash, 1, 2);
    })
  }
})


export default router;
