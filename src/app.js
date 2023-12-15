// Vi importerer express, path, og bcrypt
import express from 'express';
import path from 'path';

// Import the routesrs
import {cookieJwtAuth} from './middleware/token.js';
import {JWTAdmin, checkUser} from './middleware/isAdmin.js';

import loginRoutes from './routes/Auth.js';
import medlemRoutes from './routes/Medlemmer.js';
import adminRoutes from './routes/admin.js';

// Vi setter __dirname til å være der vi kjører Node Serveren fra
const __dirname = path.resolve();

// Vi setter opp express
const app = express();

import cookieParser from 'cookie-parser';

app.use(cookieParser());

// Vi setter opp express til å servere statiske filer fra public mappen
app.use(express.static(path.join(__dirname, '../public'),{ 'extensions': ['html', 'htm', 'css']}));
// Vi setter opp express til å parse JSON
app.use(express.json());

app.get("/", cookieJwtAuth, async (req, res) => {
    res.sendFile(path.join(__dirname, "../private/medlemoversikt.html"));
});

app.get('*', checkUser);

app.use('/medlem', cookieJwtAuth, medlemRoutes);

app.use('/auth', loginRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Noe gikk galt");
});


//Admin Routes
app.use('/admin',cookieJwtAuth, JWTAdmin, adminRoutes);

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});

