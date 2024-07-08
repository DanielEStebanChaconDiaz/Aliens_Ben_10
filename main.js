import express from 'express';
import { movis } from './js/model/peliculas.js';
// import { search } from './js/model/search.js';

const app = express();
const port = 3000;

app.use(express.static('views'));

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
    console.log(`Server is running on http://localhost:${port}`);
});

