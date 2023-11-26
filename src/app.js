// Vi importerer express, path, og bcrypt
import express from 'express';
import path from 'path';

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

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/medlem', medlemRoutes);

app.use('/auth', loginRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Noe gikk galt");
});

app.listen(8080 , () => {
    console.log('server is running on http://localhost:8080');
});

