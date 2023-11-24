// login.js
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

const app = express();

app.use(express.json());



// router.post('/loginSend', async (req, res) => {
//   res.send('Logged in');
// });

// Import your functions for creating a user and login
import { CreateBruker, LoginBruker } from '../DB.js';

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
  const HashedPassord = await LoginBruker(Brukernavn);

  // res.send(HashedPassord[0].Passord);

  bcrypt.compare(Passord, HashedPassord[0].Passord, function (err, result) {
    if (result) {
      req.session.loggedin = true;
      req.session.Brukernavn = Brukernavn;
      res.send('Logged in');
    } else {
      res.send('Wrong password');
    }
  });
});

// Log out a user
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

export default router;
