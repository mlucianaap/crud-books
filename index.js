var express = require('express');
var app = express();
var porta = 3000;
var mysql = require('mysql2');

const path = require('path');
const basePath = path.join(__dirname, 'templates');

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(`${basePath}/index.html`);
});

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pages = req.body.pages;

    const query = `INSERT INTO books (title, pages) VALUES ('${title}', '${pages}')`;

    conn.query(query, function(err) {
        if (err) {
            console.log(err);
        }

        res.redirect('/');
    });
});

app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books';

    conn.query(query, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }

        const books = data;
        console.log(books);
    });
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //Coloca a tua senha aqui
    database: 'nodemysql1'
});

conn.connect(function(err) {
    if (err) {
        console.log(err);
    }

    console.log('Conectado ao MySQL');

    app.listen(porta);
});