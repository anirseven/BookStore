
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// In-memory book inventory loaded from books.json
let books = [];
try {
  const data = fs.readFileSync('./books.json', 'utf8');
  books = JSON.parse(data);
} catch (err) {
  console.error('Could not load books.json, starting with empty inventory.');
}

// GET /locations - return all available locations
app.get('/locations', (req, res) => {
  try {
    const locations = JSON.parse(fs.readFileSync('./location.json', 'utf8'));
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Could not load locations.' });
  }
});


// GET /books?author=...&name=...&location=...
app.get('/books', (req, res) => {
  const { author, name, location } = req.query;
  let result = books;
  if (author) {
    result = result.filter(book => book.author.toLowerCase() === author.toLowerCase());
  }
  if (name) {
    result = result.filter(book => book.name.toLowerCase() === name.toLowerCase());
  }
  if (location) {
    result = result.filter(book => (book.location || '').toLowerCase() === location.toLowerCase());
  }
  res.json(result);
});


// POST /books
app.post('/books', (req, res) => {
  const { name, author, year, location } = req.body;
  if (!name || !author) {
    return res.status(400).json({ error: 'Book name and author are required.' });
  }
  const newBook = { name, author, year, location };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(port, () => {
  console.log(`Library API server running at http://localhost:${port}`);
});
