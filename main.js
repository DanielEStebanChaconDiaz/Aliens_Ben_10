import express from 'express';
import { movis } from './js/model/peliculas.js';

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('views'));

const moviesInstance = new movis();

app.get('/aliens', async (req, res) => {
    try {
        const data = await moviesInstance.getAlienAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
