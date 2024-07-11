import express from 'express';
import { movis } from './js/model/peliculas.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;  // Usa el puerto proporcionado por Vercel

const __dirname = path.resolve();  // Para obtener el directorio actual
const usersFilePath = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(express.static('public'));  // Servir archivos estáticos desde la carpeta 'public'

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const users = JSON.parse(data);
        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        users.push({ username, password });
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error('Error writing users file:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Ruta para loguear un usuario
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Servir archivos estáticos desde la carpeta 'views'
app.use(express.static(path.join(__dirname, 'views')));


const moviesInstance = new movis();
// const searchInstance = new search();

app.get('/aliens', async (req, res) => {
    try {
        const data = await moviesInstance.getAlienAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.get('/search', async (req, res) => {
    try {
        console.log('Received search request');
        const { nombre } = req.query;
        console.log('Search query:', nombre);

        console.log('Calling buscarAliens');
        const data = await moviesInstance.buscarAliens(nombre);
        console.log('buscarAliens result:', data);

        res.status(200).json(data);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Failed to search data', details: error.message, stack: error.stack });
    }
});

console.log('searchInstance:', moviesInstance);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

