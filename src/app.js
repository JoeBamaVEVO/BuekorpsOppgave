// Vi importerer express, path, og bcrypt
import express from 'express';
import path from 'path';
import session from 'express-session'

// Import the routes
import loginRoutes from './routes/Auth.js';
import medlemRoutes from './routes/Medlemmer.js';


// Vi setter __dirname til å være der vi kjører Node Serveren fra
const __dirname = path.resolve();

// Vi setter opp express
const app = express();
// Vi setter opp express til å servere statiske filer fra public mappen
app.use(express.static(path.join(__dirname, '../public')));
// Vi setter opp express til å parse JSON
app.use(express.json());
// Vi importerer funksjonene fra DB.js
// import { getMedlemmer, getMedlem, DeleteMedlem, createMedlem, updateMedlem, FirstUserCheck } from './DB.js';

// Her setter vi opp session, vi henter SECRET fra .env filen
app.use(session({
    secret: process.env.SECRET,  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
}))

app.get("/", (req, res) => {
    if(req.session.loggedin){
        res.redirect("/medlemoversikt");
    }else{
        res.sendFile(path.join(__dirname, "../public/login.html"));
    }
});

app.use('/Medlem', medlemRoutes);

app.use('/Auth', loginRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Noe gikk galt");
});

app.listen(8080 , () => {
    console.log('server is running on http://localhost:8080');
});

